var urlLevel,
	urlSubject,
	alevelNewDataToastText,
	gcseNewDataToastText,
	earlyResultsToastText = "<div class='toast-content'><b>FFT Aspire user?</b> Schools that subscribe to FFT Aspire can use the free Key Stage 4 Early Results Service, which provides an early analysis of their results. <a href='https://fft.org.uk/ks4-early-results/' target='_blank'>Click here for more information.</a></div><div class='material-icons close'>close</div>",
	levels = [
		{
			'name': 'A-Level',
			'subjectsJSON': 'a-level-subjects.json?v=20190822.2',
			'entriesJSON': 'a-level-entries.json?v=20190822.2',
			'gradesJSON': 'a-level-grades.json?v=20190822.2',
			'textJSON': 'a-level-text.json?v=20190822.2',
			'gradesAll': ['A*', 'A or above', 'B or above', 'C or above', 'D or above', 'E or above', 'U or above'],
			'gradesSelected': ['A*', 'A or above', 'C or above', 'E or above']
		},
		{
			'name': 'AS-Level',
			'subjectsJSON': 'as-level-subjects.json?v=20190822.2',
			'entriesJSON': 'as-level-entries.json?v=20190822.2',
			'gradesJSON': 'as-level-grades.json?v=20190822.2',
			'textJSON': 'as-level-text.json?v=20190822.2',
			'gradesAll': ['A', 'B or above', 'C or above', 'D or above', 'E or above', 'U or above'],
			'gradesSelected': ['A', 'C or above', 'E or above']
		},
		{
			'name': 'GCSE',
			'subjectsJSON': 'gcse-subjects.json?v=20190822.2',
			'entriesJSON': 'gcse-entries.json?v=20190822.2',
			'gradesJSON': 'gcse-grades.json?v=20190822.2',
			'textJSON': 'gcse-text.json?v=20190822.2',
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
	} else {
		let levelData = levels.filter(function (levels) {
			return levels.name.toLowerCase() == urlLevel;
		})[0];
		level = levelData.name;
	}
	var d = new Date();
	alevelNewDataToastText = "<div class='toast-content'>A-Level and AS-Level data for 2019 is available at 9.30am on Thursday 15 August and will be added at that point</div><div class='material-icons close'>close</div>";
	gcseNewDataToastText = "<div class='toast-content'>GCSE data for 2019 is available at 9.30am on Thursday 22 August and will be added at that point</div><div class='material-icons close'>close</div>";
	M.toast({html: earlyResultsToastText, classes: 'early-results', displayLength: 'infinity', inDuration: 0, activationPercent: 0.7});
	M.toast({html: alevelNewDataToastText, classes: 'new-data alevel', displayLength: 'infinity', inDuration: 0, activationPercent: 0.7});
	M.toast({html: gcseNewDataToastText, classes: 'new-data gcse', displayLength: 'infinity', inDuration: 0, activationPercent: 0.7});
	$('.toast.early-results').hide();
	$('.toast.new-data.alevel').hide();
	$('.toast.new-data.gcse').hide();
	if (urlSubject && level == 'GCSE' && localStorage.getItem('earlyResultsState') != 'dismissed') {		// not level directory page
		$('.toast.early-results').show();
	}
	if ((level == 'index' || level == 'A-Level' || level == 'AS-Level') && localStorage.getItem('newALevelDataState') != 'dismissed') {
		$('.toast.new-data.alevel').show();
	}
	if ((level == 'index' || level == 'GCSE') && localStorage.getItem('newGCSEDataState') != 'dismissed') {
		$('.toast.new-data.gcse').show();
	}
	if (d.getFullYear() > 2019 || (d.getFullYear() == 2019 && d.getMonth() > 8 || (d.getFullYear() == 2019 && d.getMonth() == 8 && d.getDate() > 6))) {
		$('.toast.early-results').hide();
	}
	if (d.getFullYear() > 2019 || (d.getFullYear() == 2019 && d.getMonth() > 7 || (d.getFullYear() == 2019 && d.getMonth() == 7 && d.getDate() > 15 || (d.getFullYear() == 2019 && d.getMonth() == 7 && d.getDate() == 15 & d.getHours() > 9 || (d.getFullYear() == 2019 && d.getMonth() == 7 && d.getDate() == 15 & d.getHours() == 9 & d.getMinutes() >= 30))))) {		// month 7 = August
		$('.toast.new-data.alevel').hide();
	}
	if (d.getFullYear() > 2019 || (d.getFullYear() == 2019 && d.getMonth() > 7 || (d.getFullYear() == 2019 && d.getMonth() == 7 && d.getDate() > 22 || (d.getFullYear() == 2019 && d.getMonth() == 7 && d.getDate() == 22 & d.getHours() > 9 || (d.getFullYear() == 2019 && d.getMonth() == 7 && d.getDate() == 22 & d.getHours() == 9 & d.getMinutes() >= 30))))) {		// month 7 = August
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
