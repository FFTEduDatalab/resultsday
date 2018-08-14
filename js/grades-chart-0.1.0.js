Highcharts.chart('gradesChartContainer', {
    title: {
        text: level + ' grades in ' + subject_lc + ', 2014-2018'
    },
    subtitle: {
        text: gradesChartSubtitle + '<br>Cumulative percentage attaining named grade or higher'
    },
    colors: gradesChartColoursArray,
    yAxis: {
        ceiling: 100
    },
    tooltip: {
        valueDecimals: 1
    },
    series: gradesData
});
