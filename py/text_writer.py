#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import os

most_recent_year=2017
level='A-Level'
data_list=[]

# Build object data for each subject
subject='Chemistry'
entries_subject_y0=71871.0
entries_subject_yn=65403.0
entries_allsubjects_y0=6371871.0
entries_allsubjects_yn=6065403.0
top_grades_subject_yn=round(40.2,1)
top_grades_allsubjects_yn=round(38.2,1)

if most_recent_year==2017:
    number_of_years='four'
elif most_recent_year==2018:
    number_of_years='five'
entries_subject_change=round((entries_subject_yn-entries_subject_y0)/entries_subject_y0*100,1)
entries_allsubject_change=round((entries_allsubjects_yn-entries_allsubjects_y0)/entries_allsubjects_y0*100,1)
if (entries_subject_change)>0:
    entries_subject_change_sign='increased'
elif (entries_subject_change)<0:
    entries_subject_change_sign='decreased'
elif (entries_subject_change)==0:
    entries_subject_change_sign='stayed the same'
if abs(entries_subject_change)>=20:
    entries_subject_change_scale='sharply'
else:
    entries_subject_change_scale='a little'
if (entries_subject_change-entries_allsubject_change)>5:
    entries_change_comparison='greater than'
elif (entries_subject_change-entries_allsubject_change)<-5:
    entries_change_comparison='smaller than'
elif abs(entries_subject_change-entries_allsubject_change)<=5:
    entries_change_comparison='broadly in line with'
if (top_grades_subject_yn-top_grades_allsubjects_yn)>2.5:
    top_grades_comparison='greater'
    top_grades_comparison_wording='compared to'
elif (top_grades_subject_yn-top_grades_allsubjects_yn)<-2.5:
    top_grades_comparison='smaller'
    top_grades_comparison_wording='compared to'
elif abs(top_grades_subject_yn-top_grades_allsubjects_yn)<=2.5:
    top_grades_comparison='broadly similar'
    top_grades_comparison_wording='as did so across'
if level=='A-Level':
    top_grades='A*-C grades'
elif level=='AS-Level':
    top_grades='A-C grades'
elif level=='GCSE':
    top_grades='grade C/4 or higher'

text='Entries in ' + subject.lower() + ' have ' + entries_subject_change_sign + ' ' + entries_subject_change_scale + ' across the UK over the last ' + number_of_years + ' years. The ' + str(entries_subject_change) + '% change is ' + entries_change_comparison + ' the overall change, of ' + str(entries_allsubject_change) + '%, in all ' + level + ' entries over the last ' + number_of_years + ''' years.

Across the UK, a ''' + top_grades_comparison + ' proportion of students achieved the top grades in ' + subject.lower() + ' in ' + str(most_recent_year) + ' ' + top_grades_comparison_wording + ' all ' + level + ' subjects. A total of ' + str(top_grades_subject_yn) + '% of pupils achieved ' + top_grades + ' in ' + subject.lower() + ' compared to ' + str(top_grades_allsubjects_yn) + '% for all subjects.'

data={
    'subject':subject,
    'facilitating_subject':True,
    'reform_date_EN':2016,
    'reform_date_WA':2016,
    'reform_date_NI':2017,
    'text':text
}

data_list.append(data)

# Write data to json file
os.chdir(os.path.dirname( __file__ ))
os.chdir("..")
os.chdir('a-level')

with open('a-level-text.json', 'w') as outfile:
    json.dump(data_list, outfile)
