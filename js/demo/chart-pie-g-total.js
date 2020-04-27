// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';



axios.get('https://amitmahajan-cloud-gmail-chart-test-data.s3.eu-west-2.amazonaws.com/covid-global-count.json').then(response => {
  console.log(" response from api :: ", response.data)

  var myPieChartGTotal = Highcharts.chart('container-g-total', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: {
      text: '',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
    },
    legend: {
      enabled: true,
      itemWidth: 200,
      labelFormatter: function () {
        return this.name + '<br>' + new Intl.NumberFormat('en-EN', { maximumSignificantDigits: 3 }).format(this.y);
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
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
        showInLegend: true,
        innerSize: 100,
        depth: 45
      }
    },
    series: [{
     name: 'Global share',
      data: [
        ['Total Confirmed Cases', response.data.totalConfirmed],
        ['Total Deaths', response.data.totalDeaths],
        ['Total Recovered Cases', response.data.totalRecovered]
      ]
    }]
  });
});
