import { Bar } from 'react-chartjs-3';

const BarChart = (props) => {
    const { data } = props;
    //console.log('chart data', data, data.contracts)

    var xValues = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    var yValuesNet = ["1000", "850", "1234", "798", "1000", "850", "1234", "798", "0", "0", "0", "0"]
    var barColorNet = "#3C65A5"
    
    var yValuesOneOff =  ["100", "85", "123", "79", "100", "85", "123", "79", "0", "0", "0", "0"]
    var barColorOneOff = "#C6D0E1"

    var yValuesNetProjections = ["0","0","0","0","0","0","0","0","1000", "850", "1234", "798"]
    var yValuesOneOffProjections = ["0","0","0","0","0","0","0","0","98", "85", "123", "79"]

    var yValuesForTarget = ["450","450","450","450","450","450","450","450","450","450","450","450"]

    var borderRadiusAll = 10;
    var boarderWidthProjections = 2;

    const chartOptions = {
        legend: {
            display: true, 
            position: 'right',
            align: 'start',
            labels: {
                useBorderRadius: true,
                usePointStyle: true
            }
        },
        title: {
            display: false,
            text: "World Wine Production 2018"
        },
        scales: {
            yAxes: [{
                stacked: true,
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: false
                },
            }],
            xAxes: [{
                stacked: true,
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
                beginAtZero: true 
            }]
        },
        elements: {
            point: { //hides circle points on line
                radius: 0
            }
        }
    }

    const chartData = {
        labels: xValues,
        datasets: [
            {
                type: "line",
                pointStyle: false,
                data: yValuesForTarget,
                borderWidth: boarderWidthProjections, 
                label: "Ø monthly target 450k€ ",
                fill: false,
                backgroundColor: "#B42841",
                borderColor: "#B42841",
                order: 1,
                borderDash: [10,10],
                pointStyle: 'line'
            },
            {
                backgroundColor: barColorNet,
                data: yValuesNet,
                borderRadius: borderRadiusAll, //doesnt work in chart.js 2
                borderSkipped: false,
                label: "net gains of total contract gross profit",
                order: 2,
                pointStyle: 'rect'
            },
            {
                backgroundColor: barColorOneOff,
                data: yValuesOneOff,
                borderSkipped: false,
                borderRadius: borderRadiusAll,
                label: "one-off gross profit",
                order: 3,
                pointStyle: 'rect'
            },
            {
                backgroundColor: "white",
                fill: false,
                borderColor: barColorNet,
                borderWidth: boarderWidthProjections,
                borderSkipped: false,
                borderRadius: borderRadiusAll,
                borderDash: [10,10], // doesnt seem to work in chart.js 2
                data: yValuesNetProjections,
                label: "net gains of total contract gross profit forecast",
                order: 4,
                pointStyle: 'rect'
            },
            {
                backgroundColor: "white",
                fill: false,
                borderSkipped: false,
                borderColor: barColorOneOff,
                borderWidth: boarderWidthProjections,
                borderRadius: borderRadiusAll,
                borderDash: [10,10],
                data: yValuesOneOffProjections,
                label: "one-off gross profit forecast",
                order: 5,
                pointStyle: 'rect'
            }
        ]

    }


    return (
        <div className="graph">
            <Bar
                type="bar"
                data={chartData} 
                options={chartOptions}
                
            />
        </div>
    );
        
};

export default BarChart;