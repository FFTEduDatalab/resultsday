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
	os.chdir(level['output'])
	texts_list=[]
	with open(level['name'].lower()+'-subjects.json') as subjects_file:
		subjects_data = json.load(subjects_file)
	with open(level['name'].lower()+'-entries.json') as entries_file:
		entries_data = json.load(entries_file)
	with open(level['name'].lower()+'-grades.json') as grades_file:
		grades_data = json.load(grades_file)
	for entries in entries_data:
		if entries['name']=='All students' and entries['scope']=='UK' and entries['alias']=='ALLS':
			allsubjects_entries=entries
			break
	for grades in grades_data:
		if ((level['name']=='A-Level' and grades['name']=='A or above') or (level['name']=='AS-Level' and grades['name']=='A') or (level['name']=='GCSE' and grades['name']=='C/4 or above')) and grades['scope']=='UK' and grades['gender']=='All students' and grades['alias']=='ALLS':
			allsubjects_grades=grades
			break
	for subject in subjects_data:		# not done using zip, as files being read are of different lengths
		alias=subject['alias']
		texts=OrderedDict([])
		texts['alias']=alias
		texts['subject_name_clean_lc']=subject['subject_name_clean_lc']
		for entries in entries_data:
			if entries['name']=='All students' and entries['alias']==alias and entries['scope']=='UK':
				texts['y0']=entries['data'][0][0]
				texts['yn']=entries['data'][-1][0]
				texts['years']=texts['yn']-texts['y0']+1
				yn_y0=texts['years']
				texts['entries_y0']=entries['data'][0][1]
				texts['entries_yn']=entries['data'][-1][1]
				texts['allsubjects_y0']=allsubjects_entries['data'][-yn_y0][0]
				texts['allsubjects_yn']=allsubjects_entries['data'][-1][0]
				texts['allsubjects_entries_y0']=allsubjects_entries['data'][-yn_y0][1]
				texts['allsubjects_entries_yn']=allsubjects_entries['data'][-1][1]
				break
		for grades in grades_data:
			if ((level['name']=='A-Level' and grades['name']=='A or above') or (level['name']=='AS-Level' and grades['name']=='A') or (level['name']=='GCSE' and grades['name']=='C/4 or above')) and grades['scope']=='UK' and grades['gender']=='All students' and grades['alias']==alias:
				texts['highlighted_grades_y0']=grades['data'][0][1]
				texts['highlighted_grades_yn']=grades['data'][-1][1]
				texts['allsubjects_highlighted_grades_yn']=allsubjects_grades['data'][-1][1]
				break
		texts_list.append(texts)

	# write analysis
	for texts in texts_list:
		allsubjects_entries_change=round((texts['allsubjects_entries_yn']-texts['allsubjects_entries_y0'])*1.0/texts['allsubjects_entries_y0']*100,1)
		if texts['years']==2:		# one year handled separately below
			number_of_years='two'
		elif texts['years']==3:
			number_of_years='three'
		elif texts['years']==4:
			number_of_years='four'
		elif texts['years']==5:
			number_of_years='five'
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
			elif 5<=abs(subject_entries_change)<20:
				subject_entries_change_scale=''
			elif abs(subject_entries_change)<5:
			    subject_entries_change_scale='a little '
			elif subject_entries_change==0:
				subject_entries_change_scale=''
			if (texts['highlighted_grades_yn']-texts['allsubjects_highlighted_grades_yn'])>2.5:
			    highlighted_grades_comparison='greater'
			    highlighted_grades_comparison_wording='compared to'
			elif (texts['highlighted_grades_yn']-texts['allsubjects_highlighted_grades_yn'])<-2.5:
			    highlighted_grades_comparison='smaller'
			    highlighted_grades_comparison_wording='compared to'
			elif abs(texts['highlighted_grades_yn']-texts['allsubjects_highlighted_grades_yn'])<=2.5:
			    highlighted_grades_comparison='broadly similar'
			    highlighted_grades_comparison_wording='as did so across'
			if level['name']=='A-Level':
				metric='the top grades'
				highlighted_grades='A*-A grades'
			elif level['name']=='AS-Level':
				metric='the top grades'
				highlighted_grades='A grades'
			elif level['name']=='GCSE':
				metric='good passes'
				highlighted_grades='grade C/4 or higher'
			if texts['alias']!='ALLS':
				if texts['years']==1:
					texts['analysis']='<p>Across the UK, a ' + highlighted_grades_comparison + ' proportion of students achieved ' + metric + ' in <em>' + texts['subject_name_clean_lc'] + '</em> in ' + str(texts['yn']) + ' ' + highlighted_grades_comparison_wording + ' all ' + level['name'] + ' subjects. A total of ' + str(texts['highlighted_grades_yn']) + '% of pupils achieved ' + highlighted_grades + ' in <em>' + texts['subject_name_clean_lc'] + '</em> compared to ' + str(texts['allsubjects_highlighted_grades_yn']) + '% for all subjects.</p>'
				else:
					texts['analysis']='<p>Entries in <em>' + texts['subject_name_clean_lc'] + '</em> have ' + subject_entries_change_sign + ' ' + subject_entries_change_scale + 'across the UK over the last ' + number_of_years + ' years. The ' + str(subject_entries_change) + '% change compared to a change of ' + str(allsubjects_entries_change) + '% in all ' + level['name'] + ' entries over the last ' + number_of_years + ' years.</p><p>Across the UK, a ' + highlighted_grades_comparison + ' proportion of students achieved ' + metric + ' in <em>' + texts['subject_name_clean_lc'] + '</em> in ' + str(texts['yn']) + ' ' + highlighted_grades_comparison_wording + ' all ' + level['name'] + ' subjects. A total of ' + str(texts['highlighted_grades_yn']) + '% of pupils achieved ' + highlighted_grades + ' in <em>' + texts['subject_name_clean_lc'] + '</em> compared to ' + str(texts['allsubjects_highlighted_grades_yn']) + '% for all subjects.</p>'
			else:
				texts['analysis']='<p>Entries in <em>' + texts['subject_name_clean_lc'] + '</em> have ' + subject_entries_change_sign + ' by ' + str(abs(subject_entries_change)) + '% across the UK over the last ' + number_of_years + ' years.</p><p>Across the UK, ' + str(texts['highlighted_grades_yn']) + '% of pupils achieved ' + highlighted_grades + ' in <em>' + texts['subject_name_clean_lc'] + '</em> in ' + str(texts['yn']) + '.</p>'

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
