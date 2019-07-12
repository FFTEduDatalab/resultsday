<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
	<title>GCSE and A-Level results analysis - FFT Education Datalab</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="/css/materialize.min.css" type="text/css" rel="stylesheet" media="screen,projection"/>
	<link href="/css/style.css?v=20190712" type="text/css" rel="stylesheet" media="screen,projection"/>
	<link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://code.highcharts.com/6/highcharts.js"></script>
	<script src="https://code.highcharts.com/6/modules/series-label.js"></script>
	<script src="https://code.highcharts.com/6/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/6/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/6/modules/data.js"></script>
	<script src="/js/theme.js?v=20190712"></script>
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})
		(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-59588201-1', 'auto');
		ga('send', 'pageview');
	</script>
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
				<li><a href="/guide.php?v=20190712">Guide</a></li>
				<li><a class="dropdown-trigger" href="#!" data-target="level-dropdown">A-Level<i class="material-icons right">arrow_drop_down</i></a></li>
				<li><a href="/gcse.php?v=20190712">GCSE</a></li>
				<li><a href="/about.php?v=20190712">About</a></li>
			</ul>
			<ul id="level-dropdown" class="dropdown-content">
				<li><a href="/a-level.php?v=20190712">A-Level</a></li>
				<li><a href="/as-level.php?v=20190712">AS-Level</a></li>
			</ul>
			<ul id="nav-mobile" class="sidenav">
				<li><a class='collapsible-header' href="/"><strong>Results day analysis</strong></a></li>
				<li><a href="/">Home</a></li>
				<li><a href="/guide.php?v=20190712">Guide</a></li>
				<li><a href="/a-level.php?v=20190712">A-Level</a></li>
				<li><a href="/as-level.php?v=20190712">AS-Level</a></li>
				<li><a href="/gcse.php?v=20190712">GCSE</a></li>
				<li><a href="/about.php?v=20190712">About</a></li>
			</ul>
			<a href="#" data-target="nav-mobile" class="sidenav-trigger grey-text"><i class="material-icons">menu</i></a>
		</div>
	</nav>
