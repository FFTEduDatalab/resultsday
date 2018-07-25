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
	# {
	# 	'name':'GCSE',
	# 	'source':'data\\gcse',
	# 	'output':'gcse',
	# 	'grades':['A/7','C/4','G/1','U']
	# }
]

entries=OrderedDict([])
entries_list=[]

grades=OrderedDict([])
grades_list=[]

for level in levels:
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	os.chdir(level['source'])
	row=OrderedDict([])
	rows=[]
	for file in os.listdir('.'):
		if file.endswith(".xls") or file.endswith(".xlsx"):
			filename=file.split(".")
			year=int(filename[0][:4])
			coverage=filename[0][-2:].upper()
			try:
				rb=open_workbook(file)
				rbws=rb.sheet_by_index(0)
				for rbrow in range(11,rbws.nrows):			# ditching 10 header rows
					row=OrderedDict.fromkeys(row, None)
					if rbws.cell(rbrow,0).value!='' and rbws.cell(rbrow,0).value[0]!='(':		# ditches blank rows and table notes
						subject = re.match('[a-zA-Z]+[a-zA-Z ()]+(?![0-9])',rbws.cell(rbrow,0).value).group(0).strip()		# regex uses negative lookahead for numericss
					if rbws.cell(rbrow,1).value in ['Male', 'Female', 'Male & Female']:		# ditches previous year's results
						row['Subject']=subject
						row['Coverage']=coverage
						row['Year']=year
						if rbws.cell(rbrow,1).value=='Male & Female':
							row['Gender']='All students'
						else:
							row['Gender']=rbws.cell(rbrow,1).value
						i=4
						row['Entries']=int(rbws.cell(rbrow,2).value)
						for grade in level['grades']:
							row[grade]=round(rbws.cell(rbrow,i).value,1)
							i+=1
						rows.append(row)
			except Exception as ex:
				print ex

	for gender in genders:
		for row in rows:
			if row['Gender']==gender:
				if any(entries['name']==gender and entries['Subject']==row['Subject'] and entries['Coverage']==row['Coverage'] for entries in entries_list)==True:
					for entries in entries_list:
						if entries['name']==gender and entries['Subject']==row['Subject'] and entries['Coverage']==row['Coverage']:
							data_item=[row['Year'],row['Entries']]
							entries['data'].append(data_item)
							break
				else:
					entries=OrderedDict([])
					entries['name']=gender
					entries['Subject']=row['Subject']
					entries['Coverage']=row['Coverage']
					data_item=[row['Year'],row['Entries']]
					entries['data']=[]
					entries['data'].append(data_item)
					entries_list.append(entries)

	for grade in level['grades']:
		for row in rows:
			if any(grades['name']==grade and grades['Subject']==row['Subject'] and grades['Coverage']==row['Coverage'] and grades['Gender']==row['Gender'] for grades in grades_list)==True:
				for grades in grades_list:
					if grades['name']==grade and grades['Subject']==row['Subject'] and grades['Coverage']==row['Coverage'] and grades['Gender']==row['Gender']:
						data_item=[row['Year'],row[grade]]
						grades['data'].append(data_item)
						break
			else:
				grades=OrderedDict([])
				grades['name']=grade
				grades['Subject']=row['Subject']
				grades['Coverage']=row['Coverage']
				grades['Gender']=row['Gender']
				data_item=[row['Year'],row[grade]]
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
