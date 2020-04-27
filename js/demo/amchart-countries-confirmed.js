axios.get('https://amitmahajan-cloud-gmail-chart-test-data.s3.eu-west-2.amazonaws.com/country-time-series.json').then(response => {
   // console.log(" response from api :: ", JSON.stringify(response.data))

    var countryArray = ["united-states", "spain", "italy", "france", "germany", "united-kingdom", "china","singapore", "japan", "india", "brazil", "south-africa", "australia", "russia", "iran", "canada", "mexico"];

    var jsonRes = JSON.parse(JSON.stringify(response.data));
   // console.log("JSON: " + JSON.stringify(jsonRes["united-states"]));

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);
        // Themes end


        // Create chart instance
        var chart = am4core.create("chartdiv1", am4charts.XYChart);

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        for (var i = 0; i < 10; i++) {
           // createSeries("" + i, "Series-ABC #" + i);
        }

        for (c of countryArray) {
            createSeries(c, jsonRes[c]);
        }



        // Create series
        function createSeries(name, data) {
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "count";
            series.dataFields.dateX = "date";
            series.name = name;
            series.tooltipText = "{name}: [bold]{valueY}[/]";

            var segment = series.segments.template;
            segment.interactionsEnabled = true;

            var hoverState = segment.states.create("hover");
            hoverState.properties.strokeWidth = 3;

            var dimmed = segment.states.create("dimmed");
            dimmed.properties.stroke = am4core.color("#dadada");

            segment.events.on("over", function (event) {
                processOver(event.target.parent.parent.parent);
            });

            segment.events.on("out", function (event) {
                processOut(event.target.parent.parent.parent);
            });
            //console.log("--- Start ---");
            // console.log(JSON.stringify(data));
            // console.log("--- End ---");
            series.data = data;
            return series;
        }

        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";
        chart.legend.scrollable = true;
        chart.legend.itemContainers.template.events.on("over", function (event) {
            processOver(event.target.dataItem.dataContext);
        })

        chart.legend.itemContainers.template.events.on("out", function (event) {
            processOut(event.target.dataItem.dataContext);
        })


        // Add cursor
        chart.cursor = new am4charts.XYCursor();




        function processOver(hoveredSeries) {
            hoveredSeries.toFront();

            hoveredSeries.segments.each(function (segment) {
                segment.setState("hover");
            })

            chart.series.each(function (series) {
                if (series != hoveredSeries) {
                    series.segments.each(function (segment) {
                        segment.setState("dimmed");
                    })
                    series.bulletsContainer.setState("dimmed");
                }
            });
        }

        function processOut(hoveredSeries) {
            chart.series.each(function (series) {
                series.segments.each(function (segment) {
                    segment.setState("default");
                })
                series.bulletsContainer.setState("default");
            });
        }

    }); // end am4core.ready()

});





axios.get('https://amitmahajan-cloud-gmail-chart-test-data.s3.eu-west-2.amazonaws.com/country-time-series-by-day.json').then(response => {
   // console.log(" response from api :: ", JSON.stringify(response.data))

    var countryArray = ["united-states", "spain", "italy", "france", "germany", "united-kingdom", "china","singapore", "japan", "india", "brazil", "south-africa", "australia", "russia", "iran", "canada", "mexico"];

    var jsonRes = JSON.parse(JSON.stringify(response.data));
  //  console.log("JSON: " + JSON.stringify(jsonRes["united-states"]));

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);
        // Themes end


        // Create chart instance
        var chart = am4core.create("chartdiv2", am4charts.XYChart);

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        for (var i = 0; i < 10; i++) {
           // createSeries("" + i, "Series-ABC #" + i);
        }

        for (c of countryArray) {
            createSeries(c, jsonRes[c]);
        }



        // Create series
        function createSeries(name, data) {
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "count";
            series.dataFields.dateX = "date";
            series.name = name;
            series.tooltipText = "{name}: [bold]{valueY}[/]";

            var segment = series.segments.template;
            segment.interactionsEnabled = true;

            var hoverState = segment.states.create("hover");
            hoverState.properties.strokeWidth = 3;

            var dimmed = segment.states.create("dimmed");
            dimmed.properties.stroke = am4core.color("#dadada");

            segment.events.on("over", function (event) {
                processOver(event.target.parent.parent.parent);
            });

            segment.events.on("out", function (event) {
                processOut(event.target.parent.parent.parent);
            });
            //console.log("--- Start ---");
            // console.log(JSON.stringify(data));
            // console.log("--- End ---");
            series.data = data;
            return series;
        }

        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";
        chart.legend.scrollable = true;
        chart.legend.itemContainers.template.events.on("over", function (event) {
            processOver(event.target.dataItem.dataContext);
        })

        chart.legend.itemContainers.template.events.on("out", function (event) {
            processOut(event.target.dataItem.dataContext);
        })


        // Add cursor
        chart.cursor = new am4charts.XYCursor();




        function processOver(hoveredSeries) {
            hoveredSeries.toFront();

            hoveredSeries.segments.each(function (segment) {
                segment.setState("hover");
            })

            chart.series.each(function (series) {
                if (series != hoveredSeries) {
                    series.segments.each(function (segment) {
                        segment.setState("dimmed");
                    })
                    series.bulletsContainer.setState("dimmed");
                }
            });
        }

        function processOut(hoveredSeries) {
            chart.series.each(function (series) {
                series.segments.each(function (segment) {
                    segment.setState("default");
                })
                series.bulletsContainer.setState("default");
            });
        }

    }); // end am4core.ready()

});