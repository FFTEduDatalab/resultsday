# -*- coding: utf-8 -*-
#!/usr/bin/python

import os
import re
import json
from xlrd import open_workbook
from collections import OrderedDict

min_year=2016

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

os.chdir(os.path.dirname( __file__ ))
os.chdir('..')
with open('data\\output\\popn\\popn.json') as popn_file:
	popn_data = json.load(popn_file)

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
			allsubjects_entries=entries		# used so that _all subjects_ data is accessible when analysis is being written for each individual subject
			break
	for grades in grades_data:
		if ((level['name']=='A-Level' and grades['name']=='A or above') or (level['name']=='AS-Level' and grades['name']=='A') or (level['name']=='GCSE' and grades['name']=='4/C or above')) and grades['scope']=='UK' and grades['gender']=='All students' and grades['alias']=='ALLS':
			allsubjects_grades=grades		# ditto
			break
	for subject in subjects_data:		# not done using zip, as files being read are of different lengths
		alias=subject['alias']
		texts=OrderedDict([])
		texts['alias']=alias
		texts['subject_name_clean_lc']=subject['subject_name_clean_lc']
		for entries in entries_data:
			if entries['name']=='All students' and entries['alias']==alias and entries['scope']=='UK':
				for year in entries['data']:
					if year[0]>=min_year:		# as we might have entries/grades data that we won't be charting
						texts['y0']=year[0]
						texts['entries_y0']=year[1]
						break
				texts['yn']=entries['data'][-1][0]
				texts['years']=texts['yn']-texts['y0']+1
				yn_y0=texts['years']
				texts['entries_yn']=entries['data'][-1][1]
				texts['allsubjects_entries_y0']=allsubjects_entries['data'][-yn_y0][1]		# needs to be based on the same number of years as the subject being looked at, for subjects that have < five years of data
				texts['allsubjects_entries_yn']=allsubjects_entries['data'][-1][1]
				break
		for grades in grades_data:
			if ((level['name']=='A-Level' and grades['name']=='A or above') or (level['name']=='AS-Level' and grades['name']=='A') or (level['name']=='GCSE' and grades['name']=='4/C or above')) and grades['scope']=='UK' and grades['gender']=='All students' and grades['alias']==alias:
				texts['highlighted_grades_yn']=grades['data'][-1][1]
				texts['allsubjects_highlighted_grades_yn']=allsubjects_grades['data'][-1][1]
				break
		for popn in popn_data:		# relies on what's done in entries loop
			if level['name']=='A-Level' and popn['scope']=='18':
				texts['popn_defn']='18'
				for year in popn['data']:		# need to loop through every year
					if year[0]==texts['y0']:
						texts['popn_y0']=year[1]
					if year[0]==texts['yn']:
						texts['popn_yn']=year[1]		# done this way rather than by selecting the final year, as we may had added a more recent year of population data than is available at a given time for entries and gradess
				break
			if level['name']=='AS-Level' and popn['scope']=='17':
				texts['popn_defn']='17'
				for year in popn['data']:		# need to loop through every year
					if year[0]==texts['y0']:
						texts['popn_y0']=year[1]
					if year[0]==texts['yn']:
						texts['popn_yn']=year[1]		# done this way rather than by selecting the final year, as we may had added a more recent year of population data than is available at a given time for entries and gradess
				break
			if level['name']=='GCSE' and popn['scope']=='16':
				texts['popn_defn']='16'
				for year in popn['data']:		# need to loop through every year
					if year[0]==texts['y0']:
						texts['popn_y0']=year[1]
					if year[0]==texts['yn']:
						texts['popn_yn']=year[1]		# done this way rather than by selecting the final year, as we may had added a more recent year of population data than is available at a given time for entries and gradess
				break
		texts_list.append(texts)

	# write analysis
	for texts in texts_list:
		texts['analysis']=''
		if texts.get('y0') is not None:		# analysis only written for subjects for which we have entries and grades data (i.e. not new subjects which have only been added to subjects data file)
			allsubjects_entries_change=round((texts['allsubjects_entries_yn']-texts['allsubjects_entries_y0'])*1.0/texts['allsubjects_entries_y0']*100,1)
			subject_entries_change=round((texts['entries_yn']-texts['entries_y0'])*1.0/texts['entries_y0']*100.0,1)
			subject_popn_change=round((texts['popn_yn']-texts['popn_y0'])*1.0/texts['popn_y0']*100.0,1)
			if texts['years']==2:		# one year handled separately below
				number_of_years='two'
			elif texts['years']==3:
				number_of_years='three'
			elif texts['years']==4:
				number_of_years='four'
			elif texts['years']==5:
				number_of_years='five'
			if allsubjects_entries_change>0:
			    allsubjects_entries_change_sign='+'
			else:
				allsubjects_entries_change_sign=''
			if subject_popn_change>0:
			    subject_popn_change_sign='+'
			    subject_popn_change_direction='increased'
			elif subject_popn_change<0:
			    subject_popn_change_sign=''
			    subject_popn_change_direction='decreased'
			elif subject_popn_change==0:
			    subject_popn_change_sign=''
			    subject_popn_change_direction='stayed the same'
			if subject_entries_change>0:
			    subject_entries_change_sign='+'
			    subject_entries_change_direction='increased'
			elif subject_entries_change<0:
			    subject_entries_change_sign=''
			    subject_entries_change_direction='decreased'
			elif subject_entries_change==0:
			    subject_entries_change_sign=''
			    subject_entries_change_direction='stayed the same'
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
				highlighted_grades='grade 4/C or higher'
			if texts['alias']!='ALLS':
				if texts['years']==1:
					texts['analysis']='<p>Across the UK, a ' + highlighted_grades_comparison + ' proportion of students achieved ' + metric + ' in ' + texts['subject_name_clean_lc'] + ' in ' + str(texts['yn']) + ' ' + highlighted_grades_comparison_wording + ' all ' + level['name'] + ' subjects. A total of ' + str(texts['highlighted_grades_yn']) + '% of pupils achieved ' + highlighted_grades + ' in ' + texts['subject_name_clean_lc'] + ' compared to ' + str(texts['allsubjects_highlighted_grades_yn']) + '% for all subjects.</p>'
				else:
					texts['analysis']='<p>Entries in ' + texts['subject_name_clean_lc'] + ' have ' + subject_entries_change_direction + ' ' + subject_entries_change_scale + 'across the UK over the last ' + number_of_years + ' years. The ' + subject_entries_change_sign + str(subject_entries_change) + '% change compared to a change of ' + allsubjects_entries_change_sign + str(allsubjects_entries_change) + '% in all ' + level['name'] + ' entries over the last ' + number_of_years + ' years. Over the same period, the ' + texts['popn_defn'] + '-year-old population has changed by approximately ' + str(subject_popn_change) + '%.</p><p>Across the UK, a ' + highlighted_grades_comparison + ' proportion of students achieved ' + metric + ' in ' + texts['subject_name_clean_lc'] + ' in ' + str(texts['yn']) + ' ' + highlighted_grades_comparison_wording + ' all ' + level['name'] + ' subjects. A total of ' + str(texts['highlighted_grades_yn']) + '% of pupils achieved ' + highlighted_grades + ' in ' + texts['subject_name_clean_lc'] + ' compared to ' + str(texts['allsubjects_highlighted_grades_yn']) + '% for all subjects.</p>'
			else:
				texts['analysis']='<p>Entries in ' + texts['subject_name_clean_lc'] + ' have ' + subject_entries_change_direction + ' by ' + str(abs(subject_entries_change)) + '% across the UK over the last ' + number_of_years + ' years. Over the same period, the ' + texts['popn_defn'] + '-year-old population has ' + subject_popn_change_direction + " by approximately " + subject_popn_change_sign + str(abs(subject_popn_change)) + '%. </p><p>Across the UK, ' + str(texts['highlighted_grades_yn']) + '% of pupils achieved ' + highlighted_grades + ' in ' + texts['subject_name_clean_lc'] + ' in ' + str(texts['yn']) + '.</p>'

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
