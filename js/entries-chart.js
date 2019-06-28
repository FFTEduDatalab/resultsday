Highcharts.chart('entriesChartContainer', {
    title: {
        text: level + ' entries in ' + subject_lc + ', ' + yearMin + '-' + yearMax
    },
    subtitle: {
        text: entriesChartSubtitle + '<br><em>Number of entries</em>'
    },
    xAxis: {		// set here rather than in theme, so can be set dynamically
        min: yearMin,
        max: yearMin+4,
        tickInterval: 1
    },
	yAxis: {		// "		"
        max: yMax
	},
    series: entriesData,
	exporting: {
		filename: (level + '-' + subject + '-' + scope + '-entries').replace(/\W+/g, '-').toLowerCase()
	}
});
