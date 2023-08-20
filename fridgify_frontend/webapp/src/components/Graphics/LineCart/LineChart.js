import { Line } from 'react-chartjs-3';

const LineChart = (props) => {
    const { data } = props;
    console.log('chart data', data)

    function generateXValues(i1, i2, step = 1) {
        var xValues = []
        for (let x = i1; x <= i2; x += step) {
          xValues.push(x);
        }
        return xValues
      }

    const xValues = generateXValues(data[0].realised*0.8, data[0].validated, 100000)

    var yValuesSilver = Object.values(xValues).map((value) => { return (value-900000)*0.02})
    var barColorSilver = "#3C65A5"

    var yValuesGold = []
    var barColorGold = "#C6D0E1"

    // generateData("(x- 1100000) * 0.03 ", data[0].realised*0.8, data[0].validated, 100000, xValuesGold, yValuesGold);

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
            text: ""
        },
        scales: {
            yAxes: [{
                stacked: true,
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: false
                },
                beginAtZero: true 
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
                data: yValuesSilver,
                borderWidth: boarderWidthProjections, 
                label: "Silver incentive ",
                backgroundColor: barColorSilver,
                borderColor: "#fff",
                order: 1,
                pointStyle: 'line'
            },
            {
                type: "line",
                pointStyle: false,
                data: yValuesGold,
                borderWidth: 0, 
                label: "Gold incentive ",
                backgroundColor: barColorGold,
                borderColor: "",
                order: 2,
                pointStyle: 'line'
            }   
        ]

    }


    return (
        <div className="graph">
            <Line
                type="line"
                data={chartData} 
                options={chartOptions}
                
            />
        </div>
    );
        
};

export default LineChart;