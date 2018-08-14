<?php include '../inc/header-0.1.0.php';?>
<div class="section grey lighten-4">
	<div class="container">
		<div class="row">
			<div class="col s12">
				<a class="btn-flat" onclick="goBack()">< Back</a>
				<h1><span id='subjectNameContainer'></span> | <span id='levelNameContainer'></span></h1>
			</div>
		</div>
		<div class="row">
			<div class="col l8 s12">
				<div class="card white">
					<div class="card-content">
						<div class="input-field col s12 m6" id='bSelector'>
							<select id='breakdownSelector' autocomplete='off'>
								<option value='geography'>Geography</option>
								<option value='age'>Age</option>
							</select>
						</div>
						<div class="input-field col s12 m6">
							<select id='scopeSelector' autocomplete='off' onchange='scopeOptionChange()'>
								<option value="UK">UK</option>
								<option value="EN">England</option>
								<option value="WA">Wales</option>
								<option value="NI">Northern Ireland</option>
							</select>
						</div>
						<div id="entriesChartContainer" class="chartContainer"></div>
					</div>
				</div>
				<div class="card white">
					<div class="card-content">
						<div class="input-field col s12 m6" id='gSelector'>
							<select id='gradesSelector' autocomplete='off' onchange='gradeChartOptionChange()'>
								<option value='Selected'>Selected grades</option>
								<option value='All'>All grades</option>
							</select>
						</div>
						<div class="input-field col s12 m6">
							<select id='genderSelector' autocomplete='off' onchange='gradeChartOptionChange()'>
								<option value='All students'>All students</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</select>
						</div>
						<div id="gradesChartContainer" class="chartContainer"></div>
					</div>
				</div>
			</div>
			<div class="col l4 s12">
				<ul class="collection">
					<li class="collection-item" id='gcseFlagContainer'>
						<div align='right'><a class="material-icons" href='/guide.php#symbols' target="_blank">info_outline</a></div>
						<img id='ebaccFlagImg' src='/img/ebaccFlagImgGrey.png' class='tooltipped' data-position="top" data-tooltip='This subject does not count in the English Baccalaureate (England only)'>
						<img id='p8dblFlagImg' src='/img/p8dblFlagImgGrey.png' class='tooltipped' data-position="top" data-tooltip='This subject is not double-counted in Progress 8 calculations (England only)'>
					</li>
					<li class="collection-item" id='alevelFlagContainer'>
						<div align='right'><a class="material-icons" href='/guide.php#symbols' target="_blank">info_outline</a></div>
						<img id='facilFlagImg' src='/img/facilFlagImgGrey.png' class='tooltipped' data-position="top" data-tooltip='This is not a facilitating subject'>
					</li>
					<li class="collection-item">
						<div align='right'><a class="material-icons" href='/guide.php#reform_date'>info_outline</a></div>
						<div id='reformYearContainer'></div>
					</li>
				</ul>
			</div>
			<div class="col l4 s12">
				<ul class="collection">
					<li class="collection-item" id="definitionContainer"></li>
					<li class="collection-item" id="analysisContainer"></li>
					<li class="collection-item" id="contextContainer"><i class="material-icons">warning</i></li>
				</ul>
			</div>
		</div>
	</div>
</div>
<script src='/js/results-subject-0.1.0.js'></script>
<?php include '../inc/footer-0.1.0.php';?>
