Highcharts.chart('gradesChartContainer', {
    title: {
        text: level + ' grades in ' + subject_lc + ', 2014-2018'
    },
    subtitle: {
        text: gradesChartSubtitle + '<br><em>Cumulative percentage attaining grade</em>'
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
