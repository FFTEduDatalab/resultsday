<?php include($_SERVER['DOCUMENT_ROOT'].'/inc/header.php');?>
<div class="section grey lighten-4">
	<div class="container">
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
			</div>
		</div>
	</div>
</div>
<script src='/js/results-subject.js?v=20200811'></script>
<?php include($_SERVER['DOCUMENT_ROOT'].'/inc/footer.php');?>
