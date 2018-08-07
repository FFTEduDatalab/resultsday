# -*- coding: utf-8 -*-
#!/usr/bin/python

import os
import re
import json
from xlrd import open_workbook
from collections import OrderedDict

levels=[
	{
		'name':'A-Level',
		'source':'data\\source\\a-level',
		'output':'data\\output\\a-level',
		'grades':['A*','A','B','C','D','E','U']
	},
	{
		'name':'AS-Level',
		'source':'data\\source\\as-level',
		'output':'data\\output\\as-level',
		'grades':['A','B','C','D','E','U']
	},
	{
		'name':'GCSE',
		'source':'data\\source\\gcse',
		'output':'data\\output\\gcse',
		'grades':['A/7','C/4','G/1','U']
	}
]

for level in levels:
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	os.chdir(level['output'])
	texts_list=[]
	with open(level['name'].lower()+'-subjects.json') as subjects_file:
		subjects_data = json.load(subjects_file)
	with open(level['name'].lower()+'-entries.json') as entries_file:
		entries_data = json.load(entries_file)
	with open(level['name'].lower()+'-grades.json') as grades_file:
		grades_data = json.load(grades_file)
	for subject in subjects_data:		# not done using zip, as files being read are of different lengths
		alias=subject['alias']
		texts=OrderedDict([])
		texts['alias']=alias
		texts['subject_name_clean']=subject['subject_name_clean']
		for entries in entries_data:
			if entries['name']=='All students' and entries['alias']==alias and entries['scope']=='UK':
				texts['y0']=entries['data'][0][0]
				texts['yn']=entries['data'][-1][0]
				texts['entries_y0']=entries['data'][0][1]
				texts['entries_yn']=entries['data'][-1][1]
				if alias=='ALLS':
					allsubjects_y0=entries['data'][0][0]
					allsubjects_yn=entries['data'][-1][0]
					allsubjects_entries_y0=entries['data'][0][1]
					allsubjects_entries_yn=entries['data'][-1][1]
				break
		for grades in grades_data:
			if (grades['name']=='C' or grades['name']=='C/4') and grades['alias']==alias and grades['scope']=='UK' and grades['gender']=='All students':
				texts['top_grades_y0']=grades['data'][0][1]
				texts['top_grades_yn']=grades['data'][-1][1]
				if alias=='ALLS':
					allsubjects_top_grades_yn=grades['data'][-1][1]
				break
		texts_list.append(texts)

	# write analysis
	if allsubjects_yn==2017:
	    number_of_years='four'
	elif allsubjects_yn==2018:
	    number_of_years='five'
	allsubjects_entries_change=round((allsubjects_entries_yn-allsubjects_entries_y0)*1.0/allsubjects_entries_y0*100,1)
	for texts in texts_list:
		texts['analysis']=''
		if texts.get('y0') is not None:		# analysis only written for subjects for which we have entries and grades data (i.e. not new subjects which have only been added to subjects data file)
			subject_entries_change=round((texts['entries_yn']-texts['entries_y0'])*1.0/texts['entries_y0']*100.0,1)
			if subject_entries_change>0:
			    subject_entries_change_sign='increased'
			elif subject_entries_change<0:
			    subject_entries_change_sign='decreased'
			elif subject_entries_change==0:
			    subject_entries_change_sign='stayed the same'
			if abs(subject_entries_change)>=20:
			    subject_entries_change_scale='sharply '
			elif abs(subject_entries_change)<20 and subject_entries_change!=0:
			    subject_entries_change_scale='a little '
			elif subject_entries_change==0:
				subject_entries_change_scale=''
			if abs(subject_entries_change-allsubjects_entries_change)>5:
			    entries_change_comparison='greater than'
			elif abs(subject_entries_change-allsubjects_entries_change)<-5:
			    entries_change_comparison='smaller than'
			elif abs(subject_entries_change-allsubjects_entries_change)<=5:
			    entries_change_comparison='broadly in line with'
			if (texts['top_grades_yn']-allsubjects_top_grades_yn)>2.5:
			    top_grades_comparison='greater'
			    top_grades_comparison_wording='compared to'
			elif (texts['top_grades_yn']-allsubjects_top_grades_yn)<-2.5:
			    top_grades_comparison='smaller'
			    top_grades_comparison_wording='compared to'
			elif abs(texts['top_grades_yn']-allsubjects_top_grades_yn)<=2.5:
			    top_grades_comparison='broadly similar'
			    top_grades_comparison_wording='as did so across'
			if level['name']=='A-Level':
			    top_grades='A*-C grades'
			elif level['name']=='AS-Level':
			    top_grades='A-C grades'
			elif level['name']=='GCSE':
			    top_grades='grade C/4 or higher'
			if texts['alias']!='ALLS':
				texts['analysis']='<p>Entries in <em>' + texts['subject_name_clean'] + '</em> have ' + subject_entries_change_sign + ' ' + subject_entries_change_scale + 'across the UK over the last ' + number_of_years + ' years. The ' + str(subject_entries_change) + '% change is ' + entries_change_comparison + ' the overall change, of ' + str(allsubjects_entries_change) + '%, in all ' + level['name'] + ' entries over the last ' + number_of_years + ''' years.</p><p>Across the UK, a ''' + top_grades_comparison + ' proportion of students achieved the top grades in <em>' + texts['subject_name_clean'] + '</em> in ' + str(texts['yn']) + ' ' + top_grades_comparison_wording + ' all ' + level['name'] + ' subjects. A total of ' + str(texts['top_grades_yn']) + '% of pupils achieved ' + top_grades + ' in <em>' + texts['subject_name_clean'] + '</em> compared to ' + str(allsubjects_top_grades_yn) + '% for all subjects.</p>'
			else:
				texts['analysis']='<p>Entries in <em>' + texts['subject_name_clean'] + '</em> have ' + subject_entries_change_sign + ' by ' + str(abs(subject_entries_change)) + '% across the UK over the last ' + number_of_years + ' years. Across the UK, ' + str(texts['top_grades_yn']) + '% of pupils achieved ' + top_grades + ' in <em>' + texts['subject_name_clean'] + '</em> in ' + str(texts['yn']) + '.</p>'

	texts_list_redux=[]
	for texts in texts_list:
		texts_redux={key:texts[key] for key in ['alias','analysis']}
		texts_list_redux.append(texts_redux)

	# write to json file
	os.chdir(os.path.dirname( __file__ ))
	os.chdir('..')
	os.chdir(level['output'])

	text_filename=level['name'].lower()+'-text.json'

	with open(text_filename, 'w') as outfile:
		json.dump(texts_list_redux, outfile, indent=4, separators=(',', ': '))
