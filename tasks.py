from googleapiclient.discovery import build
from github import Github
import time, datetime, dateutil.parser, os

class YouTube_API():
    def __init__(self):
        api_key = os.environ.get('YOUTUBE_API_KEY')
        self.youtube = build('youtube', 'v3', developerKey=api_key)
        self.no_views = 0
        self.no_subs = 0
        self.no_videos = 0
        self.no_hours = 0 
        self.no_likes = 0
        self.no_comments = 0
        self.joined = ''
        self.profile = ''
        self.video_ids = []
        self.video_thumbnails = []

    def youtube_api_task(self, rest):
        while True:
            print('YouTube API: Fetching Youtube Stats')

            yt_channel_request = self.youtube.channels().list(
                part='statistics, brandingSettings, snippet, contentDetails',
                id='UC8Izp0TH30o9qrxGJVAwEuQ'
            )
            yt_channel = yt_channel_request.execute()

            uploads_id = yt_channel['items'][0]['contentDetails']['relatedPlaylists']['uploads']
            self.video_ids, self.video_thumbnails = [], []
            next_page_token = ''
            while next_page_token != None:
                yt_uploads_request = self.youtube.playlistItems().list(
                    part='contentDetails, snippet',
                    playlistId=uploads_id,
                    pageToken=next_page_token,
                    maxResults=50
                )
                yt_uploads = yt_uploads_request.execute()
                for upload in yt_uploads['items']:
                    self.video_ids.append(upload['contentDetails']['videoId'])
                    self.video_thumbnails.append(upload['snippet']['thumbnails']['standard']['url'])
                
                try:
                    next_page_token = yt_uploads['nextPageToken']
                except:
                    next_page_token = None

            videos = self.video_ids
            seconds, self.no_likes, self.no_comments = 0, 0, 0
            while len(videos) > 0:
                yt_videos_request = self.youtube.videos().list(
                    part='contentDetails, statistics',
                    id=','.join(videos[:50]),
                    pageToken=next_page_token,
                    maxResults=50
                )
                yt_videos = yt_videos_request.execute()
                for video in yt_videos['items']:
                    duration_dt = dateutil.parser.parse(video['contentDetails']['duration'][2:])
                    seconds += duration_dt.hour * 3600 + duration_dt.minute * 60 + duration_dt.second
                    self.no_likes += int(video['statistics']['likeCount'])
                    if 'commentCount' in video['statistics']:
                        self.no_comments += int(video['statistics']['commentCount'])
                videos = videos[50:]
            hours = datetime.timedelta(seconds=seconds)
            self.no_hours = '{}h {}m {}s'.format(*(str(hours).split(':')))

            self.no_views = '{:,}'.format(int(yt_channel['items'][0]['statistics']['viewCount']))
            self.no_subs = '{:,}'.format(int(yt_channel['items'][0]['statistics']['subscriberCount']))
            self.no_videos = '{:,}'.format(int(yt_channel['items'][0]['statistics']['videoCount']))
            self.profile = yt_channel['items'][0]['snippet']['thumbnails']['medium']['url']

            year, month, day = [int(x) for x in (yt_channel['items'][0]['snippet']['publishedAt'][:10].split('-'))]
            if 4 <= day <= 20 or 24 <= day <= 30:
                suffix = "th"
            else:
                suffix = ["st", "nd", "rd"][day % 10 - 1]
            joined_dt = datetime.datetime(year, month, day)
            self.joined = joined_dt.strftime("%-d{} %b, %y".format(suffix))

            print('YouTube API: Updated Youtube Stats')
            time.sleep(rest)

class GitHub_API():
    def __init__(self):
        self.github = Github(os.environ.get('GITHUB_ACCESS_TOKEN'))
        self.profile = ''
        self.created_at = ''
        self.public_repos = ''
        self.yearly_commits = 0
        self.total_commits = 0
        self.yearly_additions = 0
        self.total_additions = 0
        self.yearly_deletions = 0
        self.total_deletions = 0
        self.yearly_changes = 0
        self.total_changes = 0
        self.yearly_sloc = 0
        self.total_sloc = 0

    def github_api_task(self, rest):
        while True:
            print('GitHub API: Fetching Github Stats')
            me = self.github.get_user()
            self.profile = me.avatar_url
            self.public_repos = '{:,}'.format(me.public_repos)

            day = int(me.created_at.strftime('%-d'))
            if 4 <= day <= 20 or 24 <= day <= 30:
                suffix = "th"
            else:
                suffix = ["st", "nd", "rd"][day % 10 - 1]
            self.created_at = me.created_at.strftime('%-d{} %b, %y'.format(suffix))
            
            self.yearly_commits, self.total_commits = 0, 0
            self.yearly_additions, self.total_additions = 0, 0
            self.yearly_deletions, self.total_deletions = 0, 0
            self.yearly_changes, self.total_changes = 0, 0
            self.yearly_sloc, self.total_sloc = 0, 0

            for repo in me.get_repos():
                for stat in repo.get_stats_commit_activity():
                    self.yearly_commits += stat.total

                for stat in repo.get_stats_code_frequency():
                    ytd = datetime.datetime.now() - datetime.timedelta(days=365)
                    if str(stat.week)[:4] == str(ytd)[:4]:
                        self.yearly_additions += stat.additions
                        self.yearly_deletions += -(stat.deletions)
                        self.yearly_changes += (stat.additions - stat.deletions)
                        self.yearly_sloc += (stat.additions + stat.deletions)
                    self.total_additions += stat.additions
                    self.total_deletions += -(stat.deletions)
                    self.total_changes += (stat.additions - stat.deletions)
                    self.total_sloc += (stat.additions + stat.deletions)

                for commit in repo.get_commits(author='fraserlove'):
                    self.total_commits += 1

            self.yearly_commits = '{:,}'.format(int(self.yearly_commits))
            self.total_commits = '{:,}'.format(int(self.total_commits))
            self.yearly_additions = '{:,}'.format(int(self.yearly_additions))
            self.total_additions = '{:,}'.format(int(self.total_additions))
            self.yearly_deletions = '{:,}'.format(int(self.yearly_deletions))
            self.total_deletions = '{:,}'.format(int(self.total_deletions))
            self.yearly_changes = '{:,}'.format(int(self.yearly_changes))
            self.total_changes = '{:,}'.format(int(self.total_changes))
            self.yearly_sloc = '{:,}'.format(int(self.yearly_sloc))
            self.total_sloc = '{:,}'.format(int(self.total_sloc))

            print('GitHub API: Updated Github Stats')
            time.sleep(rest)