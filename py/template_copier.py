# -*- coding: utf-8 -*-
#!/usr/bin/python

import os
import re
import json
from shutil import copy
from xlrd import open_workbook
from collections import OrderedDict

levels=[
	{
		'name':'A-Level',
		'source':'data\\a-level',
		'output':'a-level',
		'grades':['A*','A','B','C','D','E','U']
	},
	{
		'name':'AS-Level',
		'source':'data\\as-level',
		'output':'as-level',
		'grades':['A','B','C','D','E','U']
	},
	{
		'name':'GCSE',
		'source':'data\\gcse',
		'output':'gcse',
		'grades':['A/7','C/4','G/1','U']
	}
]

for level in levels:
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	path=os.getcwd()
	os.chdir('templates')
	# level pages
	copy('level_page_template.html', path + '/' + level['name'].lower() + '.html')
	# subject pages
	os.chdir('..')
	os.chdir(level['output'])
	with open(level['name'].lower()+'-subjects.json') as subjects_file:
		subjects_data = json.load(subjects_file)
	os.chdir('..')
	os.chdir('templates')
	for subject in subjects_data:
		subject_name_url=re.sub('\W+', '-', subject['subject_name_clean']).lower()
		copy('subject_page_template.html', path + '/' + level['name'].lower() + '/' + subject_name_url + '.html')
