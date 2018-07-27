Highcharts.chart('gradesChartContainer', {
    title: {
        text: level + ' grades in ' + subject.toLowerCase() + ', 2014-2018'
    },
    subtitle: {
        text: gradesChartSubtitle
    },
    colors: gradesChartColoursArray,
    yAxis: {
        ceiling: 100
    },
    series: gradesData
});
