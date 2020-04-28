var sortBy = (function () {
    var toString = Object.prototype.toString,
        // default parser function
        parse = function (x) { return x; },
        // gets the item to be sorted
        getItem = function (x) {
            var isObject = x != null && typeof x === "object";
            var isProp = isObject && this.prop in x;
            return this.parser(isProp ? x[this.prop] : x);
        };

    /**
     * Sorts an array of elements.
     *
     * @param {Array} array: the collection to sort
     * @param {Object} cfg: the configuration options
     * @property {String}   cfg.prop: property name (if it is an Array of objects)
     * @property {Boolean}  cfg.desc: determines whether the sort is descending
     * @property {Function} cfg.parser: function to parse the items to expected type
     * @return {Array}
     */
    return function sortby(array, cfg) {
        if (!(array instanceof Array && array.length)) return [];
        if (toString.call(cfg) !== "[object Object]") cfg = {};
        if (typeof cfg.parser !== "function") cfg.parser = parse;
        cfg.desc = !!cfg.desc ? -1 : 1;
        return array.sort(function (a, b) {
            a = getItem.call(cfg, a);
            b = getItem.call(cfg, b);
            return cfg.desc * (a < b ? -1 : +(a > b));
        });
    };

}());

axios.get('https://amitmahajan-cloud-gmail-chart-test-data.s3.eu-west-2.amazonaws.com/global-time-series.json').then(response => {
    console.log(" response from api :: ", JSON.stringify(response.data))

    am4core.ready(function () {


        // Themes begin
        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        //

        // Increase contrast by taking evey second color
        chart.colors.step = 2;

        // Add data
        chart.data = generateChartData();

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        // Create series
        function createAxisAndSeries(field, name, opposite, bullet) {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            if (chart.yAxes.indexOf(valueAxis) != 0) {
                valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
            }

            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = "date";
            series.strokeWidth = 2;
            series.yAxis = valueAxis;
            series.name = name;
            series.tooltipText = "{name}: [bold]{valueY}[/]";
            series.tensionX = 0.8;
            series.showOnInit = true;

            var interfaceColors = new am4core.InterfaceColorSet();

            switch (bullet) {
                case "triangle":
                    var bullet = series.bullets.push(new am4charts.Bullet());
                    bullet.width = 2;
                    bullet.height = 2;
                    bullet.horizontalCenter = "middle";
                    bullet.verticalCenter = "middle";

                    var triangle = bullet.createChild(am4core.Triangle);
                    triangle.stroke = interfaceColors.getFor("background");
                    triangle.strokeWidth = 2;
                    triangle.direction = "top";
                    triangle.width = 2;
                    triangle.height = 2;
                    break;
                case "rectangle":
                    var bullet = series.bullets.push(new am4charts.Bullet());
                    bullet.width = 2;
                    bullet.height = 2;
                    bullet.horizontalCenter = "middle";
                    bullet.verticalCenter = "middle";

                    var rectangle = bullet.createChild(am4core.Rectangle);
                    rectangle.stroke = interfaceColors.getFor("background");
                    rectangle.strokeWidth = 2;
                    rectangle.width = 2;
                    rectangle.height = 2;
                    break;
                default:
                    var bullet = series.bullets.push(new am4charts.CircleBullet());
                    bullet.circle.stroke = interfaceColors.getFor("background");
                    bullet.circle.strokeWidth = 2;
                    
                    break;
            }

            valueAxis.renderer.line.strokeOpacity = 1;
            valueAxis.renderer.line.strokeWidth = 2;
            valueAxis.renderer.line.stroke = series.stroke;
            valueAxis.renderer.labels.template.fill = series.stroke;
            valueAxis.renderer.opposite = opposite;
        }

        createAxisAndSeries("confirmed", "Confirmed Cases", false, "circle");
        createAxisAndSeries("deaths", "Deaths", true, "triangle");
        createAxisAndSeries("recoveries", "Recoveries", true, "rectangle");

        // Add legend
        chart.legend = new am4charts.Legend();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        // generate some random data, quite different range
        function generateChartData() {

            return sortBy(response.data, {
                prop: "date",
                desc: true,
                parser: function (item) {
                    //ignore case sensitive
                    return item.toUpperCase();
                }
            });;

        }

    }); // end am4core.ready()
});




axios.get('https://amitmahajan-cloud-gmail-chart-test-data.s3.eu-west-2.amazonaws.com/global-time-series-day.json').then(response => {
    console.log(" response from api :: ", JSON.stringify(response.data))

    am4core.ready(function () {


        // Themes begin
        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv1", am4charts.XYChart);

        //

        // Increase contrast by taking evey second color
        chart.colors.step = 2;

        // Add data
        chart.data = generateChartData();

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        // Create series
        function createAxisAndSeries(field, name, opposite, bullet) {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            if (chart.yAxes.indexOf(valueAxis) != 0) {
                valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
            }

            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = "date";
            series.strokeWidth = 2;
            series.yAxis = valueAxis;
            series.name = name;
            series.tooltipText = "{name}: [bold]{valueY}[/]";
            series.tensionX = 0.8;
            series.showOnInit = true;

            var interfaceColors = new am4core.InterfaceColorSet();

            switch (bullet) {
                case "triangle":
                    var bullet = series.bullets.push(new am4charts.Bullet());
                    bullet.width = 12;
                    bullet.height = 12;
                    bullet.horizontalCenter = "middle";
                    bullet.verticalCenter = "middle";

                    var triangle = bullet.createChild(am4core.Triangle);
                    triangle.stroke = interfaceColors.getFor("background");
                    triangle.strokeWidth = 2;
                    triangle.direction = "top";
                    triangle.width = 2;
                    triangle.height = 2;
                    break;
                case "rectangle":
                    var bullet = series.bullets.push(new am4charts.Bullet());
                    bullet.width = 10;
                    bullet.height = 10;
                    bullet.horizontalCenter = "middle";
                    bullet.verticalCenter = "middle";

                    var rectangle = bullet.createChild(am4core.Rectangle);
                    rectangle.stroke = interfaceColors.getFor("background");
                    rectangle.strokeWidth = 2;
                    rectangle.width = 2;
                    rectangle.height = 2;
                    break;
                default:
                    var bullet = series.bullets.push(new am4charts.CircleBullet());
                    bullet.circle.stroke = interfaceColors.getFor("background");
                    bullet.circle.strokeWidth = 2;
                    break;
            }

            valueAxis.renderer.line.strokeOpacity = 1;
            valueAxis.renderer.line.strokeWidth = 2;
            valueAxis.renderer.line.stroke = series.stroke;
            valueAxis.renderer.labels.template.fill = series.stroke;
            valueAxis.renderer.opposite = opposite;
        }

        createAxisAndSeries("confirmed", "Confirmed Cases", false, "circle");
        createAxisAndSeries("deaths", "Deaths", true, "triangle");
        createAxisAndSeries("recoveries", "Recoveries", true, "rectangle");

        // Add legend
        chart.legend = new am4charts.Legend();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        // generate some random data, quite different range
        function generateChartData() {

            return sortBy(response.data, {
                prop: "date",
                desc: true,
                parser: function (item) {
                    //ignore case sensitive
                    return item.toUpperCase();
                }
            });;

        }

    }); // end am4core.ready()
});