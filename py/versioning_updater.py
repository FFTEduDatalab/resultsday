# -*- coding: utf-8 -*-
#!/usr/bin/python

import os

search_string='?v=20200825'
replacement_value='?v=20200910'

directories=['inc','js','templates','a-level','as-level','gcse']

def check_files_in_directory():
	for filename in os.listdir(path):
		if filename.endswith(('.php','.js')):
			print(filename)
			lines = []
			with open(os.path.join(filename), encoding='utf8') as infile:
				for line in infile:
					line = line.replace(search_string, replacement_value)
					lines.append(line)
			with open(os.path.join(filename), 'w', encoding='utf8') as outfile:
				for line in lines:
					outfile.write(line)

os.chdir(os.path.dirname( __file__ ))
os.chdir('..')
path=os.getcwd()
check_files_in_directory()
for directory in directories:
	os.chdir(directory)
	path=os.getcwd()
	check_files_in_directory()
	os.chdir('..')
