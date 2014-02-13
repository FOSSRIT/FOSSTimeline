$(function () {
  $.getJSON("contributors.js", function(data) {
    var items = data['items'];
    var years = [];
    $.each(items, function(index, item) {
        var year = item['date'].split('-')[0];
        if (years.indexOf(year) == -1) {
            years.push(year);
        };
    });
    years.sort();
    $.each(years, function(index, year) {
      $('#year').append("<option value='"+year+"'>"+year+"-"+(parseInt(year)+1)+"</option>");
    });

    // Now that the select has been populated, register the selects
    // and load a summary
    $('#year').click(function() {
      summarize($('#year option:selected').val());
    });
    summarize($('#year option:selected').val());
   });
});

function summarize(year) {
  $.getJSON("contributors.js", function(data) {
    var items = data['items'];
    var types = data['types'];
    $('title').html(year + ' Year in Review');
    // Range of dates valid for this year.
    var low = year+'-07-01';
    var high = (parseInt(year) + 1)+'-08-31';
    var details = {};

    $.each(types, function(type, obj) {
      type = type.toLowerCase().replace(' ', '_');
      details[type] = {};
      details[type]['count'] = 0;
      details[type]['items'] = {}
    });

    $.each(items, function(index, item) {
      if(item['date'] > low && item['date'] < high) {
        var type = item['type'].toLowerCase().replace(' ', '_');
        var disc = item['discipline'];
        var text =  '<a href="' + item['url'] + '">' + item['label'] + '</a>: '  + item['relationship-detail'];
        details[type]['count']++;
        if(typeof details[type]['items'][disc] == 'undefined') {
          details[type]['items'][disc] = [];
        }
        details[type]['items'][disc].push(text);
      }
    });

    $.each(details, function(key, value) {
      console.log(key);
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
