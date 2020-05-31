from flask import Flask, render_template, url_for, request, redirect, flash
from flask_mail import Mail, Message
from threading import Thread
import os, datetime

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

app.config['MAIL_SERVER'] = 'mail.privateemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('SENDER_EMAIL')
app.config['MAIL_PASSWORD'] = os.environ.get('SENDER_PASS')

mail = Mail(app)

@app.before_request
def before_request():
    if request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
    if request.url.startswith('https://www'):
        url = request.url.replace('https://www', 'https://', 1)
        code = 301
        return redirect(url, code=code)

def async_send_mail(app, msg):
    with app.app_context():
        mail.send(msg)

def send_mail(subject, sender, recipient, template):
    print(sender, recipient)
    msg = Message(subject, sender=sender, recipients=[recipient])
    msg.html = template
    thread = Thread(target=async_send_mail, args=[app, msg])
    thread.start()
    return thread

@app.route('/')
@app.route('/', subdomain='www')
def home():
    return render_template('main.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def exception_handler(error):
    return render_template('500.html'), 500

@app.route('/contact', methods=['POST'])
def contact():
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
    flash('Message has been sent successfully', 'info')
    return redirect('/')

if __name__ == '__main__':
    app.run()