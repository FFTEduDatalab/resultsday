Highcharts.chart('gradesChartContainer', {
    title: {
        text: level + ' grades in ' + subject_lc + ', ' + yearMin + '-' + yearMax
    },
    subtitle: {
        text: gradesChartSubtitle + '<br><em>Cumulative percentage attaining grade</em>'
    },
    colors: gradesChartColoursArray,
    xAxis: {		// set here rather than in theme, so can be set dynamically
        min: yearMin,
        max: yearMin+4,
        tickInterval: 1
    },
	yAxis: {
        ceiling: 100
    },
    tooltip: {
        valueDecimals: 1
    },
    series: gradesData,
	exporting: {
		filename: (level + '-' + subject + '-' + scope + '-' + gender + '-' + grades + '-grades').replace(/\W+/g, '-').toLowerCase()
	}
});
