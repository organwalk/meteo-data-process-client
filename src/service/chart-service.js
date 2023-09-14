import * as echarts from "echarts";

export function getADayMeteoChart(meteoDataList) {
    const myChart = echarts.init(document.getElementById('aDayMeteoChart'));
    myChart.setOption({
        xAxis: {
            type: 'category',
            data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
                '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
                '19:00', '20:00', '21:00', '22:00', '23:00']
        },
        yAxis: {
            type: 'value'
        },
        series: meteoDataList.map(data => ({
            data: data.data,
            type: 'line',
            smooth: true,
            symbol: 'none',
            name: data.name
        })),
        grid: {
            left: '4%',
            right: '0%',
            top: '10%',
            bottom: '7%'
        },
        tooltip: {
            trigger: 'axis',
            extraCssText: 'border-radius: 15px;width: 120px; height: 80px;padding:20px;',
            formatter: function (params) {
                let result = '';
                params.forEach(item => {
                    result += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span><span style="font-size: 12px;">${item.seriesName}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.value}</span><br>`;
                });
                return `<span style="font-size: 16px;font-weight: bolder;">${params[0].name}</span><br/><span style="font-size: 5px;color: #b2b2b2">Detail</span><br/>${result}`;
            }
        },
    })
}


export function getCorrelationChart() {
    const myChart = echarts.init(document.getElementById('correlationChart'));
    const data = [[1.0, 0.55, 0.0, 0.0, 0.0, 0.18, -0.43, 0.0], [0.55, 1.0, 0.0, 0.0, 0.0, -0.01, -0.56, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.18, -0.01, 0.0, 0.0, 0.0, 1.0, 0.15, 0.0], [-0.43, -0.56, 0.0, 0.0, 0.0, 0.15, 1.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]]
    const labels = ['温度', '湿度', '风速', '风向', '降雨', '光照', 'PM25', 'PM10'];
    const seriesData = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            seriesData.push({
                name: labels[i] + ' - ' + labels[j],
                value: [i, j, data[i][j]]
            });
        }
    }
    myChart.setOption({
        xAxis: {
            type: 'category',
            data: labels
        },
        yAxis: {
            type: 'category',
            data: labels
        },
        visualMap: {
            min: -1,
            max: 1,
            calculable: true,
            orient: 'vertical',
            left: 'right',
            top: 'center'
        },
        series: [{
            type: 'heatmap',
            data: seriesData,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });
}