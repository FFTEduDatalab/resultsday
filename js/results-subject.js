var urlLevel,
	urlSubject,
	level,
	alias,
	subject_name_clean,
	subject_name_clean_lc = '',
	flags,
	reformYear,
	definition,
	context,
	relatedSubjects,
	relatedArray = [],
	analysis,
	entriesData,
	gradesData,
	entriesChart = {},
	gradesChart = {},
	entriesChartSubtitle,
	gradesChartSubtitle,
	entriesChartColoursArray = ['#2daae1', '#96c11f', '#535353'],
	gradesChartColoursArray = [],
	subjectsJSON,
	entriesJSON,
	gradesJSON,
	textJSON,
	gradesAll,
	gradesSelected,
	addthis_share,
	addthis_config = addthis_config || {},
	yearMin = 2016,
	breakdown = 'country',
	scope = 'UK',
	grades = 'Selected',
	gender = 'All students',
	coloursDict = {
		'All students': '#535353',
		'Male': '#2daae1',
		'Female': '#96c11f'
	},
	scopeDict = {
		'UK': 'UK-wide',
		'EN': 'England',
		'WA': 'Wales',
		'NI': 'Northern Ireland',
		'15': '15-year-olds and below, UK-wide',
		'16': '16-year-olds, UK-wide',
		'17': '17-year-olds and above, UK-wide',
		'EN15': '15-year-olds and below, England',
		'EN16': '16-year-olds, England',
		'EN17': '17-year-olds and above, England',
		'WA15': '15-year-olds and below, Wales',
		'WA16': '16-year-olds, Wales',
		'WA17': '17-year-olds and above, Wales',
		'NI15': '15-year-olds and below, Northern Ireland',
		'NI16': '16-year-olds, Northern Ireland',
		'NI17': '17-year-olds and above, Northern Ireland'
	},
	gradesDict = {
		'Selected': 'selected grades',
		'All': 'all grades'
	},
	genderDict = {
		'All students': 'All ',
		'Male': 'Male ',
		'Female': 'Female ',
	},
	levels = [
		{
			'name': 'A-Level',
			'subjectsJSON': 'a-level-subjects.json?v=20200811',
			'entriesJSON': 'a-level-entries.json?v=20200811',
			'gradesJSON': 'a-level-grades.json?v=20200811',
			'textJSON': 'a-level-text.json?v=20200811',
			'gradesAll': ['A*', 'A or above', 'B or above', 'C or above', 'D or above', 'E or above', 'U or above'],
			'gradesSelected': ['A*', 'A or above', 'C or above', 'E or above']
		},
		{
			'name': 'AS-Level',
			'subjectsJSON': 'as-level-subjects.json?v=20200811',
			'entriesJSON': 'as-level-entries.json?v=20200811',
			'gradesJSON': 'as-level-grades.json?v=20200811',
			'textJSON': 'as-level-text.json?v=20200811',
			'gradesAll': ['A', 'B or above', 'C or above', 'D or above', 'E or above', 'U or above'],
			'gradesSelected': ['A', 'C or above', 'E or above']
		},
		{
			'name': 'GCSE',
			'subjectsJSON': 'gcse-subjects.json?v=20200811',
			'entriesJSON': 'gcse-entries.json?v=20200811',
			'gradesJSON': 'gcse-grades.json?v=20200811',
			'textJSON': 'gcse-text.json?v=20200811',
			'gradesAll': ['7/A or above', '4/C or above', '1/G or above', 'U or above'],
			'gradesSelected': ['7/A or above', '4/C or above', '1/G or above']
		}
	];

var entriesChartOptions = {
	title: {
		text: null
	},
	subtitle: {
		text: null
	},
	colors: null,
	xAxis: {		// set here rather than in theme, so can be set dynamically
		min: yearMin,
		max: yearMin + 4,
		tickInterval: 1
	},
	yAxis: {
		max: null
	},
	series: null,
	exporting: {
		filename: null
	}
}

var entriesSmallMultipleOptions = {		// easier to create a new object, with no existing characteristics
	chart: {
		events: null,
		height: 200,
		style: {
			fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
		},
		type: 'area',
	},
	credits: {
		enabled: false
	},
	exporting: {
		enabled: false
	},
	lang: {
		thousandsSep: ',',
		numericSymbols: null,
	},
	plotOptions: {
		series: {
			animation: false,
			label: {
				enabled: false
			},
			marker: {
				enabled: false
			},
			states: {
				hover: {
					enabled: false
				}
			},
		},
	},
	series: null,
	subtitle: {
		text: null
	},
	title: {
		style: {
			fontSize: 16
		}
	},
	tooltip: {
		enabled: false
	},
	xAxis: {		// set here rather than in theme, so can be set dynamically
		max: yearMin + 4,
		min: yearMin,
		tickInterval: 1
	},
	yAxis: {
		tickInterval: 100000
	},
}

var gradesChartOptions = {
	title: {
		text: null
	},
	subtitle: {
		text: null
	},
	colors: null,
	xAxis: {		// set here rather than in theme, so can be set dynamically
		min: yearMin,
		max: yearMin + 4,
		tickInterval: 1
	},
	yAxis: {
		max: 100
	},
	tooltip: {
		valueDecimals: 1,
        formatter: function () {
			return '<span style="font-size: 10px">' + this.x + '</span><br><span style="color:' + this.series.color + '">●</span> ' + this.series.name + ': <b>' + this.y + '%</b><br/>'		// adding percentage sign to default tooltip
        },
	},
	series: null,
	exporting: {
		filename: null
	}
}

$(function () {
	Highcharts.setOptions(Highcharts.theme);
	addthis_config.data_track_addressbar = false;		// remove addthis address bar and click tracking code
	addthis_config.data_track_clickback = false;		// "		"
	urlLevel = window.location.href.split('/')[3];
	urlSubject = window.location.href.split('/')[4].split('.')[0];
	if (urlSubject == 'bespoke' && ! window.location.href.split('options=')[1]) {
		bespokeAliases = window.location.href.split('sbj=')[1].split(',');
		bespokeAliases = bespokeAliases.map(function (x) { return x.toUpperCase(); });
	}
	else if (urlSubject == 'bespoke' && window.location.href.split('options=')[1]) {
		bespokeAliases = window.location.href.split('sbj=')[1].split(/\||%7C/)[0].split(',');		// | or its URL-encoded form
		bespokeAliases = bespokeAliases.map(function (x) { return x.toUpperCase(); });
		bespokeOptions = window.location.href.split('options=')[1].split(',');
		bespokeOptions = bespokeOptions.map(function (x) { return x.toUpperCase(); });
	}
	else if (urlSubject == 'small_multiple' && ! window.location.href.split('options=')[1]) {
		bespokeAliases = window.location.href.split('sbj=')[1].split(',');
		bespokeAliases = bespokeAliases.map(function (x) { return x.toUpperCase(); });		// options are optional
	}
	else if (urlSubject == 'small_multiple' && window.location.href.split('options=')[1]) {
		bespokeAliases = window.location.href.split('sbj=')[1].split(/\||%7C/)[0].split(',');
		bespokeAliases = bespokeAliases.map(function (x) { return x.toUpperCase(); });
		bespokeOptions = window.location.href.split('options=')[1].split(',');
		bespokeOptions = bespokeOptions.map(function (x) { return x.toUpperCase(); });
	}
	let levelData = levels.filter(function (levels) {
		return levels.name.toLowerCase() == urlLevel;
	})[0];
	level = levelData.name;
	if (urlSubject != 'bespoke' && urlSubject != 'small_multiple') {
		document.getElementById('levelNameContainer').innerHTML = level;
	}
	var d = new Date();
	if (level == 'A-Level' || level == 'AS-Level') {
		$('#bSelector').hide();
		$('#gcseFlagContainer').hide();
	}
	if (level == 'GCSE') {
		$('#gSelector').hide();
	}
	gradesChartColoursArray.push(coloursDict['All students']);
	subjectsJSON = levelData.subjectsJSON;
	entriesJSON = levelData.entriesJSON;
	gradesJSON = levelData.gradesJSON;
	textJSON = levelData.textJSON;
	gradesAll = levelData.gradesAll;
	gradesSelected = levelData.gradesSelected;
	queries = [];
	if (urlSubject == 'bespoke' && ! window.location.href.split('options=')[1]) {
		entriesChartColoursArray = ['#e6007e', '#2daae1', '#96c11f', '#535353', '#ea51a5', '#6fc2e7', '#b5d266', '#959595'];
		$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function (data) {
			let len = data.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					var line = data.shift();
					bespokeAliases.forEach(function (bespokeAlias) {		// no filter applied to scope, as in these cases we'll keep the dropdown selectors operable
						if (line.alias == bespokeAlias) {
							var q = {};
							q.alias = bespokeAlias;
							q.subject_name_clean = line.subject_name_clean;
							q.subject_name_clean_lc = line.subject_name_clean_lc;
							queries.push(q);
							if (subject_name_clean_lc == '') {
								subject_name_clean_lc = line.subject_name_clean_lc;		// used in the chart title
							}
							else {
								subject_name_clean_lc = subject_name_clean_lc + ', ' + line.subject_name_clean_lc;		// adding to this with each subject
							}
						}
					});
				}
			}
			subject_name_clean_lc = subject_name_clean_lc.replace(/, (?=[^,]*$)/, ' and ');		// final occurence. Only needed here as we have multiple subjects
			if (subject_name_clean_lc.length > 35) {
				var t = 0;
				subject_name_clean_lc = subject_name_clean_lc.replace(/,/g, function (match) {
					t++;
					return (t === 2) ? ',<br>' : match;
				});
			}
			readEntriesData();
		});
	}
	else if (urlSubject == 'bespoke' && window.location.href.split('options=')[1]) {
		entriesChartColoursArray = ['#e6007e', '#2daae1', '#96c11f', '#535353', '#ea51a5', '#6fc2e7', '#b5d266', '#959595'];
		$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function (data) {
			let len = data.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					var line = data.shift();
					bespokeAlias = bespokeAliases[0];		// needs to only be one of these where we're setting options
					bespokeOptions.forEach(function (bespokeOption) {
						if (line.alias == bespokeAlias) {
							var q = {};
							q.alias = bespokeAlias;
							q.scope = bespokeOption;
							q.subject_name_clean = line.subject_name_clean;
							q.subject_name_clean_lc = line.subject_name_clean_lc;
							queries.push(q);
							subject_name_clean_lc = line.subject_name_clean_lc;		// as there'll only by one subject. Used in the chart title
						}
					});
				}
			}
			readEntriesData();
		});
	}
	else if (urlSubject == 'small_multiple' && ! window.location.href.split('options=')[1]) {
		entriesChartColoursArray = ['#e6007e'];
		$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function (data) {
			let len = data.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					var line = data.shift();
					bespokeAliases.forEach(function (bespokeAlias) {
						if (line.alias == bespokeAlias) {
							var q = {};
							q.alias = bespokeAlias;
							q.subject_name_clean = line.subject_name_clean;
							q.subject_name_clean_lc = line.subject_name_clean_lc;
							queries.push(q);
						}
					});
				}
			}
			readEntriesData();
		});
	}
	else if (urlSubject == 'small_multiple' && window.location.href.split('options=')[1]) {
		entriesChartColoursArray = ['#e6007e'];
		$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function (data) {
			let len = data.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					var line = data.shift();
					bespokeAliases.forEach(function (bespokeAlias) {
						bespokeOptions.forEach(function (bespokeOption) {
							if (line.alias == bespokeAlias) {
								var q = {};
								q.alias = bespokeAlias;
								q.scope = bespokeOption;
								q.subject_name_clean = line.subject_name_clean;
								q.subject_name_clean_lc = line.subject_name_clean_lc;
								queries.push(q);
								subject_name_clean_lc = line.subject_name_clean_lc;		// as there'll only by one subject. Used in the chart title
							}
						});
					})
				}
			}
			readEntriesData();
		});
	}
	else {
		$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function (data) {
			let len = data.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					var line = data.shift();
					if (line.subject_name_clean.replace(/\W+/g, '-').toLowerCase() == urlSubject) {
						subject_name_clean = line.subject_name_clean;
						subject_name_clean_lc = line.subject_name_clean_lc;
						document.getElementById('subjectNameContainer').innerHTML = subject_name_clean;
						alias = line.alias;
						if (alias == 'ALLS') {
							$('#gcseFlagContainer').hide();
						}
						definition = line.definition;
						if (definition == null) {
							$('#definitionContainer').hide();
						}
						context = line.context;
						if (context == null) {
							$('#contextBox').hide();
						}
						relatedSubjects = line.related_subjects;
						if (relatedSubjects == null) {
							$('#related-subjects-section').hide();
						} else {
							relatedSubjects.forEach(function (relatedAlias, index, array) {		// pass the array index and the array itself as well as the array value - relatedAlias - to allow us to check if something is the final element of the array
								$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function (dataRelated) {
									for (let j = 0; j < len; j++) {		// len here will be the same as above
										var lineRelated = dataRelated.shift();
										if (lineRelated.alias == relatedAlias) {
											relatedArray.push(lineRelated.subject_name_clean_lc);
											relatedArray.sort();
										}
									}
									if (relatedArray.length == array.length) {
										relatedArray.forEach(function (subject_name_clean, innerIndex, innerArray) {
											if (innerIndex != innerArray.length - 1) {		// final element
												$('#related-subjects-section h5')[0].innerHTML = $('#related-subjects-section h5')[0].innerHTML + ' <a href="/' + level.toLowerCase() + '/' + subject_name_clean.replace(/\W+/g, '-').toLowerCase() + '.php?v=20200811">' + subject_name_clean + '</a>,';
											} else {
												$('#related-subjects-section h5')[0].innerHTML = $('#related-subjects-section h5')[0].innerHTML + ' <a href="/' + level.toLowerCase() + '/' + subject_name_clean.replace(/\W+/g, '-').toLowerCase() + '.php?v=20200811">' + subject_name_clean + '</a>';
											}
										});
									}
								});
							});
						}
						flags = line.flags;
						if (level == 'GCSE') {
							if (flags.ebacc == true) {
								document.getElementById('ebaccFlagImg').src = '/img/ebaccFlagImgPink.png';
								document.getElementById('ebaccFlagImg').setAttribute('data-tooltip', 'This subject counts in the English Baccalaureate (England only)');
							} else {
								document.getElementById('ebaccFlagImg').src = '/img/ebaccFlagImgGrey.png';
								document.getElementById('ebaccFlagImg').setAttribute('data-tooltip', 'This subject does not count in the English Baccalaureate (England only)');
							}
							if (flags.p8dbl == true) {
								document.getElementById('p8dblFlagImg').src = '/img/p8dblFlagImgPink.png';
								if (alias == 'ENLA' || alias == 'ENLI') {
									document.getElementById('p8dblFlagImg').setAttribute('data-tooltip', 'This subject can be double-weighted in Progress 8 calculations - see the explanatory guide for full details (England only)');
								}
								else if (alias == 'MATH') {
									document.getElementById('p8dblFlagImg').setAttribute('data-tooltip', 'This subject is double-weighted in Progress 8 calculations (England only)');
								}
							} else {
								document.getElementById('p8dblFlagImg').src = '/img/p8dblFlagImgGrey.png';
								document.getElementById('p8dblFlagImg').setAttribute('data-tooltip', 'This subject is not double-weighted in Progress 8 calculations (England only)');
							}
						}
						reformYear = line.reform_year;
						document.getElementById('definitionContainer').innerHTML = document.getElementById('definitionContainer').innerHTML + definition;
						document.getElementById('contextContainer').innerHTML = document.getElementById('contextContainer').innerHTML + context;
						document.getElementById('reformYearContainer').innerHTML = '<ul><li><em>Reform date</em></li><li>England: ' + reformYear.EN + '</li><li>Wales: ' + reformYear.WA + '</li><li>Northern Ireland: ' + reformYear.NI + '</li></ul>';
					}
				}
				addthis_share = {
					title: level + ' results day 2020: Entry and attainment trends in ' + subject_name_clean_lc,
					description: 'GCSE and A-Level results analysis - FFT Education Datalab',
					passthrough: {
						twitter: {
							via: 'ffteducationdatalab',
						}
					}
				};
			}
		});
		$('.tooltipped').tooltip();
		$.getJSON('/data/output/' + level.toLowerCase() + '/' + textJSON, function (data) {
			let len = data.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					var line = data.shift();
					if (line.alias == alias) {
						analysis = line.analysis;
						document.getElementById('analysisContainer').innerHTML = document.getElementById('analysisContainer').innerHTML + analysis;
					}
				}
			}
		});
		readEntriesData();
		readGradesData();
	}
});

function goBack () {
	urlLevel = window.location.href.split('/')[3].split('.')[0];
	if (urlLevel == 'a-level') {
		window.location.href = '/a-level.php?v=20200811';
	}
	else if (urlLevel == 'as-level') {
		window.location.href = '/as-level.php?v=20200811';
	}
	else if (urlLevel == 'gcse') {
		window.location.href = '/gcse.php?v=20200811';
	}
}

function readEntriesData () {
	$.getJSON('/data/output/' + level.toLowerCase() + '/' + entriesJSON, function (data) {
		entriesData = [];
		let len = data.length;
		let dataMax = 0;		// used to force entries chart y-axis maximum to be a set value in cases where there have been no entries in a certain country/age bracket, to avoid a floating x-axis
		if (len > 0) {
			for (let i = 0; i < len; i++) {
				var line = data.shift();
				if (urlSubject == 'bespoke' && ! window.location.href.split('options=')[1]) {
					queries.forEach(function (query) {
						if (line.alias == query.alias && line.scope == scope && line.name == 'All students') {
							line.name = query.subject_name_clean;		// needs to be called this so that it's used for data series labelling
							entriesData.push(line);
							let dataLen = line.data.length;
							for (let j = 0; j < dataLen; j++) {
								if (line.data[j][1] > dataMax) {
									dataMax = line.data[j][1];
								}
							}
						}
					});
				}
				else if (urlSubject == 'bespoke' && window.location.href.split('options=')[1]) {
					scope = '';		// used purely in the chart image download title where bespoke options have been supplied
					queries.forEach(function (query) {
						if (line.alias == query.alias && line.scope == query.scope && line.name == 'All students') {
							line.name = scopeDict[query.scope];		// needs to be called this so that it's used for data series labelling
							entriesData.push(line);
							let dataLen = line.data.length;
							for (let j = 0; j < dataLen; j++) {
								if (line.data[j][1] > dataMax) {
									dataMax = line.data[j][1];
								}
							}
						}
						if (scope == '') {		// build 'scope' which is used purely in the chart image download title where bespoke options have been supplied
							scope = query.scope
						}
						else {
							scope = scope + ',' + query.scope
						}
					});
				}
				else if (urlSubject == 'small_multiple' && ! window.location.href.split('options=')[1]) {
					queries.forEach(function (query) {
						if (line.alias == query.alias && line.scope == scope && line.name == 'All students') {
							line.name = query.subject_name_clean;		// needs to be called this so that it's used for small multiple titling
							entriesData.push(line);
							let dataLen = line.data.length;
							for (let j = 0; j < dataLen; j++) {
								if (line.data[j][1] > dataMax) {
									dataMax = line.data[j][1];
								}
							}
						}
					});
					function compare(a, b) {		// sort array of objects
						if (a.name < b.name){
							return -1;
						}
						if (a.name > b.name){
							return 1;
						}
						return 0;
					}
					entriesData.sort(compare);		// we need to sort subjects, as they aren't fully sorted in the entries data
				}
				else if (urlSubject == 'small_multiple' && window.location.href.split('options=')[1]) {
					queries.forEach(function (query) {
						if (line.alias == query.alias && line.scope == query.scope && line.name == 'All students') {
							line.name = query.subject_name_clean;		// needs to be called this so that it's used for small multiple titling
							entriesData.push(line);
							let dataLen = line.data.length;
							for (let j = 0; j < dataLen; j++) {
								if (line.data[j][1] > dataMax) {
									dataMax = line.data[j][1];
								}
							}
						}
						scope = query.scope
					});
					function compare(a, b) {		// sort array of objects
						if (a.name < b.name){
							return -1;
						}
						if (a.name > b.name){
							return 1;
						}
						return 0;
					}
					entriesData.sort(compare);		// we need to sort subjects, as they aren't fully sorted in the entries data
				}
				else {
					if (line.alias == alias && line.scope == scope) {
						entriesData.push(line);
						if (line.name == 'All students') {
							let dataLen = line.data.length;
							for (let j = 0; j < dataLen; j++) {
								if (line.data[j][1] > dataMax) {
									dataMax = line.data[j][1];
								}
							}
						}
					}
				}
			}
			if (urlSubject != 'small_multiple') {
				entriesChartOptions.colors = entriesChartColoursArray
				entriesChartOptions.exporting.filename = (level + '-' + subject_name_clean_lc.replace(/br/, '') + '-' + scope + '-entries').replace(/\W+/g, '-').toLowerCase()
				entriesChartOptions.series = entriesData
				entriesChartOptions.title.text = level + ' entries in ' + subject_name_clean_lc + ', ' + yearMin + '-' + Number(yearMin + 4)
				if (dataMax < 10) {
					entriesChartOptions.yAxis.max = 10;
				}
				else {
					entriesChartOptions.yAxis.max = null;		// needed to reset axis range after moving from a position where it has been set to 10
				}
				if (urlSubject == 'bespoke' && window.location.href.split('options=')[1]) {		// bespoke with options. When multi-subject bespoke charts are made then we want the subtitle to update if the country selector is used
					entriesChartSubtitle = ''		// only 'Number of entries' - as the series labels best explain the scope in this mode
				}
				else if (isNaN(Number(scope.slice(scope.length - 1))) == 0) {		// age breakdown, age x country breakdown
					entriesChartSubtitle = scopeDict[scope];
				}
				else if (isNaN(Number(scope.slice(scope.length - 1))) == 1) {		// country breakdown
					entriesChartSubtitle = 'All students, ' + scopeDict[scope];
				}
				entriesChartOptions.subtitle.text = entriesChartSubtitle + '<br><em>Number of entries</em>'
				entriesChartOptions.exporting.filename = (level + '-' + subject_name_clean_lc.replace(/br/, '') + '-' + scope + '-entries').replace(/\W+/g, '-').toLowerCase()
				if (Object.keys(entriesChart).length === 0) {
					entriesChart = new Highcharts.chart('entriesChartContainer', entriesChartOptions)
				}
				else {
					entriesChart.update(entriesChartOptions)
				}
			}
			else if (urlSubject == 'small_multiple') {
				entriesSmallMultipleOptions.colors = entriesChartColoursArray
				document.getElementById('chartTitle').innerHTML = level + ' entries in selected EBacc subjects, ' + yearMin + '-2020'
				if (isNaN(Number(scope.slice(scope.length - 1))) == 0) {		// age breakdown, age x country breakdown
					document.getElementById('chartSubtitle').innerHTML = scopeDict[scope];
				}
				else if (isNaN(Number(scope.slice(scope.length - 1))) == 1) {		// country breakdown
					document.getElementById('chartSubtitle').innerHTML = 'All students, ' + scopeDict[scope];
				}
				entriesSmallMultipleOptions.yAxis.max = dataMax
				entriesData.forEach((item, i) => {
					entriesSmallMultipleOptions.series = [item]
					if (i % 4 === 0) {		// left-most column of 4x3 grid
						entriesSmallMultipleOptions.yAxis.labels = {enabled: true}
						entriesSmallMultipleOptions.chart.marginLeft = 80
						entriesSmallMultipleOptions.chart.width = 370
					}
					else {
						entriesSmallMultipleOptions.yAxis.labels = {enabled: false}
						entriesSmallMultipleOptions.chart.marginLeft = null		// seems to be set to 100 without this line
						entriesSmallMultipleOptions.chart.width = 300
					}
					if (i >= 8) {		// bottom row of 4x3 grid
						entriesSmallMultipleOptions.xAxis.labels = {enabled: true}
					}
					else {
						entriesSmallMultipleOptions.xAxis.labels = {enabled: false}
					}
					entriesSmallMultipleOptions.title.text = item.name
					new Highcharts.chart('smallMultipleChartContainer'+ i, entriesSmallMultipleOptions)
				});

			}
		}
	});
}

function readGradesData () {
	$.getJSON('/data/output/' + level.toLowerCase() + '/' + gradesJSON, function (data) {
		gradesData = [];
		let grades_array = [];
		if (grades == 'Selected') {
			grades_array = gradesSelected;
		}
		else if (grades == 'All') {
			grades_array = gradesAll;
		}
		let len = data.length;
		if (len > 0) {
			for (let i = 0; i < len; i++) {
				var line = data.shift();
				if (line.alias == alias && line.scope == scope && grades_array.indexOf(line.name) != -1 && line.gender == gender) {
					gradesData.push(line);
				}
			}
			if (isNaN(Number(scope.slice(scope.length - 1))) == 0) {		// age breakdown, age x country breakdown
				if (gender == 'All students') {
					gradesChartSubtitle = scopeDict[scope] + ', ' + gradesDict[grades];
				}
				else {
					gradesChartSubtitle = genderDict[gender] + scopeDict[scope] + ', ' + gradesDict[grades];
				}
			}
			else if (isNaN(Number(scope.slice(scope.length - 1))) == 1) {		// country breakdown
				gradesChartSubtitle = genderDict[gender] + ' students, ' + scopeDict[scope] + ', ' + gradesDict[grades];
			}
			gradesChartOptions.series = gradesData
			gradesChartOptions.title.text = level + ' grades in ' + subject_name_clean_lc + ', ' + yearMin + '-' + Number(yearMin + 4)
			gradesChartOptions.subtitle.text = gradesChartSubtitle + '<br><em>Cumulative percentage attaining grade</em>'
			gradesChartOptions.colors = gradesChartColoursArray
			gradesChartOptions.exporting.filename = (level + '-' + subject_name_clean_lc.replace(/br/, '') + '-' + scope + '-' + gender + '-' + grades + '-grades').replace(/\W+/g, '-').toLowerCase()
			if (Object.keys(gradesChart).length === 0) {
				gradesChart = new Highcharts.chart('gradesChartContainer', gradesChartOptions)
			}
			else {
				gradesChart.update(gradesChartOptions, null, true)		// oneToOne set to true, so that series are added/removed as necessary
			}
		}
	});
}

$('#breakdownSelector').change(function () {
	breakdown = $(this).val();
	if (breakdown == 'country') {
		$('#scopeSelector').html('<option value="UK" selected>UK</option><option value="EN">England</option><option value="WA">Wales</option><option value="NI">Northern Ireland</option>');
	}
	else if (breakdown == 'age') {
		$('#scopeSelector').html('<option value="UK" selected>All ages</option><option value="15">15-year-olds and below</option><option value="16">16-year-olds</option><option value="17">17 and above</option>');
	}
	else if (breakdown == 'agecountry') {
		$('#scopeSelector').html('<option value="EN15">Aged 15 and below, England</option><option value="EN16" selected>Aged 16, England</option><option value="EN17">Aged 17 and above, England</option><option value="WA15">Aged 15 and below, Wales</option><option value="WA16">Aged 16, Wales</option><option value="WA17">Aged 17 and above, Wales</option><option value="NI15">Aged 15 and below, Northern Ireland</option><option value="NI16">Aged 16, Northern Ireland</option><option value="NI17">Aged 17 and above, Northern Ireland</option>');
	}
	$('#scopeSelector').formSelect();		// re-initialise Materialize select input
	if (breakdown != 'agecountry' && scope != 'UK') {
		scope = 'UK';
		readEntriesData();
		if (urlSubject != 'bespoke') {
			readGradesData();
		}
	}
	else if (breakdown == 'agecountry') {
		scope = 'EN16';
		readEntriesData();
		if (urlSubject != 'bespoke') {
			readGradesData();
		}
	}
});

function scopeOptionChange () {
	scope = document.getElementById('scopeSelector').value;
	readEntriesData();
	if (urlSubject != 'bespoke') {
		readGradesData();
	}
}

function gradeChartOptionChange () {
	grades = document.getElementById('gradesSelector').value;
	gender = document.getElementById('genderSelector').value;
	gradesChartColoursArray = [];
	gradesChartColoursArray.push(coloursDict[gender]);
	if (urlSubject != 'bespoke') {
		readGradesData();
	}
}
