Highcharts.chart('entriesChartContainer', {
    title: {
        text: 'A-Level entries in ' + subject.toLowerCase() + ', 2014-2018'
    },
    subtitle: {
        text: entriesChartSubtitle
    },
    series: entriesData
});
