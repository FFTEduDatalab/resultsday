# -*- coding: utf-8 -*-
#!/usr/bin/python

import os
import json
from xlrd import open_workbook
from xlwt import Workbook
from collections import OrderedDict

levels=OrderedDict([
	('A-Level', 'C:\\Users\\pnye\\Dropbox\\resultsday\\data\\a-level'),
	('AS-Level', 'C:\\Users\\pnye\\Dropbox\\resultsday\\data\\as-level'),
	# ('GCSE', 'C:\\Users\\pnye\\Dropbox\\resultsday\\data\\gcse')
])

for level in levels:
	os.chdir(levels[level])
	grades=OrderedDict([])
	entries=OrderedDict([])
	grades_list=[]
	entries_list=[]
	for file in os.listdir('.'):
		if file.endswith(".xls") or file.endswith(".xlsx"):
			filename=file.split(".")
			year=int(filename[0][:4])
			coverage=filename[0][-2:].upper()
			try:
				rb=open_workbook(file)
				rbws=rb.sheet_by_index(0)
				for rbrow in range(11,rbws.nrows):			# ditching 10 header rows
					grades=OrderedDict.fromkeys(grades, None)
					entries=OrderedDict.fromkeys(entries, None)
					if rbws.cell(rbrow,0).value!='' and rbws.cell(rbrow,0).value[0]!='(':
						subject=rbws.cell(rbrow,0).value.split("(")[0].strip()
					if rbws.cell(rbrow,1).value in ['Male', 'Female', 'Male & Female']:		# ditches previous year's results, blank rows and table notes
						grades['Subject']=subject
						entries['Subject']=subject
						grades['Coverage']=coverage
						entries['Coverage']=coverage
						grades['Year']=year
						entries['Year']=year
						grades['Gender']=rbws.cell(rbrow,1).value
						if level=='A-Level':
							grades['A*']=round(rbws.cell(rbrow,4).value,1)
							grades['A']=round(rbws.cell(rbrow,5).value,1)
							grades['B']=round(rbws.cell(rbrow,6).value,1)
							grades['C']=round(rbws.cell(rbrow,7).value,1)
							grades['D']=round(rbws.cell(rbrow,8).value,1)
							grades['E']=round(rbws.cell(rbrow,9).value,1)
							grades['U']=round(rbws.cell(rbrow,10).value,1)
						elif level=='AS-Level':
							grades['A']=round(rbws.cell(rbrow,4).value,1)
							grades['B']=round(rbws.cell(rbrow,5).value,1)
							grades['C']=round(rbws.cell(rbrow,6).value,1)
							grades['D']=round(rbws.cell(rbrow,7).value,1)
							grades['E']=round(rbws.cell(rbrow,8).value,1)
							grades['U']=round(rbws.cell(rbrow,9).value,1)
						if rbws.cell(rbrow,1).value=='Male':
							entries['Male']=int(rbws.cell(rbrow,2).value)
						if rbws.cell(rbrow,1).value=='Female':
							entries['Female	']=int(rbws.cell(rbrow,2).value)
						if rbws.cell(rbrow,1).value=='Male & Female':
							entries['Male & Female']=int(rbws.cell(rbrow,2).value)
						grades_list.append(grades)
						entries_list.append(entries)
			except Exception as ex:
				print ex

	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	if level in ['A-Level','AS-Level']:
		os.chdir('a-level')
	elif level=='GCSE':
		os.chdir('gcse')

	grades_file=level.lower()+'-grades.json'
	entries_file=level.lower()+'-entries.json'

	with open(grades_file, 'w') as outfile:
	    json.dump(grades_list, outfile)

	with open(entries_file, 'w') as outfile:
	    json.dump(entries_list, outfile)
