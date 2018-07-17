Highcharts.theme = {
    colors: ['#2daae1', '#96c11f', '#535353'],
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
};
