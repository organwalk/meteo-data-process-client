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