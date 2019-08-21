# -*- coding: utf-8 -*-
#!/usr/bin/python

import os
import re
import json
import csv
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
		'grades':['7/A or above','4/C or above','1/G or above','U or above']
	}
]

nations=['UK','EN','WA','NI']
ages=['15','16','17']

# Listing newly reformed subjects
# target='AS-Level'
# for level in levels:
# 	if level['name']==target:
# 		os.chdir(os.path.dirname( __file__ ))
# 		os.chdir('..')
# 		os.chdir(level['output'])
# 		row_list=[]
# 		with open(level['name'].lower()+'-subjects.json') as subjects_file:
# 			subjects_data = json.load(subjects_file)
# 		for subject in subjects_data:
# 			if '2019' in str(subject['reform_year']['EN']) and subject['reform_year']['EN']!='Being discontinued, 2019':		# XXX
# 				print subject['alias'], re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']), subject['reform_year']['EN']

# Listing EBacc subjects
# target='GCSE'
# for level in levels:
# 	if level['name']==target:
# 		os.chdir(os.path.dirname( __file__ ))
# 		os.chdir('..')
# 		os.chdir(level['output'])
# 		row_list=[]
# 		with open(level['name'].lower()+'-subjects.json') as subjects_file:
# 			subjects_data = json.load(subjects_file)
# 		for subject in subjects_data:
# 			if subject['flags']['ebacc']==True:
# 				print re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean'])

# Listing discontinued subjects
# target='GCSE'
# for level in levels:
# 	if level['name']==target:
# 		os.chdir(os.path.dirname( __file__ ))
# 		os.chdir('..')
# 		os.chdir(level['output'])
# 		row_list=[]
# 		with open(level['name'].lower()+'-subjects.json') as subjects_file:
# 			subjects_data = json.load(subjects_file)
# 		for subject in subjects_data:
# 			if 'Discontinued' in str(subject['reform_year']['EN']):
# 				print re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']), subject['reform_year']['EN']

# A-Level/AS-Level/GCSE entries, year comparison
# target='AS-Level'
# scope='EN'
# name='All students'
# years=[2015,2016,2017,2018,2019]		# XXX
#
# for level in levels:
# 	if level['name']==target:
# 		os.chdir(os.path.dirname( __file__ ))
# 		os.chdir('..')
# 		os.chdir(level['output'])
# 		with open(level['name'].lower()+'-subjects.json') as subjects_file:
# 			subjects_data = json.load(subjects_file)
# 		with open(level['name'].lower()+'-entries.json') as entries_file:
# 			entries_data = json.load(entries_file)
# 		output_dict = [x for x in entries_data if x['name'] == name and x['scope']==scope]
# 		for item in output_dict:
# 			for subject in subjects_data:
# 				if item['alias']==subject['alias']:
# 					string=''
# 					for year in years:
# 						if item['data'][0][0]>year:		# add a blank value where year doesn't exist
# 							string=string + ' '
# 						for datum in item['data']:
# 							if datum[0]==year:
# 								if string=='':
# 									string=str(datum[1])
# 								else:
# 									string=string + ', ' + str(datum[1])
# 					try:
# 						if int(string.rsplit(' ',1)[1])<100 :		# ditch small-entry subjects
# 							print re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']) + ', ' + string
# 					except IndexError:
# 					    if int(string)<100:		# ditch small-entry subjects
# 							print re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']) + ', ' + string

# A-Level/AS-Level/GCSE grades, year comparison
target='GCSE'
scope='EN'
gender='All students'
grade='4/C or above'		# XXX
years=[2015,2017,2018]		# XXX

for level in levels:
	if level['name']==target:
		os.chdir(os.path.dirname( __file__ ))
		os.chdir('..')
		os.chdir(level['output'])
		with open(level['name'].lower()+'-subjects.json') as subjects_file:
			subjects_data = json.load(subjects_file)
		with open(level['name'].lower()+'-grades.json') as grades_file:
			grades_data = json.load(grades_file)
		output_dict = [x for x in grades_data if x['gender'] == gender and x['scope']==scope and x['name']==grade and x['alias'] not in ['COMM', 'CRIT', 'GENS', 'ICTX', 'PERF']]		# XXX
		for item in output_dict:
			for subject in subjects_data:
				if item['alias']==subject['alias']:
					string=''
					for year in years:
						if item['data'][0][0]>year:		# add a blank value where year doesn't exist
							string=string + ' '
						for datum in item['data']:
							if datum[0]==year:
								if string=='':
									string=str(datum[1])
								else:
									string=string + ', ' + str(datum[1])
					try:
						if string.rsplit(' ',1)[1]!='0.0':		# ditch subjects with no grades (and hence no entries) in most recent year
							print re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']) + ', ' + string
					except IndexError:
					    if string!='0.0':		# ditch subjects with no grades (and hence no entries) in most recent year
							print re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']) + ', ' + string

# GCSE, change in entries and grades in EBacc subjects
# target='GCSE'
# scope='EN'
# y0=2017		# XXX
# yn=2018		# XXX
#
# for level in levels:
# 	if level['name']==target:
# 		os.chdir(os.path.dirname( __file__ ))
# 		os.chdir('..')
# 		os.chdir(level['output'])
# 		row_list=[]
# 		with open(level['name'].lower()+'-subjects.json') as subjects_file:
# 			subjects_data = json.load(subjects_file)
# 		with open(level['name'].lower()+'-entries.json') as entries_file:
# 			entries_data = json.load(entries_file)
# 		with open(level['name'].lower()+'-grades.json') as grades_file:
# 			grades_data = json.load(grades_file)
# 		for subject in subjects_data:
# 			if subject['flags']['ebacc']==True:
# 				alias=subject['alias']
# 				row=OrderedDict([])
# 				row['alias']=alias
# 				row['subject_name_clean']=subject['subject_name_clean']
# 				row['entries_y0']=''
# 				row['entries_yn']=''
# 				row['A_y0']=''
# 				row['C_y0']=''
# 				row['A_yn']=''
# 				row['C_yn']=''
# 				data=[]
# 				for entries in entries_data:
# 					if entries['name']=='All students' and entries['alias']==alias and entries['scope']==scope:
# 						data=entries['data']
# 						for data_item in data:
# 							if data_item[0]==y0:
# 								row['entries_y0']=data_item[1]
# 							if data_item[0]==yn:
# 								row['entries_yn']=data_item[1]
# 						break
# 				data=[]
# 				for grades in grades_data:
# 					if (grades['name']=='7/A or above' or grades['name']=='4/C or above') and grades['scope']==scope and grades['gender']=='All students' and grades['alias']==alias:
# 						data=grades['data']
# 						for data_item in data:
# 							if data_item[0]==y0:
# 								if grades['name']=='7/A or above':
# 									row['A_y0']=data_item[1]
# 								elif grades['name']=='4/C or above':
# 									row['C_y0']=data_item[1]
# 							if data_item[0]==yn:
# 								if grades['name']=='7/A or above':
# 									row['A_yn']=data_item[1]
# 								elif grades['name']=='4/C or above':
# 									row['C_yn']=data_item[1]
# 				print row['alias'] + ', ' + row['subject_name_clean'] + ', ' + str(row['entries_y0']) + ', ' + str(row['entries_yn']) + ', ' + str(row['C_y0']) + ', ' + str(row['C_yn'])
