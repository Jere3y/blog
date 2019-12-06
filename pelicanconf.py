#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'xty'
SITENAME = '学习日记'
# SITEURL = 'http://blog.apie.site/'

PATH = 'content'
STATIC_PATHS = ['images']

TIMEZONE = 'Asia/Harbin'
DEFAULT_DATE_FORMAT = '%Y-%m-%d %H:%M:%S'
DEFAULT_LANG = 'en'
OUTPUT_PATH = 'docs/'
# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
# LINKS = (('Pelican', 'http://getpelican.com/'),
#          ('Python.org', 'http://python.org/'),
#          ('Jinja2', 'http://jinja.pocoo.org/'),
#          ('You can modify those links in your config file', '#'),)

# Social widget
# SOCIAL = (('You can add links in your config file', '#'),
#           ('Another social link', '#'),)

DEFAULT_PAGINATION = 20

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

# Specify name of a built-in theme
THEME = "themes/mytheme"

FRONT_PAGE_FULL_ARTICLES = False
ALTERNATE_FONTS = False
TAGS_IN_MOBILE_SIDEBAR = False
NEW_ANALYTICS = False
ANALYTICS_DOMAIN = ''
FOOTER_TEXT = '个人技术日记，遵循 WTFPL'
