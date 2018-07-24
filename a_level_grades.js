Highcharts.chart('gradesChartContainer', {
    title: {
        text: 'A-Level grades in ' + subject.toLowerCase() + ', 2014-2018'
    },
    subtitle: {
        text: gradesChartSubtitle
    },
    colors: gradesChartColoursArray,
    yAxis: {
        ceiling: 100
    },
    // data: {
    //     // enablePolling: true,
    //     startColumn:3,
    //     endColumn:9,
    //     csvURL: window.location.origin + '/a-level/a-level-grades.csv',
    //     beforeParse: function (csv) {
    //         let arr = csv.split(/\n/)
    //         let len=arr.length
    //         let newcsv=""
    //         if(len>0){
    //             for(let i=0; i<len; i++){
    //                 let line=arr.shift()
    //                 if (i==0 || (line.split(",")[0] == subject && line.split(",")[1] == scope && line.split(",")[2] == gender)){
    //                     newcsv=newcsv.concat(line,/\n/)
    //                 }
    //             }
    //         }
    //         return newcsv
    //     }
    // }
	series: dataObject
});
