// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

axios.get('https://amitmahajan-cloud-gmail-chart-test-data.s3.eu-west-2.amazonaws.com/covid-global-count.json').then(response => {
  console.log(" response from api :: ", response.data)

  // Radialize the colors
  Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
      return {
        radialGradient: {
          cx: 0.5,
          cy: 0.3,
          r: 0.7
        },
        stops: [
          [0, color],
          [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
        ]
      };
    })
  });

  var myPieChartGNew = Highcharts.chart('container-g-new', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: '',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    legend: {
      enabled: true,
      itemWidth: 200,
      labelFormatter: function() {
        return this.name + '<br>' + new Intl.NumberFormat('en-EN', { maximumSignificantDigits: 3 }).format(this.y);
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%',
        showInLegend: true,
      },
      showInLegend: true
    },
    series: [{
      type: 'pie',
      name: 'Global share',
      data: [
        ['New Confirmed Cases', response.data.newConfirmed],
        ['New Deaths', response.data.newDeaths],
        ['New Recovered Cases', response.data.newRecovered]
      ]
    }]
  });
});
