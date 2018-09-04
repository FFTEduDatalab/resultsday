# :chart_with_upwards_trend: GCSE and A-Level results day analysis
Code powering GCSE and A-Level results analysis from FFT Education Datalab and the Nuffield Foundation, [as featured on our 2018 results microsite](https://results.ffteducationdatalab.org.uk/).

For background to the project, refer to [the _About_ page of the results microsite](https://results.ffteducationdatalab.org.uk/about.php).

## Contents
* `py`: Four Python files, details of which are provided below
* `data`: Data files on which the site is based:
	* `source`: Excel files (`.xls`, `.xlsx`) of entry and grades data for the period 2014-2018 made available by the [Joint Council for Qualifications](https://www.jcq.org.uk/). Filenames take the form `<level>_<year>_<scope>_<grades (GCSE only)>`. Here `scope` refers to the breakdowns by home nation (`UK`, `EN`, `WA`, `NI`), age of entrant (GCSE only; `15`, `16`, `17`) or home nation and age (GCSE only; `EN16` only). `grades` refers to whether datafiles are in terms of A\*-G grades (`ag`), or the key grades at which the 9-1 grade structure and the A*-G grade structure are pegged (`keygrades`).
	* `output`: For each level, four json files:
		* `<level>-entries.json`: Compiled entries data produced by `data_compiler.py`, based on the source data files
		* `<level>-grades.json`: Compiled grades data produced by `data_compiler.py`, based on the source data files
		* `<level>-subjects.json`: A bespoke dataset produced by Datalab, giving subject definitions, flags for whether a subject is an English Baccalaureate subject, is double-counted in Progress 8, or is a facilitating subject, reform dates, and contextual information.
		* `<level>-text.json`: A data file written by the `analysis_writer.py` script, the provides analysis of entry numbers and grades for each subject.

Data files are shaped in the format required for use in [Highcharts](https://www.highcharts.com/) charts.

## Python scripts
**subjects_checker**: Checks completeness in both directions between source files and `-subjects.json` files.

**data_compiler**: Compiles `-entries.json` and `-grades.json` files, with data for all subjects in `-subjects.json` files.

**analysis_writer**: Writes analysis to `-text.json` files for all subjects in `-subjects.json` files with at least one year of entry data. Blank for those with none.

**extract_generator**: Generates a number of bespoke data extracts from the `-entries.json` and `-grades.json` files.

## Instructions
1. Bring in and rename any new source data files, following the naming convention `<level>_<year>_<scope>_<grades (GCSE only)>`
1. `subjects_checker.py`
	1. Update script to look at most recent year for which data is available (see line marked `XXX`)
	1. Run
	1. (If required) update `-subject.json` files
	1. (If required) re-run
1. Run `data_compiler.py`
1. Run `analysis_writer.py`
1. Run `extract_generator.py`

## Licence
* Python scripts are made available here under the MIT licence - see the `LICENSE` file for full details.
* Content of [the results day analysis microsite](https://results.ffteducationdatalab.org.uk/) - for example, written analysis of entry numbers and grades for each subject - is made available under a [Creative Commons attribution licence (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
* Source data is produced by the [Joint Council for Qualifications](https://www.jcq.org.uk/). Questions relating to reuse of the source data should be directed to JCQ.
