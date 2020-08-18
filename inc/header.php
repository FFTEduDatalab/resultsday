<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
	<meta name="twitter:card" content="summary">
	<meta name="twitter:url" content="https://results.ffteducationdatalab.org.uk">
	<meta name="twitter:title" content="GCSE and A-Level results analysis - FFT Education Datalab">
	<meta name="twitter:description" content="Explore trends in GCSE and A-Level entries and grades in every subject">
	<meta name="twitter:image" content="https://results.ffteducationdatalab.org.uk/img/stepped_dots.png">
	<meta name="twitter:image:alt" content="GCSE and A-Level results analysis logo">
	<meta name="twitter:site" content="@ffteducationdatalab">
	<title>GCSE and A-Level results analysis - FFT Education Datalab</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="/css/materialize.min.css" type="text/css" rel="stylesheet" media="screen,projection"/>
	<link href="/css/style.css?v=20200818" type="text/css" rel="stylesheet" media="screen,projection"/>
	<link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://code.highcharts.com/6/highcharts.js"></script>
	<script src="https://code.highcharts.com/6/modules/series-label.js"></script>
	<script src="https://code.highcharts.com/6/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/6/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/6/modules/data.js"></script>
	<script src="/js/theme.js?v=20200818"></script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-59588201-4"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-59588201-4');

		// function getCookie(name) {
		// 	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		// 	return v ? v[2] : null;
		// }
		//
		// var cookieSettingsAccepted = getCookie("cookieconsent_status");
		//
		// if (cookieSettingsAccepted !== null && cookieSettingsAccepted === "allow" ) {
		// 	gtag('config', 'UA-59588201-4');
		// 	console.log("ga cookie");
		// }
		// else
		// {
		// 	gtag('config', 'UA-59588201-4', {
		// 		'client_storage': 'none'
		// 	});
		// 	console.log("no ga cookie");
		// }
	</script>

<!-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" /> -->
<noscript><div class='no-script'><h5>This site requires JavaScript, which is turned off in your browser.</h5></div></noscript>
</head>
<body>
	<div class="container" id="logo-container" style="padding-top: 20px">
		<a href="/" class="logo-datalab"><img src="/img/logo_fft_education_datalab.png" /></a>
		<a href="https://www.nuffieldfoundation.org/" target="_blank" class="logo-nuffield" onclick="ga('send', 'event', 'Outbound link', 'Nuffield site', 'Nuffield site');"><img src="/img/logo_nuffield.png"></a>
	</div>
	<nav class="white nav-extended" role="navigation">
		<div class="nav-wrapper container">
			<a id="title-container" class="brand-logo hide-on-med-and-down" href="/">Results day analysis</a>
			<ul class="right hide-on-med-and-down">
				<li><a href="/">Home</a></li>
				<li><a href="/guide.php?v=20200818">Guide</a></li>
				<li><a class="dropdown-trigger fft-pink-text" href="#!" data-target="level-dropdown">A-Level<i class="material-icons right">arrow_drop_down</i></a></li>
				<li><a class="fft-pink-text" href="/gcse.php?v=20200818">GCSE</a></li>
				<li><a href="/about.php?v=20200818">About</a></li>
			</ul>
			<ul id="level-dropdown" class="dropdown-content">
				<li><a class="fft-pink-text" href="/a-level.php?v=20200818">A-Level</a></li>
				<li><a class="fft-pink-text" href="/as-level.php?v=20200818">AS-Level</a></li>
			</ul>
			<ul id="nav-mobile" class="sidenav">
				<li><a class='collapsible-header' href="/"><strong>Results day analysis</strong></a></li>
				<li><a href="/">Home</a></li>
				<li><a href="/guide.php?v=20200818">Guide</a></li>
				<li><a class="fft-pink-text" href="/a-level.php?v=20200818">A-Level</a></li>
				<li><a class="fft-pink-text" href="/as-level.php?v=20200818">AS-Level</a></li>
				<li><a class="fft-pink-text" href="/gcse.php?v=20200818">GCSE</a></li>
				<li><a href="/about.php?v=20200818">About</a></li>
			</ul>
			<a href="#" data-target="nav-mobile" class="sidenav-trigger grey-text"><i class="material-icons">menu</i></a>
		</div>
	</nav>
