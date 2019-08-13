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
	entriesChartSubtitle,
	gradesChartSubtitle,
	gradesChartColoursArray,
	subjectsJSON,
	entriesJSON,
	gradesJSON,
	textJSON,
	gradesAll,
	gradesSelected,
	yMax,
	addthis_share,
	addthis_config = addthis_config||{},
	yearMin = 2015,
	breakdown = 'country',
	scope = 'UK',
	grades = 'Selected',
	gender = 'All students',
	coloursDict = {
	    'All students':'#535353',
	    'Male':'#2daae1',
	    'Female':'#96c11f'
	},
	levels = [
		{
			'name':'A-Level',
		    'subjectsJSON':'a-level-subjects.json?v=20190812',
		    'entriesJSON':'a-level-entries.json?v=20190812',
		    'gradesJSON':'a-level-grades.json?v=20190812',
		    'textJSON':'a-level-text.json?v=20190812',
		    'gradesAll':['A*','A or above','B or above','C or above','D or above','E or above','U or above'],
		    'gradesSelected':['A*','A or above','C or above','E or above']
		},
		{
			'name':'AS-Level',
		    'subjectsJSON':'as-level-subjects.json?v=20190812',
		    'entriesJSON':'as-level-entries.json?v=20190812',
		    'gradesJSON':'as-level-grades.json?v=20190812',
		    'textJSON':'as-level-text.json?v=20190812',
			'gradesAll':['A','B or above','C or above','D or above','E or above','U or above'],
		    'gradesSelected':['A','C or above','E or above']
		},
		{
			'name':'GCSE',
		    'subjectsJSON':'gcse-subjects.json?v=20190812',
		    'entriesJSON':'gcse-entries.json?v=20190812',
		    'gradesJSON':'gcse-grades.json?v=20190812',
		    'textJSON':'gcse-text.json?v=20190812',
			'gradesAll':['A/7 or above','C/4 or above','G/1 or above','U or above'],
		    'gradesSelected':['A/7 or above','C/4 or above','G/1 or above']
		}
	];

$(function () {
	Highcharts.setOptions(Highcharts.theme)
	addthis_config.data_track_addressbar = false;		// remove addthis address bar and click tracking code
	addthis_config.data_track_clickback = false;		// "		"
	urlLevel=window.location.href.split('/')[3]
	urlSubject=window.location.href.split('/')[4].split('.')[0]
	if (urlSubject == 'bespoke' && window.location.href.split('sbj=')[1]) {
		bespokeAliases = window.location.href.split('sbj=')[1].split(',')
		bespokeAliases = bespokeAliases.map(function(x){ return x.toUpperCase() })
	}
	let levelData=levels.filter(function(levels) {
		return levels.name.toLowerCase() == urlLevel
	})[0];
	level=levelData.name
	if (urlSubject != 'bespoke') {
		document.getElementById('levelNameContainer').innerHTML=level
	}
	var d = new Date();
	if (level == 'A-Level' || level == 'AS-Level') {
		$('#bSelector').hide()
		$('#gcseFlagContainer').hide()
	}
	if (level == 'GCSE') {
		$('#gSelector').hide()
		$('#alevelFlagContainer').hide()
	}
	gradesChartColoursArray=[]
	gradesChartColoursArray.push(coloursDict['All students'])
	subjectsJSON=levelData.subjectsJSON
	entriesJSON=levelData.entriesJSON
	gradesJSON=levelData.gradesJSON
	textJSON=levelData.textJSON
	gradesAll=levelData.gradesAll
	gradesSelected=levelData.gradesSelected
	queries = []
	if (urlSubject == 'bespoke' && window.location.href.split('sbj=')[1]) {
		$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function(data) {
			let len = data.length
			if (len > 0) {
		        for (let i = 0; i < len; i++) {
					var line = data.shift()
					bespokeAliases.forEach(function (bespokeAlias) {
						if (line.alias == bespokeAlias) {		// note contrast with operation in results-subject.js
							var q = {}
							q.alias = bespokeAlias
				            q.subject_name_clean = line.subject_name_clean
				            q.subject_name_clean_lc = line.subject_name_clean_lc
							queries.push(q)
							if (subject_name_clean_lc == '') {
								subject_name_clean_lc = line.subject_name_clean_lc		// used in the chart title
							}
							else {
								subject_name_clean_lc = subject_name_clean_lc + ', ' + line.subject_name_clean_lc
							}
						}
					})
				}
			}
			readEntriesData()
			setChartSubtitles()
		})
	}
	else if (urlSubject != 'bespoke') {
		$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function(data) {
			let len = data.length
			if (len > 0) {
		        for (let i = 0; i < len; i++) {
					var line = data.shift()
					if (line.subject_name_clean.replace(/\W+/g, '-').toLowerCase() == urlSubject) {
			            subject_name_clean = line.subject_name_clean
						subject_name_clean_lc = line.subject_name_clean_lc
						document.getElementById('subjectNameContainer').innerHTML = subject_name_clean
						alias = line.alias
						if (alias == 'ALLS') {
							$('#gcseFlagContainer').hide()
							$('#alevelFlagContainer').hide()
						}
						definition = line.definition
						if (definition == null) {
							$('#definitionContainer').hide()
						}
						context = line.context
						if (context == null) {
							$('#contextBox').hide()
						}
						relatedSubjects = line.related_subjects
						if (relatedSubjects == null) {
							$('#related-subjects-section').hide()
						}
						else {
							relatedSubjects.forEach(function(relatedAlias, index, array) {		// pass the array index and the array itself as well as the array value - relatedAlias - to allow us to check if something is the final element of the array
								$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function(dataRelated) {
									for (let j = 0; j < len; j++) {		// len here will be the same as above
										var lineRelated = dataRelated.shift()
										if (lineRelated.alias == relatedAlias) {
											relatedArray.push(lineRelated.subject_name_clean_lc)
											relatedArray.sort()
										}
									}
									if (relatedArray.length == array.length) {
										relatedArray.forEach(function(subject_name_clean, innerIndex, innerArray) {
											if (innerIndex != innerArray.length - 1) {		// final element
												$('#related-subjects-section h5')[0].innerHTML = $('#related-subjects-section h5')[0].innerHTML + ' <a href="/' + level.toLowerCase() + '/' + subject_name_clean.replace(/\W+/g, '-').toLowerCase() + '.php?v=20190812">' + subject_name_clean + '</a>,'
											}
											else {
												$('#related-subjects-section h5')[0].innerHTML = $('#related-subjects-section h5')[0].innerHTML + ' <a href="/' + level.toLowerCase() + '/' + subject_name_clean.replace(/\W+/g, '-').toLowerCase() + '.php?v=20190812">' + subject_name_clean + '</a>'
											}
										});
									};
								});
							});
						};
						flags = line.flags
						if (level == 'A-Level' || level == 'AS-Level'){
							if (flags.facil==true){
								document.getElementById('facilFlagImg').src = '/img/facilFlagImgPink.png';
								document.getElementById('facilFlagImg').setAttribute('data-tooltip', 'This is a facilitating subject')
							}
							else {
								document.getElementById('facilFlagImg').src = '/img/facilFlagImgGrey.png';
								document.getElementById('facilFlagImg').setAttribute('data-tooltip', 'This is not a facilitating subject')
							}
						}
						else if (level=='GCSE'){
							if (flags.ebacc==true){
								document.getElementById('ebaccFlagImg').src = '/img/ebaccFlagImgPink.png';
								document.getElementById('ebaccFlagImg').setAttribute('data-tooltip', 'This subject counts in the English Baccalaureate (England only)')
							}
							else {
								document.getElementById('ebaccFlagImg').src = '/img/ebaccFlagImgGrey.png';
								document.getElementById('ebaccFlagImg').setAttribute('data-tooltip', 'This subject does not count in the English Baccalaureate (England only)')
							}
							if (flags.p8dbl==true){
								document.getElementById('p8dblFlagImg').src = '/img/p8dblFlagImgPink.png';
								if (alias=='ENLA' || alias=='ENLI'){
									document.getElementById('p8dblFlagImg').setAttribute('data-tooltip', 'This subject can be double-weighted in Progress 8 calculations - see the explanatory guide for full details (England only)')
								}
								else if (alias=='MATH') {
									document.getElementById('p8dblFlagImg').setAttribute('data-tooltip', 'This subject is double-weighted in Progress 8 calculations (England only)')
								}
							}
							else {
								document.getElementById('p8dblFlagImg').src = '/img/p8dblFlagImgGrey.png';
								document.getElementById('p8dblFlagImg').setAttribute('data-tooltip', 'This subject is not double-weighted in Progress 8 calculations (England only)')
							}
						}
						reformYear=line.reform_year
						document.getElementById('definitionContainer').innerHTML=document.getElementById('definitionContainer').innerHTML+definition
						document.getElementById('contextContainer').innerHTML=document.getElementById('contextContainer').innerHTML+context
						document.getElementById('reformYearContainer').innerHTML='<ul><li><em>Reform date</em></li><li>England: ' + reformYear.EN +'</li><li>Wales: ' + reformYear.WA +'</li><li>Northern Ireland: ' + reformYear.NI +'</li></ul>'
					}
		        }
				addthis_share = {
					title: level + ' results day 2019: Entry and attainment trends in ' + subject_name_clean_lc,
					description: 'GCSE and A-Level results analysis - FFT Education Datalab',
					passthrough : {
						twitter: {
							via: 'ffteducationdatalab',
						}
					}
				}
	    	}
		});
		$('.tooltipped').tooltip();
		$.getJSON('/data/output/' + level.toLowerCase() + '/' + textJSON, function(data) {
			let len=data.length
			if(len>0){
				for(let i=0; i<len; i++){
					var line=data.shift()
					if (line.alias == alias){
						analysis=line.analysis
						document.getElementById('analysisContainer').innerHTML=document.getElementById('analysisContainer').innerHTML+analysis
					}
				}
			}
		});
		readEntriesData()
		readGradesData()
		setChartSubtitles()
	}
});

function goBack() {
	urlLevel=window.location.href.split('/')[3].split('.')[0]
	if (urlLevel=='a-level'){
		window.location.href='/a-level.php?v=20190812';
	}
	else if (urlLevel=='as-level') {
		window.location.href='/as-level.php?v=20190812';
	}
	else if (urlLevel=='gcse') {
		window.location.href='/gcse.php?v=20190812';
	}
}

function readEntriesData() {
    $.getJSON('/data/output/' + level.toLowerCase() + '/' + entriesJSON, function(data) {
		entriesData = []
		let len = data.length
		let dataMax		// used to force entries chart y-axis maximum to be a set value in cases where there have been no entries in a certain country/age bracket, to avoid a floating x-axis
		if (len > 0) {
			for (let i = 0; i < len; i++) {
				var line = data.shift()
				if (urlSubject == 'bespoke') {
					queries.forEach(function (query) {
						if (line.alias == query.alias && line.scope == scope) {
							if (line.name == 'All students') {
								line.name = query.subject_name_clean		// needs to be called this so that it's used for data series labelling
								entriesData.push(line)
								let dataLen = line.data.length
								dataMax = 0
								for (let j = 0; j < dataLen; j++) {
									if (line.data[j][1] > dataMax) {
										dataMax = line.data[j][1]
									}
								}
							}
						}
					})
				}
				else {
					if (line.alias == alias && line.scope == scope){
						entriesData.push(line)
						if (line.name =='All students'){
							let dataLen=line.data.length
							dataMax=0
							for(let j=0; j<dataLen; j++){
								if(line.data[j][1]>dataMax){
									dataMax=line.data[j][1]
								}
							}
						}
					}
				}
			}
			if (dataMax == 0){
				yMax = 10
			}
			else {
				yMax = null
			}
			drawEntriesChart()
		}
	});
};

function readGradesData() {
	$.getJSON('/data/output/' + level.toLowerCase() + '/' + gradesJSON, function(data) {
		gradesData=[]
		let grades_array=[]
		if (grades == 'Selected') {
			grades_array=gradesSelected
		}
		else if (grades == 'All') {
			grades_array=gradesAll
		}
		let len=data.length
		if(len>0){
		    for(let i=0; i<len; i++){
		        var line=data.shift()
		        if (line.alias == alias && line.scope == scope && grades_array.indexOf(line.name)!=-1 && line.gender== gender){
					gradesData.push(line)
		        }
		    }
			drawGradesChart()
		}
	});
};

function setChartSubtitles() {
    let scopeDict = {
        'UK':'UK-wide',
        'EN':'England',
        'WA':'Wales',
        'NI':'Northern Ireland',
        '15':'15-year-olds and below, UK-wide',
        '16':'16-year-olds, UK-wide',
        '17':'17-year-olds and above, UK-wide',
        'EN15':'15-year-olds and below, England',
        'EN16':'16-year-olds, England',
        'EN17':'17-year-olds and above, England',
        'WA15':'15-year-olds and below, Wales',
        'WA16':'16-year-olds, Wales',
        'WA17':'17-year-olds and above, Wales',
        'NI15':'15-year-olds and below, Northern Ireland',
        'NI16':'16-year-olds, Northern Ireland',
        'NI17':'17-year-olds and above, Northern Ireland'
    }
    let gradesDict = {
        'Selected': 'selected grades',
        'All': 'all grades'
    }
    let genderDict = {
        'All students': 'All ',
        'Male': 'Male ',
        'Female': 'Female ',
    }
	if (isNaN(Number(scope.slice(scope.length-1))) == 0) {		// age breakdown, age x country breakdown
    	entriesChartSubtitle = scopeDict[scope]
		if (gender == 'All students') {
			gradesChartSubtitle = scopeDict[scope] + ', ' + gradesDict[grades]
		}
		else {
			gradesChartSubtitle = genderDict[gender] + scopeDict[scope] + ', ' + gradesDict[grades]
		}
	}
	else if (isNaN(Number(scope.slice(scope.length-1))) == 1) {		// country breakdown
    	entriesChartSubtitle = 'All students, ' + scopeDict[scope]
		gradesChartSubtitle = genderDict[gender] + ' students, ' + scopeDict[scope] + ', ' + gradesDict[grades]
	}
    return entriesChartSubtitle, gradesChartSubtitle
}

function drawEntriesChart() {
	if (queries.length > 0) {
		entriesChartColoursArray = ['#e6007e', '#2daae1', '#96c11f', '#535353']
	}
	else {
		entriesChartColoursArray = ['#2daae1','#96c11f','#535353']
	}
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.src = '/js/entries-chart.js?v=20190812';
	document.body.appendChild(js)
}

function drawGradesChart() {
	gradesChartColoursArray = []
	gradesChartColoursArray.push(coloursDict[gender])
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.src = '/js/grades-chart.js?v=20190812';
	document.body.appendChild(js)
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
	$('#scopeSelector').formSelect()		// re-initialise Materialize select input
	if (breakdown != 'agecountry' && scope != 'UK') {
		scope = 'UK'
		readEntriesData()
		if (urlSubject != 'bespoke') {
			readGradesData()
		}
		setChartSubtitles()
	}
	else if (breakdown == 'agecountry') {
		scope = 'EN16'
		readEntriesData()
		if (urlSubject != 'bespoke') {
			readGradesData()
		}
		setChartSubtitles()
	}
});

function scopeOptionChange() {
	scope = document.getElementById('scopeSelector').value
	readEntriesData()
	if (urlSubject != 'bespoke') {
		readGradesData()
	}
	setChartSubtitles()
}

function gradeChartOptionChange() {
	grades = document.getElementById('gradesSelector').value
	gender = document.getElementById('genderSelector').value
	if (urlSubject != 'bespoke') {
		readGradesData()
	}
	setChartSubtitles()
}
