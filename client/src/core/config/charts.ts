import { type ApexOptions } from 'apexcharts'

// const colors = ['#4318FF', '#39B8FF', '#FF9F43', '#FF9F43'],
export const colors = ['#6247aa', '#815ac0', '#a06cd5', '#c19ee0', '#dac3e8']
const showGrid = false
const dropShadow= false

export const pieChartOptions: ApexOptions = {
	colors: colors,
	states: {
		hover: {
			filter: {
				type: 'none',
			},
		},
	},
	legend: {
		show: true,
		labels: {
			colors: '#A3AED0'
		}
	},
	dataLabels: {
		enabled: false,
	},
	// hover: { mode: null },
	plotOptions: {
		// donut: {
		// 	expandOnClick: false,
		// 	donut: {
		// 		labels: {
		// 			show: false,
		// 		},
		// 	},
		// },
	},
	fill: {
		colors: colors,
	},
	tooltip: {
		enabled: true,
		theme: 'dark',
	},
}

export const barChartOptions: ApexOptions = {
	chart: {
		stacked: true,
		toolbar: {
			show: false,
		},
		dropShadow: {
            enabled: dropShadow,
            top: 5,
            left: 0,
            blur: 5,
            opacity: 0.1,
            color: '#000000',
        },
	},
	tooltip: {
		style: {
			fontSize: '12px',
			fontFamily: undefined,
		},
		theme: 'dark',
	},
	xaxis: {
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '14px',
				fontWeight: '500',
			},
		},
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
	},
	yaxis: {
		show: true,
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '20px',
				fontWeight: '500',
			},
		},
	},
	grid: {
		borderColor: 'rgba(163, 174, 208, 0.3)',
		show: showGrid,
		yaxis: {
			lines: {
				show: true,
				
				// opacity: 0.5,
			},
		},
		row: {
			opacity: 0.2,
		},
		xaxis: {
			lines: {
				show: false,
			},
		},
	},
	fill: {
		type: 'solid'
	},
	legend: {
		labels: {
            colors: '#A3AED0',
        },
		markers: {
			radius: 100,
			offsetX: -2
		}
	},
	colors: colors,
	dataLabels: {
		enabled: false,
	},
	plotOptions: {
		bar: {
			borderRadius: 10,
			columnWidth: '30px',
		},
	},
}

export const lineChartOptions: ApexOptions = {
    chart: {
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            top: 5,
            left: 0,
            blur: 5,
            opacity: 0.1,
            color: '#000000',
        },
    },
    colors: colors,
    markers: {
        size: 0,
        fillOpacity: 1,
        discrete: [],
        shape: 'circle',
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
    },
    tooltip: {
        theme: 'dark',
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
		width: 4,
    },
    yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: {
          style: {
            colors: '#A3AED0',
            fontSize: '12px',
            fontWeight: '500',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
    },
    xaxis: {
        // type: 'numeric',
        labels: {
          style: {
            colors: '#A3AED0',
            fontSize: '12px',
            fontWeight: '500',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
    },
    grid: {
        show: showGrid,
    },
    legend: {
        labels: {
            colors: '#A3AED0',
        }
    }
}