# -*- coding: utf-8 -*-
#!/usr/bin/python

import os
import re
import json
from xlrd import open_workbook
from collections import OrderedDict

target_year=2019		# XXX
genders = ['Male','Female','All students']

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
		'grades':['7/A or above','4/C or above','1/G or above','U or above']
	}
]

for level in levels:
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	os.chdir(level['output'])
	with open(level['name'].lower()+'-subjects.json') as subjects_file:
		subjects_data = json.load(subjects_file)
	for subject in subjects_data:
		subject['present']=False
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	os.chdir(level['source'])
	row=OrderedDict([])
	rows=[]
	for source_file in os.listdir('.'):
		if source_file.endswith('.xls') or source_file.endswith('.xlsx'):
			filename=source_file.split('.')[0]
			filename_split=filename.split('_')
			year=int(filename_split[1])
			scope=filename_split[2].upper()
			if year==target_year:
				rb=open_workbook(source_file)
				rbws=rb.sheet_by_index(0)
				for rbrow in range(11,rbws.nrows):			# ditching 10 header rows
					row=OrderedDict.fromkeys(row, None)
					if rbws.cell(rbrow,0).value!='' and rbws.cell(rbrow,0).value[0]!='(':		# ditches blank rows and table notes
						subject_name = re.match('[^0-9]+[^()0-9]+[)]*',rbws.cell(rbrow,0).value).group(0).strip()
						if any(subject_name.lower() in [subj.lower() for subj in subject['subject_names']] for subject in subjects_data)==True:
							for subject in subjects_data:
								if any(subject_name.lower()==subj.lower() for subj in subject['subject_names'])==True:
									alias=subject['alias']
									subject_name=subject['subject_name_clean']
									subject['present']=True
									break
						else:
							print(filename +': ' + subject_name + ' not found in ' + level['name'] + ' subjects JSON file')
	for subject in subjects_data:
		if subject['present']==False:
			print(re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']) + ' not present in ' + level['name'] + ' source data')		# strip out unicode characters - e.g. any zero-width space characters)
