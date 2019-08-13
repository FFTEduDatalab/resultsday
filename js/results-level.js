var levels = [
	{
		'name': 'A-Level',
		'subjectsJSON': 'a-level-subjects.json?v=20190812',
		'entriesJSON': 'a-level-entries.json?v=20190812',
		'gradesJSON': 'a-level-grades.json?v=20190812',
		'textJSON': 'a-level-text.json?v=20190812',
		'gradesAll': ['A*', 'A', 'B', 'C', 'D', 'E', 'U'],
		'gradesSelected': ['A*', 'A', 'C', 'E']
	},
	{
		'name': 'AS-Level',
		'subjectsJSON': 'as-level-subjects.json?v=20190812',
		'entriesJSON': 'as-level-entries.json?v=20190812',
		'gradesJSON': 'as-level-grades.json?v=20190812',
		'textJSON': 'as-level-text.json?v=20190812',
		'gradesAll': ['A', 'B', 'C', 'D', 'E', 'U'],
		'gradesSelected': ['A', 'C', 'E']
	},
	{
		'name': 'GCSE',
		'subjectsJSON': 'gcse-subjects.json?v=20190812',
		'entriesJSON': 'gcse-entries.json?v=20190812',
		'gradesJSON': 'gcse-grades.json?v=20190812',
		'textJSON': 'gcse-text.json?v=20190812',
		'gradesAll': ['A/7', 'C/4', 'G/1', 'U'],
		'gradesSelected': ['A/7', 'C/4', 'G/1']
	}
];

var name,
	level,
	subjectClass,
	i,
	l = levels.length;

$(function () {		// needs to be done in two stages like this, as otherwise inner for loop always runs off final i value under js asynchonicity
	level = window.location.href.split('/')[3].split('.')[0];
	for (i = 0; i < l; i++) {
		if (level == levels[i].name.toLowerCase()) {
			name = levels[i].name.toLowerCase();
			document.getElementById('levelNameContainer').innerHTML = levels[i].name;
			subjectsJSON = levels[i].subjectsJSON;
			$.getJSON('data/output/' + name + '/' + subjectsJSON, jsonCallback());
		}
	}
	$('#report-banner').hide();
});

function jsonCallback () {
	return function (data) {
		function order (a, b) {
			if (a.sort_order < b.sort_order) {
				return -2;
			}
			else if (a.sort_order > b.sort_order) {
				return 2;
			} else {
				if (a.subject_name_clean.toLowerCase() < b.subject_name_clean.toLowerCase()) {
					return -1;
				}
				else if (a.subject_name_clean.toLowerCase() > b.subject_name_clean.toLowerCase()) {
					return 1;
				} else {
					return 0;
				}
			}
		}

		data.sort(order);

		data.forEach(function (value) {
			if (value.sort_order != -1) {
				subjectClass = "class='underline'";
			} else {
				subjectClass = '';
			}
			var snippet = '<div class="col l4 m6 s12"><div class="card white"><div class="card-content"><h5><a ' + subjectClass + ' href="' + name + '/' + value.subject_name_clean.replace(/\W+/g, '-').toLowerCase() + '.php?v=20190812">' + value.subject_name_clean + '</a></h5></div></div></div>';// done as a single line as IE can't handle template literals

			document.getElementById('subject-cards').innerHTML = document.getElementById('subject-cards').innerHTML + snippet;
		});

	};
}
