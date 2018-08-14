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
					<h5><li>Explore subjects and groups of subjects:</li></h5>
			    	<h5><div id='subjectListContainer'></div><h5>
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
<script src='../../js/results-level-0.1.0.js'></script>
<?php include 'inc/footer.php';?>
