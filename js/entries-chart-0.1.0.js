Highcharts.chart('entriesChartContainer', {
    title: {
        text: level + ' entries in ' + subject_lc + ', 2014-2018'
    },
    subtitle: {
        text: entriesChartSubtitle + '<br><em>Number of entries</em>'
    },
    series: entriesData,
    yAxis: {
        max: yMax
	}
});
