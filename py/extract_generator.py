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
		'grades':['A/7 or above','C/4 or above','G/1 or above','U or above']
	}
]

nations=['UK','EN','WA','NI']
ages=['15','16','17']

# AS-Level entries and grades, 2015 v 2018
# for level in levels:
# 	if level['name']=='AS-Level':
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
# 		for nation in nations:
# 			for subject in subjects_data:
# 				alias=subject['alias']
# 				row=OrderedDict([])
# 				row['alias']=alias
# 				row['subject_name_clean']=subject['subject_name_clean']
# 				row['nation']=nation
# 				row['reform_year_EN']=subject['reform_year']['EN']
# 				row['reform_year_WA']=subject['reform_year']['WA']
# 				row['reform_year_NI']=subject['reform_year']['NI']
# 				data=[]
# 				for entries in entries_data:
# 					if entries['name']=='All students' and entries['alias']==alias and entries['scope']==nation:
# 						data=entries['data']
# 						for data_item in data:
# 							if data_item[0]==2015:
# 								row['entries_2015']=data_item[1]
# 							if data_item[0]==2018:
# 								row['entries_2018']=data_item[1]
# 						break
# 				data=[]
# 				for grades in grades_data:
# 					if (grades['name']=='A' or grades['name']=='C or above') and grades['scope']==nation and grades['gender']=='All students' and grades['alias']==alias:
# 						data=grades['data']
# 						for data_item in data:
# 							if data_item[0]==2015:
# 								if grades['name']=='A':
# 									row['A_2015']=data_item[1]
# 								elif grades['name']=='C or above':
# 									row['C_2015']=data_item[1]
# 							if data_item[0]==2018:
# 								if grades['name']=='A':
# 									row['A_2018']=data_item[1]
# 								elif grades['name']=='C or above':
# 									row['C_2018']=data_item[1]
# 				row_list.append(row)
# 		keys = row_list[0].keys()
# 		with open('2015_2018.csv', 'wb') as output_file:
# 			dict_writer = csv.DictWriter(output_file, keys)
# 			dict_writer.writeheader()
# 			dict_writer.writerows(row_list)

# GCSE, newly reformed subjects, 2018
# XXX Excludes: dance
# for level in levels:
# 	if level['name']=='GCSE':
# 		os.chdir(os.path.dirname( __file__ ))
# 		os.chdir('..')
# 		os.chdir(level['output'])
# 		row_list=[]
# 		with open(level['name'].lower()+'-subjects.json') as subjects_file:
# 			subjects_data = json.load(subjects_file)
# 		for subject in subjects_data:
# 			row=OrderedDict([])
# 			if '2018' in str(subject['reform_year']['EN']) and subject['reform_year']['EN']!='Being discontinued, 2018':
# 				row['alias']=subject['alias']
# 				row['subject_name_clean']=subject['subject_name_clean']
# 				row['reform_year_EN']=subject['reform_year']['EN']
# 				print row

# GCSE, blogpost figures, 2017-2018
for level in levels:
	if level['name']=='GCSE':
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
		for subject in subjects_data:
			age='16'
			alias=subject['alias']
			row=OrderedDict([])
			row['alias']=alias
			row['subject_name_clean']=subject['subject_name_clean']
			row['age']=age
			row['entries_2017']=''
			row['entries_2018']=''
			row['A_2017']=''
			row['C_2017']=''
			row['A_2018']=''
			row['C_2018']=''
			data=[]
			for entries in entries_data:
				if entries['name']=='All students' and entries['alias']==alias and entries['scope']==age:
					data=entries['data']
					for data_item in data:
						if data_item[0]==2017:
							row['entries_2017']=data_item[1]
						if data_item[0]==2018:
							row['entries_2018']=data_item[1]
					break
			data=[]
			for grades in grades_data:
				if (grades['name']=='A/7 or above' or grades['name']=='C/4 or above') and grades['scope']==age and grades['gender']=='All students' and grades['alias']==alias:
					data=grades['data']
					for data_item in data:
						if data_item[0]==2017:
							if grades['name']=='A/7 or above':
								row['A_2017']=data_item[1]
							elif grades['name']=='C/4 or above':
								row['C_2017']=data_item[1]
						if data_item[0]==2018:
							if grades['name']=='A/7 or above':
								row['A_2018']=data_item[1]
							elif grades['name']=='C/4 or above':
								row['C_2018']=data_item[1]
			print row['alias'], row['subject_name_clean'], row['age'], row['entries_2017'], row['entries_2018'], row['A_2017'], row['A_2018'], row['C_2017'], row['C_2018']
