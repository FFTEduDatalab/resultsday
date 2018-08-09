<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>GCSE and A-Level Results - FFT Education Datalab</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="/css/materialize.min.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="/css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/data.js"></script>
  <script src="/js/theme.js"></script>
</head>
<body>
	<div class="container" id="logo-container" style="padding-top: 20px">
		<a href="/"><img src="/img/logo_fft_education_datalab.png" width="250" height="64" /></a>
		<a href="http://www.nuffieldfoundation.org/"><img src="/img/logo_nuffield.jpg" width="186" height="64" style="float: right;">
	</div>
	<nav class="white nav-extended" role="navigation">
		<div class="nav-wrapper container">
			<h4><a id="title-container" class="brand-logo" href="/">GCSE and A-Level results</a></h4>
			<ul class="right hide-on-med-and-down">
				<li><a href="/">Home</a></li>
				<li><a class="dropdown-trigger" href="#!" data-target="level-dropdown">A-Level<i class="material-icons right">arrow_drop_down</i></a></li>
				<li><a href="/gcse.php">GCSE</a></li>
				<li><a href="/about.php">About</a></li>
			</ul>
			<ul id="level-dropdown" class="dropdown-content">
				<li><a href="/a-level.php">A-Level</a></li>
				<li><a href="/as-level.php">AS-Level</a></li>
			</ul>
			<ul id="nav-mobile" class="sidenav">
				<li><a href="/">Home</a></li>
				<li><a href="/a-level.php">A-Level</a></li>
				<li><a href="/as-level.php">AS-Level</a></li>
				<li><a href="/gcse.php">GCSE</a></li>
				<li><a href="/about.php">About</a></li>
			</ul>
			<a href="#" data-target="nav-mobile" class="sidenav-trigger grey-text"><i class="material-icons">menu</i></a>
		</div>
	</nav>
