from flask import Flask, render_template, url_for, request, redirect, flash, make_response
from flask_mail import Mail, Message
from flask_compress import Compress
from threading import Thread
from urllib.parse import urlparse, urlunparse
import os, datetime, time

app = Flask(__name__, static_folder='static', static_url_path='')
app.secret_key = os.environ.get('SECRET_KEY')

app.config['MAIL_SERVER'] = 'mail.privateemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('SENDER_EMAIL')
app.config['MAIL_PASSWORD'] = os.environ.get('SENDER_PASS')

mail = Mail(app)
Compress(app)

msg_timeout = 3600

@app.before_request
def redirect_https():
    if request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
        return redirect(url, code=301)

@app.before_request
def redirect_www():
    urlparts = urlparse(request.url)
    if urlparts.netloc == 'www.fraser.love':
        urlparts_list = list(urlparts)
        urlparts_list[1] = 'fraser.love'
        return redirect(urlunparse(urlparts_list), code=301)

def async_send_mail(app, msg):
    with app.app_context():
        mail.send(msg)

def send_mail(subject, sender, recipient, template):
    msg = Message(subject, sender=sender, recipients=[recipient])
    msg.html = template
    thread = Thread(target=async_send_mail, args=[app, msg])
    thread.start()
    return thread

@app.route('/')
def home():
    return render_template('main.html')

@app.errorhandler(Exception)
def page_not_found(error):
    error_code = str(error)[:3]
    error_title = str(error)[3:].split(':')[0]
    error_desc = str(error).split(':')[1]
    return render_template('error_page.html', error_code=error_code, error_title=error_title, error_desc=error_desc), int(error_code)

@app.route('/contact', methods=['POST'])
def contact():
    previous_submission = request.cookies.get('time')
    response = make_response(redirect('/'))

    if previous_submission == None:
        previous_submission = 0

    time_elapsed = time.time() - float(previous_submission)
    
    if time_elapsed > msg_timeout:
        name = request.form.get('name').lower()
        email = request.form.get('email').lower()
        message = request.form.get('message')

        html = """
                <html>
                    <b>{} @ '{}' sent the following message at {}:</b>
                    <br><br><i>{}</i>
                </html>
                """.format(name, email, datetime.datetime.now(), message)

        subject = 'fraser.love: New message from {}'.format(name)

        send_mail(subject, os.environ.get('SENDER_EMAIL'), os.environ.get('RECIEVER_EMAIL'), html)
        flash_message, flash_type = 'Message has been sent successfully.', 'info'
        response.set_cookie('time', str(time.time()))
    else:
        seconds_left = msg_timeout - time_elapsed
        time_left = datetime.datetime(1,1,1) + datetime.timedelta(seconds=float(seconds_left))
        flash_message, flash_type = 'Error message timeout wait {}m and {}s.'.format(time_left.minute, time_left.second), 'error'

    flash(flash_message, flash_type)
    return response

if __name__ == '__main__':
    app.run(debug=True)