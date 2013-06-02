$(function () {
  summarize($('#year option').val())
  $('#year option').click(function() {
    summarize($(this).val());
  });
});

function summarize(year) {
  $.getJSON("contributors.js", function(data) {
    var items = data['items'];
    $('title').html(year + ' Year in Review');
    // Range of dates valid for this year.
    var low = year+'-07-01';
    var high = (parseInt(year) + 1)+'-08-31';
    var details = {};

    $.each(items, function(index, item) {
      if(item['date'] > low && item['date'] < high) {
        var type = item['type'].toLowerCase().replace(' ', '_');
        var disc = item['discipline'];
        var text = item['label'] + ': <a href="' + item['url'] + '">' + item['relationship-detail'] + '</a>';
        if(typeof details[type] == 'undefined') {
          details[type] = {};
          details[type]['count'] = 0;
          details[type]['items'] = {}
        }
        details[type]['count']++;
        if(typeof details[type]['items'][disc] == 'undefined') {
          details[type]['items'][disc] = [];
        }
        details[type]['items'][disc].push(text);
      }
    });

    $.each(details, function(key, value) {
      $('span#' + key).html(value['count']);
      $('div#' + key + '_list').html('')
      $.each(value['items'], function(discipline, text_array) {
        var section = '<h3>' + discipline + '</h3><ul>';
        $.each(text_array, function(index, text) {
          section += '<li>' + text + '</li>';
        });
        section += '</ul>';
        $('div#' + key + '_list').append(section);
      });
    });
  });
};
