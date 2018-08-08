var levels=[
	{
		'name':'A-Level',
	    'subjectsJSON':'a-level-subjects.json',
	    'entriesJSON':'a-level-entries.json',
	    'gradesJSON':'a-level-grades.json',
	    'textJSON':'a-level-text.json',
	    'gradesAll':['A*','A','B','C','D','E','U'],
	    'gradesSelected':['A*','A','C','E']
	},
	{
		'name':'AS-Level',
	    'subjectsJSON':'as-level-subjects.json',
	    'entriesJSON':'as-level-entries.json',
	    'gradesJSON':'as-level-grades.json',
	    'textJSON':'as-level-text.json',
		'gradesAll':['A','B','C','D','E','U'],
	    'gradesSelected':['A','C','E']
	},
	{
		'name':'GCSE',
	    'subjectsJSON':'gcse-subjects.json',
	    'entriesJSON':'gcse-entries.json',
	    'gradesJSON':'gcse-grades.json',
	    'textJSON':'gcse-text.json',
		'gradesAll':['A/7','C/4','G/1','U'],
	    'gradesSelected':['A/7','C/4','G/1']
	}
]

var name
var level
var i
var j
var l = levels.length

$(function () {		// needs to be done in two stages like this, as otherwise inner for loop always runs off final i value under js asynchonicity
  level = window.location.href.split('/')[3].split('.')[0]
	for (i = 0; i < l; i++) {
		if (level==levels[i].name.toLowerCase()){
			name=levels[i].name.toLowerCase()
			document.getElementById('levelNameContainer').innerHTML=levels[i].name
			subjectsJSON=levels[i].subjectsJSON
			$.getJSON('data/output/' + name + '/' + subjectsJSON, jsonCallback(i));
		}
  }
});

function jsonCallback(item) {
  return function(data) {
		function order(a,b) {
		  if (a.sort_order < b.sort_order){
				return -2;
			}
		  else if (a.sort_order > b.sort_order){
				return 2;
			}
		  else {
				if (a.subject_name_clean.toLowerCase() < b.subject_name_clean.toLowerCase()){
					return -1;
				}
			  else if (a.subject_name_clean.toLowerCase() > b.subject_name_clean.toLowerCase()){
					return 1;
				}
				else {
					return 0;
				}
		  }
		}

		data.sort(order);

		let len=data.length
		for (j = 0; j < len; j++) {
		  var line=data.shift()
		  document.getElementById('subjectListContainer').innerHTML=document.getElementById('subjectListContainer').innerHTML + '<li><a href="' + name + '/' + line.subject_name_clean.replace(/\W+/g, '-').toLowerCase() + '.php">' + line.subject_name_clean + '</a></li>'
		}
  };
}
