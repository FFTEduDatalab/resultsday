Highcharts.theme = {
	chart: {
		style: {
			fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
		},
		height:500,
		spacingBottom: 25
	},
	title: {
		style: {
			fontSize:'18px'
		}
	},
	subtitle: {
		style: {
			fontSize:'16px',
			color:'#333333'
		},
	},
    colors: ['#2daae1', '#96c11f', '#535353'],
    lang: {
      thousandsSep: ',',
      numericSymbols: null,
	  contextButtonTitle: 'Menu'
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
    yAxis: {
        title: {
          enabled: false
        },
        min: 0,
		allowDecimals: false,
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
    responsive: {
        rules: [{
            condition: {
				maxWidth: 400,
            },
            chartOptions: {
				credits:{
					href: 'http://results.ffteducationdatalab.org.uk',
					text: 'Source: http://results.ffteducationdatalab.org.uk'
				}
            }
        }]
    },
	exporting: {
          buttons: {
				contextButton: {
					menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'separator', 'downloadCSV']
				}
        }
	},
	credits:{
		href: 'http://results.ffteducationdatalab.org.uk',
		text: 'Source: FFT Education Datalab analysis of JCQ data. Funded by the Nuffield Foundation.'
	}
};
