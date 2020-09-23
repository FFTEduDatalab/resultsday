<?php include($_SERVER['DOCUMENT_ROOT'].'/inc/header.php');?>
<div class="section grey lighten-4">
	<div class="container">
		<div class="row" id="header-section">
			<div class="col s12">
				<a class="btn-flat" id="back-button" onclick="goBack()">< Back to subject list</a>
				<h1><span id='subjectNameContainer'></span> | <span id='levelNameContainer'></span></h1>
			</div>
		</div>
		<div class="row" id="main-section">
			<div class="col l8 s12">
				<div class="card white">
					<div class="card-content">
						<div class="input-field col s12 m6" id='bSelector'>
							<select id='breakdownSelector' autocomplete='off'>
								<option value='country'>Country</option>
								<option value='age'>Age</option>
								<option value='agecountry'>Age and country (2018-)</option>
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
						<div class="input-field col s12 m6">
							<select id='genderSelector' autocomplete='off' onchange='gradeChartOptionChange()'>
								<option value='All students'>All students</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</select>
						</div>
						<div class="input-field col s12 m6" id='gSelector'>
							<select id='gradesSelector' autocomplete='off' onchange='gradeChartOptionChange()'>
								<option value='Selected'>Selected grades</option>
								<option value='All'>All grades</option>
							</select>
						</div>
						<div id="gradesChartContainer" class="chartContainer"></div>
					</div>
				</div>
			</div>
			<div class="col l4 s12">
				<ul class="collection">
					<li class="collection-item" id='gcseFlagContainer'>
						<div align='right'><a class="material-icons" data-position="top" href='/guide.php?v=20200923#subject_flags'>info_outline</a></div>
						<img id='ebaccFlagImg' src='/img/ebaccFlagImgGrey.png' class='tooltipped' data-position="top" data-tooltip='This subject does not count in the English Baccalaureate (England only)'>
						<img id='p8dblFlagImg' src='/img/p8dblFlagImgGrey.png' class='tooltipped' data-position="top" data-tooltip='This subject is not double-counted in Progress 8 calculations (England only)'>
					</li>
					<li class="collection-item">
						<div align='right'><a class="material-icons" data-position="top" href='/guide.php?v=20200923#reform_date'>info_outline</a></div>
						<div id='reformYearContainer'></div>
					</li>
				</ul>
			</div>
			<div class="col l4 s12">
				<ul class="collection">
					<li class="collection-item" id="definitionContainer"></li>
					<li class="collection-item" id="analysisContainer"></li>
					<li class="collection-item" id="contextBox">
						<div><i class="material-icons tooltipped" data-position="top" data-tooltip='Context information'>warning</i></div>
						<div id="contextContainer"></div>
					</li>
				</ul>
			</div>
			<div class="col l4 s12 right">
				<ul class="collection">
					<li class="collection-item">
						<p>Share what you've learnt:</p>
						<div class="addthis_inline_share_toolbox"></div>
					</li>
				</ul>
			</div>
		</div>
		<div class="row" id="related-subjects-section">
			<div class="col s12">
				<div class="card">
					<div class="card-content">
						<h5>Explore related subjects:</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src='/js/results-subject.js?v=20200923'></script>
<script src='/js/toasts.js?v=20200923'></script>
<?php include($_SERVER['DOCUMENT_ROOT'].'/inc/footer.php');?>
