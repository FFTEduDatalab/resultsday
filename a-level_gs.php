<?php include 'inc/header.php';?>

  <div class="section grey lighten-4">
	<div class="container">
		<div class="row">
			<div class="col m9 s12">
				<h1>Chemistry (A-Level)</h1>
			</div>
			<div class="col m3 s12">
				<select id="subject-dropdown">
				  <option value="" selected>Choose a subject</option>
				  <option value="?subject=chemistry">Chem</option>
				  <option value="?subject=biology">Biol</option>
				  <option value="?subject=physics">Phys</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col l8 s12">
				<div class="card white">
					<div class="card-content">
						<div class="input-field col s12 m6">
							<select id="options" autocomplete="off" onchange="optionChange()">
								<option value="UK">UK</option>
								<option value="EN">England</option>
								<option value="WA">Wales</option>
								<option value="NI">Northern Ireland</option>
							</select>
						</div>
						<div id="entriesContainer" class="chartContainer"></div>
					</div>
				</div>
				<div class="card white">
					<div class="card-content">
						<div class="input-field col s12 m6">
							<select id="detail" autocomplete="off" onchange="optionChange2()">
								<option value="Selected">Selected grades</option>
								<option value="All">All grades</option>
							</select>
						</div>
						<div class="input-field col s12 m6">
						<select id="gender" autocomplete="off" onchange="optionChange2()">
							<option value="All students">All students</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
						</div>
						<div id="gradesContainer" class="chartContainer"></div>
						<?php 
						/*
						$subject = trim($_GET['subject']); 
							if ($subject === '' || $subject === false) {
								echo '';
							} else {
								echo htmlspecialchars($_GET['subject']);
							}
							*/
						?>
    <script>
	function runScripts() {
		
      var level='A-Level'
      var subject = "Chemistry";
      var scope = "UK";
      var grades = "Selected"
      var gender = "All students"
      var entriesChartSubtitle
      var gradesChartSubtitle
      var coloursDict = {
          'All students':'#535353',
          'Male':'#2daae1',
          'Female':'#96c11f'
      }
      var gradesChartColoursArray = []
      gradesChartColoursArray.push(coloursDict['All students'])

      Highcharts.setOptions(Highcharts.theme)

      drawEntriesChart(scope, grades, gender)
      drawGradesChart(scope, grades, gender)

      var entriesData=[]
      var gradesData=[]

      levels=[
      	{
      		'name':'A-Level',
      		'grades_all':['A*','A','B','C','D','E','U'],
          'grades_selected':['A*','A','C','E']
      	},
      	{
      		'name':'AS-Level',
      		'grades_all':['A','B','C','D','E','U'],
          'grades_selected':['A','C','E']
      	},
      	{
      	 	'name':'GCSE',
      		'grades_all':['A/7','C/4','G/1','U'],
          'grades_selected':['A/7','C/4','G/1']
      	}
      ]

        $(function () {
            $.getJSON('data/a-level/a-level-text.json', function(data) {
                let len=data.length
                if(len>0){
                    for(let i=0; i<len; i++){
                        var line=data.shift()
                        if (line.subject == subject){
                          document.getElementById("textContainer").innerHTML=line.text;
                          document.getElementById("yearContainer").innerHTML=line.reform_date_WA;
							if (line.facilitating_subject == true) {
								document.getElementById("facContainer").innerHTML='Facilitating subject';
							} else {
								document.getElementById("facContainer").innerHTML='Not a facilitating subject';
							}
                        }
                    }
                }
            });
        });

        function readEntriesData() {
            $.getJSON('data/a-level/a-level-entries.json', function(data) {
              entriesData=[]
              let len=data.length
              if(len>0){
                  for(let i=0; i<len; i++){
                      var line=data.shift()
                      if (line.subject == subject && line.scope == scope){
                        entriesData.push(line)
                      }
                  }
		          }
            });
        };

      function readLevelGrades(level) {
        return levels.filter(function(levels) {
          return levels.name == level
        });
      }

      function readGradesData() {
        $.getJSON('data/a-level/a-level-grades.json', function(data) {
          gradesData=[]
          let grades_array=[]
          if(grades == "Selected"){
            grades_array=readLevelGrades(level)[0]['grades_selected']
          }
          else if (grades == "All") {
            grades_array=readLevelGrades(level)[0]['grades_all']
          }
          let len=data.length
          if(len>0){
              for(let i=0; i<len; i++){
                  var line=data.shift()
                  if (line.subject == subject && line.scope == scope && grades_array.indexOf(line.name)!=-1 && line.gender== gender){
                    gradesData.push(line)
                  }
              }
          }
        });
      };

      function scopeChange() {
            scope = document.getElementById("scopeSelector").value
            drawEntriesChart(scope, grades, gender)
            drawGradesChart(scope, grades, gender)
          }

      function gradeChartOptionChange() {
        grades = document.getElementById("gradesSelector").value
        gender = document.getElementById("genderSelector").value
        drawGradesChart(scope, grades, gender)
      }

      function setChartSubtitles(scope, grades, gender) {
          let scopeDict = {
              'UK':'UK-wide',
              'EN':'England',
              'WA':'Wales',
              'NI':'Northern Ireland',
              '15':'15-year-olds and younger',
              '16':'16-year-olds',
              '17':'17-year-olds and older'
          }
          let gradesDict = {
              'Selected':'selected grades',
              'All':'all grades'
          }
          let genderDict = {
              'All students':'All students',
              'Male':'Male students',
              'Female':'Female students',
          }
          entriesChartSubtitle = 'All students, ' + scopeDict[scope]
          gradesChartSubtitle = genderDict[gender] + ', ' + scopeDict[scope] + ', ' + gradesDict[grades]
          return entriesChartSubtitle, gradesChartSubtitle
      }

      function drawEntriesChart(scope, grades, gender) {
        readEntriesData()
        setChartSubtitles(scope, grades, gender)
        gradesChartColoursArray = []
        gradesChartColoursArray.push(coloursDict[gender])
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.src = "js/a_level_entries.js";
        document.body.appendChild(js)
      }

      function drawGradesChart(scope, grades, gender) {
        readGradesData()
		    setChartSubtitles(scope, grades, gender)
        gradesChartColoursArray = []
        gradesChartColoursArray.push(coloursDict[gender])
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.src = "js/a_level_grades.js";
        document.body.appendChild(js)
      }
	  
	  // build dropdown 
		let dropdown = $('#subject-dropdown');

		dropdown.empty();

		dropdown.append('<option selected="true" disabled>Choose a subject</option>');
		dropdown.prop('selectedIndex', 0);

		const url = 'data/a-level/a-level-subjects.json';

		// Populate dropdown with list of provinces
		$.getJSON(url, function (data) {
		  $.each(data, function (key, entry) {
			dropdown.append($('<option></option>').attr('value', '?subject=' + entry.alias).text(entry.subject_name_clean));
		  });
		  	$('select').formSelect();

		});

	}<!-- runScripts -->
    </script>
					</div>
				</div>
			</div>
			<div class="col l4 s12">
				<ul class="collection">
				  <li class="collection-item">
					  <div id="textContainer"><div>
				  </li>
				  <li class="collection-item">
					<div id="yearContainer"></div>
				  </li>
				  <li class="collection-item">
					<div id="facContainer"></div>
				  </li>
				</ul>
			</div>
		</div>
	</div>
  </div>

<?php include 'inc/footer.php';?>