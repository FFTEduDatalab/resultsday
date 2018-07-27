# -*- coding: utf-8 -*-
#!/usr/bin/python

import os
import re
import json
from xlrd import open_workbook
from collections import OrderedDict

genders = ['Male','Female','All students']

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
	os.chdir(level['source'])
	entries=OrderedDict([])
	grades=OrderedDict([])
	row=OrderedDict([])
	entries_list=[]
	grades_list=[]
	rows=[]

	for source_file in os.listdir('.'):
		if source_file.endswith('.xls') or source_file.endswith('.xlsx'):
			filename=source_file.split('.')[0]
			filename_split=filename.split('_')
			if level['name']!='GCSE' or (level['name']=='GCSE' and filename_split[3]!='91'):
				print filename
				year=int(filename_split[1])
				scope=filename_split[2].upper()
				try:
					rb=open_workbook(source_file)
					rbws=rb.sheet_by_index(0)
					for rbrow in range(11,rbws.nrows):			# ditching 10 header rows
						row=OrderedDict.fromkeys(row, None)
						if rbws.cell(rbrow,0).value!='' and rbws.cell(rbrow,0).value[0]!='(':		# ditches blank rows and table notes
							subject_name = re.match('[^0-9]+[^()0-9]+[)]*',rbws.cell(rbrow,0).value).group(0).strip()		# regex uses negative lookahead for numericss
						if rbws.cell(rbrow,1).value in ['Male', 'Female', 'Male & Female']:		# ditches previous year's results
							row['subject']=subject_name
							row['scope']=scope
							row['year']=year
							if rbws.cell(rbrow,1).value=='Male & Female':
								row['gender']='All students'
							else:
								row['gender']=rbws.cell(rbrow,1).value
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
					print ex

	for gender in genders:
		for row in rows:
			if row['gender']==gender:
				if any(entries['name']==gender and entries['subject']==row['subject'] and entries['scope']==row['scope'] for entries in entries_list)==True:
					for entries in entries_list:
						if entries['name']==gender and entries['subject']==row['subject'] and entries['scope']==row['scope']:
							data_item=[row['year'],row['entries']]
							entries['data'].append(data_item)
							break
				else:
					entries=OrderedDict([])
					entries['name']=gender
					entries['subject']=row['subject']
					entries['scope']=row['scope']
					data_item=[row['year'],row['entries']]
					entries['data']=[]
					entries['data'].append(data_item)
					entries_list.append(entries)

	for grade in level['grades']:
		for row in rows:
			if any(grades['name']==grade and grades['subject']==row['subject'] and grades['scope']==row['scope'] and grades['gender']==row['gender'] for grades in grades_list)==True:
				for grades in grades_list:
					if grades['name']==grade and grades['subject']==row['subject'] and grades['scope']==row['scope'] and grades['gender']==row['gender']:
						data_item=[row['year'],row[grade]]
						grades['data'].append(data_item)
						break
			else:
				grades=OrderedDict([])
				grades['name']=grade
				grades['subject']=row['subject']
				grades['scope']=row['scope']
				grades['gender']=row['gender']
				data_item=[row['year'],row[grade]]
				grades['data']=[]
				grades['data'].append(data_item)
				grades_list.append(grades)

	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	os.chdir(level['output'])

	grades_filename=level['name'].lower()+'-grades.json'
	entries_filename=level['name'].lower()+'-entries.json'

	with open(grades_filename, 'w') as outfile:
	    json.dump(grades_list, outfile)

	with open(entries_filename, 'w') as outfile:
	    json.dump(entries_list, outfile)
