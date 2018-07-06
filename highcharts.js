Highcharts.setOptions({
    // chart: {     -- not sure why this isn't correct, per https://www.highcharts.com/docs/getting-started/how-to-set-options#2, https://api.highcharts.com/highcharts/plotOptions.series
    //     plotOptions: {
    //         series: {
    //             marker: {
    //                 symbol: 'circle'
    //             }
    //         }
    //     }
    // },
    colors: ['#2daae1', '#e6007e', '#535353'],
    lang: {
      thousandsSep: ',',
      numericSymbols: null
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'circle'
            }
        }
    },
    legend: {
        enabled: false
    },
    xAxis: {
        floor: 2014,
        max: 2018,
        tickInterval: 1
    },
    yAxis: {
        title: {
          enabled: false
        },
        min: 0,
        labels: {   // Use thousands separator for four-digit numbers too
            	formatter: function () {
                	var label = this.axis.defaultLabelFormatter.call(this);
                    if (/^[0-9]{4}$/.test(label)) {
                    	return Highcharts.numberFormat(this.value, 0);
                    }
                    return label;
                }
            }
    },
    exporting: {
          buttons: {
              contextButton: {
                  menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'separator', 'downloadCSV', 'downloadXLS']
              }
          }
      }
});

Highcharts.chart('container', {
    title: {
        text: 'A-Level entries in ' + subject.toLowerCase() + ', 2014-2018'
    },
    subtitle: {
        text: 'Subtitle here'
    },
    data: {
        // enablePolling: true,
        startColumn:2,
        switchRowsAndColumns: true,
        csvURL: window.location.origin + '/a-level.csv',
        beforeParse: function (csv) {
            let arr = csv.split(/\n/)
            let len=arr.length
            let newcsv=""
            if(len>0){
                for(let i=0; i<len; i++){
                    let line=arr.shift()
                    if (i==0 || (line.split(",")[0] == subject && line.split(",")[1] == opt )){
                        newcsv=newcsv.concat(line,/\n/)
                    }
                }
            }
            return newcsv
        }
    }
});
