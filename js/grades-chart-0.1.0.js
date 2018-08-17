Highcharts.chart('gradesChartContainer', {
    title: {
        text: level + ' grades in ' + subject_lc + ', 2014-2018'
    },
    subtitle: {
        text: gradesChartSubtitle + '<br>Cumulative percentage attaining grade'
    },
    colors: gradesChartColoursArray,
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
