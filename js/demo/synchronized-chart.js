
$(function () {
    $('#container-sync').bind('mousemove touchmove', function (e) {
        var chart,
        point,
        i;
        for (i = 0; i < Highcharts.charts.length; i = i + 1) {
            chart = Highcharts.charts[i];
            e = chart.pointer.normalize(e); // Find coordinates within the chart
            point = chart.series[0].searchPoint(e, true); // Get the hovered point
            if (point) {
                point.onMouseOver(); // Show the hover marker
                chart.tooltip.refresh(point); // Show the tooltip
                chart.xAxis[0].drawCrosshair(e, point); // Show the crosshair
            }
        }
    });

    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    function syncExtremes(e) {
        var thisChart = this.chart;
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(e.min, e.max);
                }
            }
        });
    }


    $.getJSON('https://amitmahajan-cloud-gmail-chart-test-data.s3.eu-west-2.amazonaws.com/data-sync.json', function (activity) {
        $.each(activity.datasets, function (i, dataset) {
            dataset.data = Highcharts.map(dataset.data, function (val, j) {
                return [val];
            });
            $('<div class="chart">')
                .appendTo('#container-sync')
                .highcharts({
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%y-%m-%d %H:%M'
                    },
                    crosshair: true,
                    events: {
                        setExtremes: syncExtremes
                    },
                    labels: {
                     rotation: -25   
                    }
                },
                title: {
                    text: dataset.name,
                    align: 'left',
                    margin: 0,
                    x: 30
                },
                series: [{
                    pointStart: Date.UTC(2020, 2, 20),
                    pointInterval: 24 * 3600 * 1000, // one day
                    data: dataset.data,
                    name: dataset.name,
                    type: dataset.type,
                    color: Highcharts.getOptions().colors[i],
                    fillOpacity: 0.3,
                    tooltip: {
                        valueSuffix: ' ' + dataset.unit
                    }
                }]
            });
        });
    });
});