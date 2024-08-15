var urlLevel,
	urlSubject,
	alevelNewDataToastText,
	gcseNewDataToastText,
	earlyResultsToastText = "<div class='toast-content'><b>FFT Aspire user?</b> Schools that subscribe to FFT Aspire can use the free KS4 and KS5 Early Results Service, which provides an early analysis of their results. <a href='https://fft.org.uk/2021-fft-secondary-results-service/' target='_blank'>Click here for more information.</a></div><div class='material-icons close'>close</div>",
	levels = [
		{
			'name': 'A-Level',
			'subjectsJSON': 'a-level-subjects.json?v=20240815',
			'entriesJSON': 'a-level-entries.json?v=20240815',
			'gradesJSON': 'a-level-grades.json?v=20240815',
			'textJSON': 'a-level-text.json?v=20240815',
			'gradesAll': ['A*', 'A or above', 'B or above', 'C or above', 'D or above', 'E or above', 'U or above'],
			'gradesSelected': ['A*', 'A or above', 'C or above', 'E or above']
		},
		{
			'name': 'AS-Level',
			'subjectsJSON': 'as-level-subjects.json?v=20240815',
			'entriesJSON': 'as-level-entries.json?v=20240815',
			'gradesJSON': 'as-level-grades.json?v=20240815',
			'textJSON': 'as-level-text.json?v=20240815',
			'gradesAll': ['A', 'B or above', 'C or above', 'D or above', 'E or above', 'U or above'],
			'gradesSelected': ['A', 'C or above', 'E or above']
		},
		{
			'name': 'GCSE',
			'subjectsJSON': 'gcse-subjects.json?v=20240815',
			'entriesJSON': 'gcse-entries.json?v=20240815',
			'gradesJSON': 'gcse-grades.json?v=20240815',
			'textJSON': 'gcse-text.json?v=20240815',
			'gradesAll': ['7/A or above', '4/C or above', '1/G or above', 'U or above'],
			'gradesSelected': ['7/A or above', '4/C or above', '1/G or above']
		}
	];

$(function () {
	urlLevel = window.location.href.split('/')[3].split('.')[0];// final split is required for level directory pages
	urlSubject;
	if (window.location.href.split('/')[4]) {		// not level directory page
		urlSubject = window.location.href.split('/')[4].split('.')[0];
	}
	if (urlLevel == '') {
		level = 'index';
	}
	else {
		let levelData = levels.filter(function (levels) {
			return levels.name.toLowerCase() == urlLevel;
		})[0];
		level = levelData.name;
	}
	var d = new Date();
	var di = d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + f.getDate();
	var ti = d.getHours() * 100 + d.getMinutes()
	alevelNewDataToastText = "<div class='toast-content'>A-Level and AS-Level data for 2021 is that issued on Tuesday 10 August. It will be replaced when revised national figures become available.</div>";
	gcseNewDataToastText = "<div class='toast-content'>National GCSE data for 2021 has not been published yet by the Joint Council for Qualifications, but will be added to this site when it is released.</div><div class='material-icons close'>close</div>";
	M.toast({html: earlyResultsToastText, classes: 'early-results', displayLength: 'infinity', inDuration: 0, activationPercent: 0.7});
	M.toast({html: alevelNewDataToastText, classes: 'new-data alevel', displayLength: 'infinity', inDuration: 0, activationPercent: 0.7});
	M.toast({html: gcseNewDataToastText, classes: 'new-data gcse', displayLength: 'infinity', inDuration: 0, activationPercent: 0.7});
	$('.toast.early-results').hide();
	$('.toast.new-data.alevel').hide();
	$('.toast.new-data.gcse').hide();
	if (urlSubject && localStorage.getItem('earlyResultsState') != 'dismissed') {		// not level directory page
		$('.toast.early-results').show();
	}
	if (urlSubject && (level == 'A-Level' || level == 'AS-Level') && localStorage.getItem('newALevelDataState') != 'dismissed') {
		$('.toast.new-data.alevel').show();
	}
	if (urlSubject && (level == 'GCSE') && localStorage.getItem('newGCSEDataState') != 'dismissed') {
		$('.toast.new-data.gcse').show();
	}
	if (di > 20210810) {
		$('.toast.early-results').hide();
	}
	if (di > 20210810 || di == 20210810 && ti > 929) {
		$('.toast.new-data.alevel').hide();
	}
	if (di > 20220818 || di == 20220818 && ti > 929) {
		$('.toast.new-data.gcse').hide();
	}
});

$(document).on('click', '#toast-container .early-results .close', function () {
	$(this).parent().fadeOut(function () {
		$(this).remove();
	});
	localStorage.setItem('earlyResultsState', 'dismissed');
});

$(document).on('click', '#toast-container .new-data.alevel .close', function () {
	$(this).parent().fadeOut(function () {
		$(this).remove();
	});
	localStorage.setItem('newALevelDataState', 'dismissed');
});

$(document).on('click', '#toast-container .new-data.gcse .close', function () {
	$(this).parent().fadeOut(function () {
		$(this).remove();
	});
	localStorage.setItem('newGCSEDataState', 'dismissed');
});
