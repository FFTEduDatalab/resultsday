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


# Listing EBacc subjects
target='GCSE'
for level in levels:
	if level['name']==target:
		os.chdir(os.path.dirname( __file__ ))
		os.chdir('..')
		os.chdir(level['output'])
		row_list=[]
		with open(level['name'].lower()+'-subjects.json') as subjects_file:
			subjects_data = json.load(subjects_file)
		for subject in subjects_data:
			if subject['flags']['ebacc']==True:
				print(re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']))		# strip out unicode characters - e.g. any zero-width space characters)


# Listing discontinued subjects
target='GCSE'
for level in levels:
	if level['name']==target:
		os.chdir(os.path.dirname( __file__ ))
		os.chdir('..')
		os.chdir(level['output'])
		row_list=[]
		with open(level['name'].lower()+'-subjects.json') as subjects_file:
			subjects_data = json.load(subjects_file)
		for subject in subjects_data:
			if 'Discontinued' in str(subject['reform_year']['EN']):
				print(re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']), subject['reform_year']['EN'])


# A-Level/AS-Level/GCSE: Extract entry figures for a given time range, and percentage change between y0 and yn
target='A-Level'
scope='EN'
name='All students'
years=[2019, 2020]

for level in levels:
	if level['name']==target:
		os.chdir(os.path.dirname( __file__ ))
		os.chdir('..')
		os.chdir(level['output'])
		with open(level['name'].lower()+'-subjects.json') as subjects_file:
			subjects_data = json.load(subjects_file)
		with open(level['name'].lower()+'-entries.json') as entries_file:
			entries_data = json.load(entries_file)
		output_dict = [x for x in entries_data if x['name'] == name and x['scope']==scope]
		for item in output_dict:
			for subject in subjects_data:
				if item['alias']==subject['alias']:
					string=''
					entries_change=''
					for year in years:
						if item['data'][0][0]>year:		# add a blank value where year doesn't exist
							string=string + ' '
						for datum in item['data']:
							if datum[0]==year:
								if string=='':
									entries_y0=datum[1]
									string=str(datum[1])
								else:
									string=string + ', ' + str(datum[1])
									try:
										entries_change=round((datum[1]-entries_y0)/entries_y0*100.0,1)
									except ZeroDivisionError:
										entries_change=0
					try:
						if int(string.rsplit(' ',1)[1])>100 :		# ditch small-entry subjects
							print(re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']) + ', ' + string + ', ' + str(entries_change) + '%')		# strip out unicode characters - e.g. any zero-width space characters)
					except IndexError:
						if int(string)>100:		# ditch small-entry subjects
							print(re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']) + ', ' + string + ', ' + str(entries_change) + '%')


# A-Level/AS-Level/GCSE: Extract grade figures for a given time range
target='A-Level'
scope='EN'
gender='All students'
grade='A or above'
exclusions=[]
# exclusions=['LEIS', 'AOTH', 'HSOC', 'HOME', 'MANU', 'HOSP', 'BUSC' ,'WELS', 'WELF', 'IRIS', 'PERF', 'ECON', 'ENGI', 'OSCI']		# discontinued/low entry
years=[2019,2020]

for level in levels:
	if level['name']==target:
		os.chdir(os.path.dirname( __file__ ))
		os.chdir('..')
		os.chdir(level['output'])
		with open(level['name'].lower()+'-subjects.json') as subjects_file:
			subjects_data = json.load(subjects_file)
		with open(level['name'].lower()+'-grades.json') as grades_file:
			grades_data = json.load(grades_file)
		output_dict = [x for x in grades_data if x['gender'] == gender and x['scope']==scope and x['name']==grade and x['alias'] not in exclusions]
		for item in output_dict:
			for subject in subjects_data:
				# if subject['flags']['ebacc'] == True:
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
							print(re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']) + ', ' + string)
					except IndexError:
						if string!='0.0':		# ditch subjects with no grades (and hence no entries) in most recent year
							print(re.sub(r'[^\x00-\x7F]',' ', subject['subject_name_clean']) + ', ' + string)


# A-Level/AS-Level/GCSE: Produce non-cumulative extract of grades data
target = 'A-Level'
scope = 'EN'
gender = 'All students'
exclusions = ['COMM','CRIT','GENS','ICTX','IRIS','PERF','WELF','WELS','AOTH']		# discontinued/low entry
years = [2020, 2020]

grade_dict = {
	'subject': None,
	'grade': None,
	'pct_2020': None,
	'pct_2020': None,
}

previous_pct_dict = {
	2020: 0,
	2020: 0,
}

grades_list = []

for level in levels:
	if level['name']==target:
		os.chdir(os.path.dirname( __file__ ))
		os.chdir('..')
		os.chdir(level['output'])
		with open(level['name'].lower()+'-subjects.json') as subjects_file:
			subjects_data = json.load(subjects_file)
		with open(level['name'].lower()+'-grades.json') as grades_file:
			grades_data = json.load(grades_file)
		output_dict = [x for x in grades_data if x['gender'] == gender and x['scope']==scope and x['alias'] not in exclusions]
		for subject in subjects_data:
			previous_pct_dict = dict.fromkeys(previous_pct_dict, 0)
			for item in output_dict:
				grade_dict_working = grade_dict.copy()
				grade_dict_working['subject'] = subject['subject_name_clean']
				if item['alias']==subject['alias']:
					grade_dict_working['grade'] = re.sub(r' or above','', item['name'])		# as we're producing non-cumulative data
					for year in years:
						for datum in item['data']:
							if datum[0]==year:
								if year == 2020:
									grade_dict_working['pct_2020'] = round((datum[1] - previous_pct_dict[year])/100.0, 3)		# producing non-cumulative data
								if year == 2020:
									grade_dict_working['pct_2020'] = round((datum[1] - previous_pct_dict[year])/100.0, 3)
								previous_pct_dict[year] = datum[1]
					grades_list.append(grade_dict_working)
		with open('subjectgrade.json', 'w') as grades_file:		# prettified
			json.dump(grades_list, grades_file, indent=4, separators=(',', ': '))


# GCSE: Produce total change in entries in EBacc/non-EBacc subjects
target='GCSE'
# criteria='All'
criteria='Not discontinued'
scope='EN'
y0=2018
yn=2019

for level in levels:
	if level['name']==target:
		os.chdir(os.path.dirname( __file__ ))
		os.chdir('..')
		os.chdir(level['output'])
		row_list=[]
		with open(level['name'].lower()+'-subjects.json') as subjects_file:
			subjects_data = json.load(subjects_file)
		with open(level['name'].lower()+'-entries.json') as entries_file:
			entries_data = json.load(entries_file)
		with open(level['name'].lower()+'-grades.json') as grades_file:
			grades_data = json.load(grades_file)
		for ebacc_flag in [True, False, None]:
			row=OrderedDict([])
			row['entries_y0']=''
			row['entries_yn']=''
			if ebacc_flag==True:
				row['subject_name_clean']='EBacc'
			elif ebacc_flag==False:
				row['subject_name_clean']='Non-EBacc'
			else:
				row['subject_name_clean']='Total'
			for subject in subjects_data:
				if criteria=='All' or ('Discontinued' not in str(subject['reform_year']['EN'])):
					if subject['flags']['ebacc']==ebacc_flag:		# all subjects is recorded as null
						alias=subject['alias']
						data=[]
						for entries in entries_data:
							if entries['name']=='All students' and entries['alias']==alias and entries['scope']==scope:
								data=entries['data']
								for data_item in data:
									if data_item[0]==y0:
										if row['entries_y0']=='':
											row['entries_y0']=data_item[1]
										else:
											row['entries_y0']=int(row['entries_y0'])+data_item[1]
									if data_item[0]==yn:
										if row['entries_yn']=='':
											row['entries_yn']=data_item[1]
										else:
											row['entries_yn']=int(row['entries_yn'])+data_item[1]
								break
						data=[]
			print(row['subject_name_clean'] + ', ' + str(row['entries_y0']) + ', ' + str(row['entries_yn']) + ', ' + str(round((row['entries_yn']-row['entries_y0'])*100.0/row['entries_y0'],1)) + '%')
