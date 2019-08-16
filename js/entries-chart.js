Highcharts.chart('entriesChartContainer', {
	title: {
		text: level + ' entries in ' + subject_name_clean_lc + ', ' + yearMin + '-' + Number(yearMin + 4)
	},
	subtitle: {
		text: entriesChartSubtitle + '<br><em>Number of entries</em>'
	},
	colors: entriesChartColoursArray,
	xAxis: {		// set here rather than in theme, so can be set dynamically
		min: yearMin,
		max: yearMin + 4,
		tickInterval: 1
	},
	yAxis: {		// "		"
		max: yMax
	},
	series: entriesData,
	exporting: {
		filename: (level + '-' + subject_name_clean_lc.replace(/br/, '') + '-' + scope + '-entries').replace(/\W+/g, '-').toLowerCase()
	}
});
