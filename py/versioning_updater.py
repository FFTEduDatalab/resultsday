# -*- coding: utf-8 -*-
#!/usr/bin/python

import os

search_string='?v=20180822'
target='?v=20180823'

directories=['inc','js','templates','a-level','as-level','gcse']

os.chdir(os.path.dirname( __file__ ))
os.chdir('..')
path=os.getcwd()
for filename in os.listdir(path):
    if filename.endswith(('.php','.js')):
		print filename
		lines = []
		with open(os.path.join(filename)) as infile:
		    for line in infile:
				line = line.replace(search_string, target)
				lines.append(line)
		with open(os.path.join(filename), 'w') as outfile:
		    for line in lines:
		        outfile.write(line)

os.chdir(os.path.dirname( __file__ ))
os.chdir('..')
for directory in directories:
	os.chdir(directory)
	path=os.getcwd()
	for filename in os.listdir(path):
	    if filename.endswith(('.php','.js')):
			print filename
			lines = []
			with open(os.path.join(filename)) as infile:
			    for line in infile:
					line = line.replace(search_string, target)
					lines.append(line)
			with open(os.path.join(filename), 'w') as outfile:
			    for line in lines:
			        outfile.write(line)
	os.chdir('..')
