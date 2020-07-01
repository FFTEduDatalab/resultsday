var x,
	y;

Highcharts.theme = {
	chart: {
		animation: false,		// animation upon update - which leads to lines and axes etc. sliding around
		events: {
			load: function () {
				x = this.chartWidth - 130;
				y = this.chartHeight - 35;
				if (this.chartWidth >= 400) {
					this.renderer.image('https://ffteducationdatalab.org.uk/wp-content/uploads/2018/03/fft_education_datalab_logo_lo.png', x, y, 125, 30)
						.attr('class', 'datalab-logo')
						.on('click' , function () {location.href = 'https://ffteducationdatalab.org.uk';})
						.add();
				}
			},
			redraw: function () {
				if (this.chartWidth - 130 != x) {		// chart has changed width
					x = this.chartWidth - 130;
					y = this.chartHeight - 35;
					if (document.getElementsByClassName('datalab-logo')) {
						var elements = document.getElementsByClassName('datalab-logo');
						while (elements.length > 0) {
							elements[0].parentNode.removeChild(elements[0]);		// yep
						}
					}
					if (this.chartWidth >= 400) {
						this.renderer.image('https://ffteducationdatalab.org.uk/wp-content/uploads/2018/03/fft_education_datalab_logo_lo.png', x, y, 120, 30)
							.attr('class', 'datalab-logo')
							.on('click' , function () {location.href = 'https://ffteducationdatalab.org.uk';})
							.add();
					}
				}
			}
		},
		height: 500,
		spacingBottom: 40,
		style: {
			fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
		},
	},
	title: {
		style: {
			fontSize: '18px'
		}
	},
	subtitle: {
		style: {
			fontSize: '16px',
			color: '#333333'
		},
	},
	lang: {
		thousandsSep: ',',
		numericSymbols: null,
		contextButtonTitle: 'Menu'
	},
	plotOptions: {
		series: {
			animation: false,
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
	exporting: {
		buttons: {
			contextButton: {
				menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'separator', 'downloadCSV']
			}
		}
	},
	credits: {
		href: null,
		position: {
			align: 'left',
			x: 5,
			y: -20
		},
		text: 'Source: FFT Education Datalab analysis of JCQ data<br>Project funded by the Nuffield Foundation'
	}
};
