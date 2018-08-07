Highcharts.chart('entriesChartContainer', {
    title: {
        text: level + ' entries in ' + subject + ', 2014-2018'
    },
    subtitle: {
        text: entriesChartSubtitle
    },
    series: entriesData
});
