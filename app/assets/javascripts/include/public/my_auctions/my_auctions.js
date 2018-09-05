var my_auctions = {
  initOnLoad: function() {
    my_auctions.event_tab_current();
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href");
      if (target === '#auction_current') {
        my_auctions.event_tab_current();
      }

      if (target === '#auction_win') {
        my_auctions.event_tab_win();
      }

      if (target === '#auction_loser') {
        my_auctions.event_tab_loser();
      }
    });
  },
  event_tab_current: function() {
    var html = '';
    var template = $('#data-current-auction').html();
    data = my_auctions.request_current();
    if (template) {
      $.each(data, function (i, item) {
        html += Mustache.render(template, {
          ID: item.id,
          NAME: item.name,
          BIXMAX: formatPrice(item.bidmax) + " đ",
          PRICE: formatPrice(item.bid) + " đ",
          DATETIME: my_auctions.formatDateTime(item.created_at),
          STATUS: (item.bid == item.bidmax),
          STATUS1: (item.bid < item.bidmax)
        });
      });
    }
    $('.load-current-auction').html(html);
  },
  event_tab_win: function() {
    var html = '';
    var template = $('#data-win-auction').html();
    data = my_auctions.request_win();
    if (template) {
      $.each(data, function (i, item) {
        html += Mustache.render(template, {
          ID: item.id,
          NAME: item.name,
          PRICE: formatPrice(item.bid) + " đ",
          DATETIME: my_auctions.formatDateTime(item.created_at)
        });
      });
    }
    $('.load-win-auction').html(html);
  },
  event_tab_loser: function() {
    var html = '';
    var template = $('#data-loser-auction').html();
    data = my_auctions.request_loser();
    if (template) {
      $.each(data, function (i, item) {
        html += Mustache.render(template, {
          ID: item.id,
          NAME: item.name,
          MINPRICE: formatPrice(item.bid) + " đ",
          MAXPRICE: formatPrice(item.bidmax) + " đ",
          DATETIME: my_auctions.formatDateTime(item.created_at)
        });
      });
    }
    $('.load-loser-auction').html(html);
  },
  request_current: function() {
    data = null;
    $.ajax({
      url: '/auction_current',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
        data = response;
      },
      error: function (err) {
        console.log(err);
      }
    });
    return data;
  },
  request_win: function() {
    data = null;
    $.ajax({
      url: '/auction_win',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
        data = response;
      },
      error: function (err) {
        console.log(err);
      }
    });
    return data;
  },
  request_loser: function() {
    data = null;
    $.ajax({
      url: '/auction_loser',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
        data = response;
      },
      error: function (err) {
        console.log(err);
      }
    });
    return data;
  },
  formatDateTime: function(datetime) {
    var date = new Date(datetime);
    dateTime = moment(date).format("DD-MM-YYYY HH:mm:ss");
    return dateTime;
  }
}

$(document).ready(function() {
  my_auctions.initOnLoad();
});
