var level, alias, subject, flags, reformYear, definition, context, analysis, entriesData, gradesData, entriesChartSubtitle, gradesChartSubtitle, gradesChartColoursArray, subjectsJSON, entriesJSON, gradesJSON, textJSON, gradesAll, gradesSelected
var breakdown = 'Coverage';
var scope = 'UK';
var grades = 'Selected'
var gender = 'All students'
var coloursDict = {
    'All students':'#535353',
    'Male':'#2daae1',
    'Female':'#96c11f'
}
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

$(function () {
	Highcharts.setOptions(Highcharts.theme)
	urlLevel=window.location.href.split('/')[3].split('.')[0]
	urlSubject=window.location.href.split('/')[4].split('.')[0]
	let levelData=levels.filter(function(levels) {
		return levels.name.toLowerCase() == urlLevel
	})[0];
	level=levelData.name
	document.getElementById('levelNameContainer').innerHTML=level
	if (level=='A-Level' || level=='AS-Level'){
		$('#bSelector').hide()
		$('#gcseFlagContainer').hide()
		toast_text='A-Level and AS-Level data for 2018 is available at 9.30am on Thursday 23 August and will be added at that point'
	}
	if (level=='GCSE'){
		$('#gSelector').hide()
		$('#alevelFlagContainer').hide()
		toast_text='GCSE data for 2018 is available at 9.30am on Thursday 23 August and will be added at that point'
	}
	M.toast({html: toast_text, displayLength: 'infinity', inDuration:0})
	gradesChartColoursArray=[]
	gradesChartColoursArray.push(coloursDict['All students'])
	subjectsJSON=levelData.subjectsJSON
	entriesJSON=levelData.entriesJSON
	gradesJSON=levelData.gradesJSON
	textJSON=levelData.textJSON
	gradesAll=levelData.gradesAll
	gradesSelected=levelData.gradesSelected
	$.getJSON('/data/output/' + level.toLowerCase() + '/' + subjectsJSON, function(data) {
		let len=data.length
		if(len>0){
	        for(let i=0; i<len; i++){
	          var line=data.shift()
	          if (line.subject_name_clean.replace(/\W+/g, '-').toLowerCase() == urlSubject){
	            subject=line.subject_name_clean
							subject_lc=line.subject_name_clean_lc
				document.getElementById('subjectNameContainer').innerHTML=subject
				alias=line.alias
				definition=line.definition
				if (definition==null){
					$('#definitionContainer').hide()
				}
				context=line.context
				if (context==null){
					$('#contextContainer').hide()
				}
				flags=line.flags
				if (level=='A-Level' || level=='AS-Level'){
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
						document.getElementById('p8dblFlagImg').setAttribute('data-tooltip', 'This subject is double-counted in Progress 8 calculations (England only)')
					}
					else {
						document.getElementById('p8dblFlagImg').src = '/img/p8dblFlagImgGrey.png';
						document.getElementById('p8dblFlagImg').setAttribute('data-tooltip', 'This subject is not double-counted in Progress 8 calculations (England only)')
					}
				}
				reformYear=line.reform_year
				document.getElementById('definitionContainer').innerHTML=document.getElementById('definitionContainer').innerHTML+definition
				document.getElementById('contextContainer').innerHTML=document.getElementById('contextContainer').innerHTML+context
				document.getElementById('reformYearContainer').innerHTML='<ul><li><em>Reform date</em></li><li>England: ' + reformYear.EN +'</li><li>Wales: ' + reformYear.WA +'</li><li>Northern Ireland: ' + reformYear.NI +'</li></ul>'
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
});

$(document).on('click', '#toast-container .toast', function() {
    $(this).fadeOut(function(){
        $(this).remove();
    });
});

function goBack() {
    window.history.back();
}

function readEntriesData() {
    $.getJSON('/data/output/' + level.toLowerCase() + '/' + entriesJSON, function(data) {
		entriesData=[]
		let len=data.length
		if(len>0){
		for(let i=0; i<len; i++){
			var line=data.shift()
			if (line.alias == alias && line.scope == scope){
				entriesData.push(line)
			}
		}
		drawEntriesChart()
		}
	});
};

function readGradesData() {
	$.getJSON('/data/output/' + level.toLowerCase() + '/' + gradesJSON, function(data) {
		gradesData=[]
		let grades_array=[]
		if(grades == 'Selected'){
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
        '15':'15-year-olds and younger',
        '16':'16-year-olds',
        '17':'17-year-olds and older'
    }
    let gradesDict = {
        'Selected':'selected grades',
        'All':'all grades'
    }
    let genderDict = {
        'All students':'All students',
        'Male':'Male students',
        'Female':'Female students',
    }
    entriesChartSubtitle = 'All students, ' + scopeDict[scope]
		if (level=='GCSE'){
			gradesChartSubtitle = genderDict[gender] + ', ' + scopeDict[scope] + ', ' + 'key grades'
		}
		else{
			gradesChartSubtitle = genderDict[gender] + ', ' + scopeDict[scope] + ', ' + gradesDict[grades]
		}
    return entriesChartSubtitle, gradesChartSubtitle
}

function drawEntriesChart() {
	gradesChartColoursArray = []
	gradesChartColoursArray.push(coloursDict[gender])
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.src = '/js/entries_chart.js';
	document.body.appendChild(js)
}

function drawGradesChart() {
	gradesChartColoursArray = []
	gradesChartColoursArray.push(coloursDict[gender])
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.src = '/js/grades_chart.js';
	document.body.appendChild(js)
}

$('#breakdownSelector').change(function () {
	breakdown = $(this).val();
	if (breakdown == 'coverage') {
		$('#scopeSelector').html('<option value="UK">UK</option><option value="EN">England</option><option value="WA">Wales</option><option value="NI">Northern Ireland</option>');
	}
	else if (breakdown == 'age') {
		$('#scopeSelector').html('<option value="UK">All ages</option><option value="15">15-year-olds and younger</option><option value="16">16-year-olds</option><option value="17">17-year-olds and older</option>');
	}
	$('#scopeSelector').formSelect()		// re-initialise Materialize select input
	if(scope!='UK'){
		scope = 'UK'
		readEntriesData(scope, grades, gender)
		readGradesData(scope, grades, gender)
		setChartSubtitles()
	}
});

function scopeOptionChange() {
	scope = document.getElementById('scopeSelector').value
	readEntriesData()
	readGradesData()
	setChartSubtitles()
}

function gradeChartOptionChange() {
	grades = document.getElementById('gradesSelector').value
	gender = document.getElementById('genderSelector').value
	readGradesData()
	setChartSubtitles()
}
