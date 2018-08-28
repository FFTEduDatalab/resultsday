<?php include 'inc/header.php';?>
<div class="section grey lighten-4">
	<div class="container">
		<div class="row">
			<div class="col m6 s12">
				<h1>Welcome</h1>
			</div>
		</div>
		<div class="row">
			<div class="col s12">
				<h4>Explore trends in national <a href="a-level.php?v=20180823">A-Level</a>, <a href="as-level.php?v=20180823">AS-Level</a> and <a href="gcse.php?v=20180823">GCSE</a> entry and results data from 2014 to 2018.</h4>
			</div>
		</div>
		<div class="row">		<!-- feed item title: <h4> tag with class feed-item-title; feed item excerpt: <p> tag with class feed-item-desc -->
			<div class="col s12">
				<h2>Blogposts</h2>
				<script src="//rss.bloople.net/?url=https%3A%2F%2Fffteducationdatalab.org.uk%2Ftag%2Fresults-2018%2Ffeed%2F&showtitle=false&type=js"></script>
			</div>
		</div>
	</div>
</div>
<script>
	function runScripts() {
		$('#report-banner').hide();
	}
</script>
<?php include 'inc/footer.php';?>
