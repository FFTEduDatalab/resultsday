# -*- coding: utf-8 -*-
#!/usr/bin/python
# NB: This script is somewhere between rebuilding the data from scratch each time, and only adding new years. For a given level, if there are new years then all data for that level is rebuilt from scratch, but data for other levels isn't

import os
import re
import json
from xlrd import open_workbook
from collections import OrderedDict

min_year=2014

mode='normal'		# used to control whether only new, more recent years are added to the data, or if the data is written from scratch
# mode='testing'

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

def check_existing_coverage():
	global latest_output_year
	latest_output_year=None
	for entry in entries_data:
		if latest_output_year is None or entry['data'][0][0]>latest_output_year:
			latest_output_year=entry['data'][-1][0]
	return latest_output_year

for level in levels:
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	os.chdir(level['output'])
	subjects_filename=level['name'].lower()+'-subjects.json'
	entries_filename=level['name'].lower()+'-entries.json'
	grades_filename=level['name'].lower()+'-grades.json'
	entries_data=[]
	with open(subjects_filename) as subjects_file:
		subjects_data=json.load(subjects_file)
	if os.path.isfile(entries_filename):
		with open(entries_filename) as entries_file:
			entries_data=json.load(entries_file)
	if mode=='normal':
		check_existing_coverage()
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	os.chdir(level['source'])
	entries=OrderedDict([])
	grades=OrderedDict([])
	row=OrderedDict([])
	entries_list=[]
	grades_list=[]
	rows=[]
	needs_saving=0
	latest_source_year = None
	for source_file in os.listdir('.'):
		if source_file.endswith('.xls') or source_file.endswith('.xlsx'):
			filename=source_file.split('.')[0]
			filename_split=filename.split('_')
			year=int(filename_split[1])
		if latest_source_year is None or year>latest_source_year:
			latest_source_year=year
	for source_file in os.listdir('.'):
		if source_file.endswith('.xls') or source_file.endswith('.xlsx'):
			filename=source_file.split('.')[0]
			filename_split=filename.split('_')
			year=int(filename_split[1])
			if year>=min_year:
				if mode=='normal' and latest_source_year<=latest_output_year:
					print(filename + ' skipped')
					continue		# loop continued rather than broken, so we still get this _skipped_ message
				needs_saving=1
				scope=filename_split[2].upper()
				print(filename + ' added')
				try:
					rb=open_workbook(source_file)
					rbws=rb.sheet_by_index(0)
					for rbrow in range(11,rbws.nrows):			# ditching 10 header rows
						row=OrderedDict.fromkeys(row, None)
						if rbws.cell(rbrow,0).value!='' and rbws.cell(rbrow,0).value[0]!='(':		# ditches blank rows and table notes
							subject_name = re.match('[^0-9]+[^()0-9]+[)]*',rbws.cell(rbrow,0).value).group(0).strip()
							alias=''
							for subject in subjects_data:
								if any(subject_name.lower()==subj.lower() for subj in subject['subject_names'])==True:
									alias=subject['alias']
									break
						if alias!='':
							if rbws.cell(rbrow,1).value in ['Male', 'Female', 'Male & Female']:		# ditches previous year's results
								row['alias']=alias
								row['scope']=scope
								row['year']=year
								if rbws.cell(rbrow,1).value=='Male & Female':
									row['gender']='All students'
								else:
									row['gender']=rbws.cell(rbrow,1).value
								if rbws.cell(rbrow,2).value==' - ':
									row['entries']=5		# apply a dummy value where the true number is suppressed
								else:
									row['entries']=int(rbws.cell(rbrow,2).value)
								if level['name']!='GCSE' or (level['name']=='GCSE' and filename_split[3]=='keygrades'):		# A-Level, AS-Level and GCSE key grades files
									rbcol=4
									for grade in level['grades']:
										row[grade]=round(rbws.cell(rbrow,rbcol).value,1)
										rbcol+=1
								elif level['name']=='GCSE' and filename_split[3]=='ag':		# GCSE all grades files
									rbcols=[5,7,11,12]		# columns where A, C, G, U values are held
									for grade, rbcol in zip(level['grades'], rbcols):
										row[grade]=round(rbws.cell(rbrow,rbcol).value,1)
								rows.append(row)
				except Exception as ex:
					print(ex)
	for gender in genders:
		for row in rows:
			if row['gender']==gender:
				if any(entries['name']==gender and entries['alias']==row['alias'] and entries['scope']==row['scope'] for entries in entries_list)==True:
					for entries in entries_list:
						if entries['name']==gender and entries['alias']==row['alias'] and entries['scope']==row['scope']:
							data_item=[row['year'],row['entries']]
							entries['data'].append(data_item)
							break
				else:
					entries=OrderedDict([])
					entries['name']=gender
					entries['alias']=row['alias']
					entries['scope']=row['scope']
					data_item=[row['year'],row['entries']]
					entries['data']=[]
					entries['data'].append(data_item)
					entries_list.append(entries)
	for grade in level['grades']:
		for row in rows:
			if any(grades['name']==grade and grades['alias']==row['alias'] and grades['scope']==row['scope'] and grades['gender']==row['gender'] for grades in grades_list)==True:
				for grades in grades_list:
					if grades['name']==grade and grades['alias']==row['alias'] and grades['scope']==row['scope'] and grades['gender']==row['gender']:
						data_item=[row['year'],row[grade]]
						grades['data'].append(data_item)
						break
			else:
				grades=OrderedDict([])
				grades['name']=grade
				grades['alias']=row['alias']
				grades['scope']=row['scope']
				grades['gender']=row['gender']
				data_item=[row['year'],row[grade]]
				grades['data']=[]
				grades['data'].append(data_item)
				grades_list.append(grades)
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	os.chdir(level['output'])

	if needs_saving==1:
		with open(entries_filename, 'w') as entries_file:		# minified
			json.dump(entries_list, entries_file, separators=(',', ':'))
		with open(grades_filename, 'w') as grades_file:
			json.dump(grades_list, grades_file, separators=(',', ':'))
		# with open(entries_filename, 'w') as entries_file:		# prettified
		# 	json.dump(entries_list, entries_file, indent=4, separators=(',', ': '))
		# with open(grades_filename, 'w') as grades_file:
		# 	json.dump(grades_list, grades_file, indent=4, separators=(',', ': '))
