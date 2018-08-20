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
		'source':'data\\source\\a-level',
		'output':'data\\output\\a-level',
		'grades':['A*','A or above','B or above','C or above','D or above','E or above','U or above']
	},
	{
		'name':'AS-Level',
		'source':'data\\source\\as-level',
		'output':'data\\output\\as-level',
		'grades':['A','B or above','C or above','D or above','E or above','U or above']
	},
	{
		'name':'GCSE',
		'source':'data\\source\\gcse',
		'output':'data\\output\\gcse',
		'grades':['A/7 or above','C/4 or above','G/1 or above','U or above']
	}
]

for level in levels:
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	path=os.getcwd()
	os.chdir('templates')
	# level pages
	copy('level_page_template.php', path + '\\' + level['name'].lower() + '.php')
	# subject pages
	os.chdir('..')
	path=os.getcwd()
	if not os.path.exists(path + '\\' + level['name'].lower()):
		os.makedirs(path + '\\' + level['name'].lower())
	os.chdir(level['output'])
	with open(level['name'].lower()+'-subjects.json') as subjects_file:
		subjects_data = json.load(subjects_file)
	os.chdir('../../..')
	os.chdir('templates')
	for subject in subjects_data:
		subject_name_url=re.sub('\W+', '-', subject['subject_name_clean']).lower()
		copy('subject_page_template.php', path + '/' + level['name'].lower() + '/' + subject_name_url + '.php')
