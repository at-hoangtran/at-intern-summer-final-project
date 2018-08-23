var easypiechart_data = {
  initOnLoad: function() {
    easypiechart_data.set_data_order();
    easypiechart_data.set_data_auction();
    easypiechart_data.set_data_member();
    easypiechart_data.set_data_online();
    easypiechart_data.style_charts();
  },
  set_data_order: function() {
    order = easypiechart_data.request_order();
    $('#order-eas').html(order);
  },
  set_data_auction: function() {
    auction = easypiechart_data.request_auction();
    $('#auction-eas').html(auction);
  },
  set_data_member: function() {
    member = easypiechart_data.request_member();
    $('#member-eas').html(member);
  },
  set_data_online: function() {
    online = easypiechart_data.request_online();
    $('#online-eas').html(online);
  },
  request_order: function() {
    charts = null
    $.ajax({
      url: '/admin/request_order',
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
  },
  request_auction: function() {
    charts = null
    $.ajax({
      url: '/admin/request_auction',
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
  },
  request_member: function() {
    charts = null
    $.ajax({
      url: '/admin/request_member',
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
  },
  request_online: function() {
    charts = null
    $.ajax({
      url: '/admin/request_online',
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
  },
  style_charts: function() {
    $('#easypiechart-teal').easyPieChart({
      scaleColor: false,
      barColor: '#1ebfae'
    });

    $('#easypiechart-orange').easyPieChart({
      scaleColor: false,
      barColor: '#ffb53e'
    });

    $('#easypiechart-red').easyPieChart({
      scaleColor: false,
      barColor: '#f9243f'
    });

    $('#easypiechart-blue').easyPieChart({
      scaleColor: false,
      barColor: '#30a5ff'
    });
  }
}

$(document).on('turbolinks:load', function() {
  easypiechart_data.initOnLoad();
});
