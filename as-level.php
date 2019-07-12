<?php include 'inc/header.php';?>
<div class="section grey lighten-4">
	<div class="container">
		<div class="row">
			<div class="col m6 s12">
				<h1><div id='levelNameContainer'></div></h1>
			</div>
		</div>
		<div class="row">
			<div class="col s12">
			    <ul>
					<h5><li>Explore trends in entries and attainment in:</h5></li>
			    </ul>
			</div>
		</div>
		<div class="row" id="subject-cards"></div>
	</div>
</div>
<script>
	function runScripts() {
		$('#report-banner').hide();
	}
</script>
<script src='/js/results-level.js?v=20180904'></script>
<?php include 'inc/footer.php';?>
