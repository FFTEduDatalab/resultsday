Highcharts.chart('entriesChartContainer', {
    title: {
        text: level + ' entries in ' + subject_lc + ', 2014-2018'
    },
    subtitle: {
        text: entriesChartSubtitle + '<br>Number of entries'
    },
    series: entriesData,
    yAxis: {
        max: yMax
	}
});
