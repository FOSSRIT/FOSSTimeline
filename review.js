$(function () {
  $.getJSON("contributors.js", function(data) { 
    items = data['items'];
    year = $('span#year').html();
    $('title').html(year + ' Year in Review');
    // Range of dates valid for this year.
    low = year+'-07-01';
    high = (parseInt(year) + 1)+'-08-31';
    details = {};

    $.each(items, function(index, item) {
      if(item['date'] > low && item['date'] < high) {
        type = item['type'].toLowerCase().replace(' ', '_');
        disc = item['discipline'];
        text = item['label'] + ': <a href="' + item['url'] + '">' + item['relationship-detail'] + '</a>';
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
      $.each(value['items'], function(discipline, text_array) {
        section = '<h3>' + discipline + '</h3><ul>';
        $.each(text_array, function(index, text) {
          section += '<li>' + text + '</li>';
        });
        section += '</ul>';
        $('div#' + key + '_list').append(section);
      });
    });
  });
});
