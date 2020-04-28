// Call the dataTables jQuery plugin
var listFilesUrl = "https://amitmahajan-cloud-gmail-chart-test-data.s3.eu-west-2.amazonaws.com/country-data-table.json";
$(document).ready(function () {
  $('#dataTable').DataTable({

    "ajax": {
      "url": listFilesUrl
    },

    "order": [[2, "desc"]],
    "pageLength": 100,
    "columnDefs": [{
      "targets": 0,
      "data": "Country",
      "render": function (data, type, row, meta) {
        return '<img width="30" height="20" src="img/png1000px/' + row[0] + '.png"/>';
      }
    }]


  });
});
