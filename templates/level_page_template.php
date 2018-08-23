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
					<h5><li>Explore trends in national entry and attainment data between 2014 and 2018 in:</h5></li>
			    	<h5><li><div id='subjectListContainer'></div></li><h5>
			    </ul>
			</div>
		</div>
	</div>
</div>
<script>
  function runScripts() {
	  $('#report-banner').hide();
  }
</script>
<script src='/js/results-level.js?v=20180823'></script>
<?php include 'inc/footer.php';?>
