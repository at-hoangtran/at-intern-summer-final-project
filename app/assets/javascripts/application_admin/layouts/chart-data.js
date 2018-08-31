var chart_data = {
	initOnLoad: function() {
		chart_data.set_data_chart();
		chart_data.request_order();
	},
	set_data_chart: function() {
		chars = chart_data.request_order().reverse();
		var lineChartData = {
			labels: [
				// I18n.t("javascripts.application_admin.layouts.chart-data.monday"),
				// I18n.t("javascripts.application_admin.layouts.chart-data.tuesday"),
				// I18n.t("javascripts.application_admin.layouts.chart-data.wednesday"),
				// I18n.t("javascripts.application_admin.layouts.chart-data.thursday"),
				// I18n.t("javascripts.application_admin.layouts.chart-data.friday"),
				// I18n.t("javascripts.application_admin.layouts.chart-data.saturday"),
				// I18n.t("javascripts.application_admin.layouts.chart-data.sunday")
        'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'
			],
			datasets: [{
				label: "My Second dataset",
				fillColor: "rgba(48, 164, 255, 0.2)",
				strokeColor: "rgba(48, 164, 255, 1)",
				pointColor: "rgba(48, 164, 255, 1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(48, 164, 255, 1)",
				data: chars
			}]
		}
		chart_data.render_chart(lineChartData);
	},
	render_chart: function(lineChartData) {
		var chart = document.getElementById("line-chart")
		if (chart !== null) {
			chart = chart.getContext("2d");
			window.myLine = new Chart(chart).Line(lineChartData, {
				responsive: true
			});
		}
	},
	request_order: function(){
		charts = null
    $.ajax({
      url: '/admin/chart_order',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
      	charts = response
      },
      error: function (err) {
        console.log(err);
      }
    });
    return charts;
	}
}

$(document).on('turbolinks:load', function() {
	chart_data.initOnLoad();
});
