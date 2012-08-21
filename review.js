$(function () {
  $.getJSON("contributors.js", function(data) { 
    items = data['items'];
    year = $('span#year').html();
    $('title').html(year + ' Year in Review');
    low = year+'-07-01';
    high = (parseInt(year) + 1)+'-08-31';
    proj = 0; conf = 0; evnt = 0; hktn = 0; pres = 0;
    proj_detail = {}; conf_detail = {}; evnt_detail = {}; hktn_detail = {};
    pres_detail = {};
    $.each(items, function(index, item) {
      if(item['date'] > low && item['date'] < high) {
        type = item['type'];
        disc = item['discipline'];
        text = item['label'] + ': <a href="' + item['url'] + '">' + item['relationship-detail'] + '</a>';
        switch(type) {
          case 'Conference': conf++;
            if(typeof conf_detail[disc] == 'undefined') {
              conf_detail[disc] = [];
            }
            conf_detail[disc].push(text);
            break;
          case 'Event': evnt++;
            if(typeof evnt_detail[disc] == 'undefined') {
              evnt_detail[disc] = [];
            }
            evnt_detail[disc].push(text);
            break;
          case 'Hackathon': hktn++;
            if(typeof hktn_detail[disc] == 'undefined') {
              hktn_detail[disc] = [];
            }
            hktn_detail[disc].push(text);
            break;
          case 'Press': pres++;
            if(typeof pres_detail[disc] == 'undefined') {
              pres_detail[disc] = [];
            }
            pres_detail[disc].push(text);
            break;
          case 'Project Release': proj++;
            if(typeof proj_detail[disc] == 'undefined') {
              proj_detail[disc] = [];
            }
            proj_detail[disc].push(text);
            break;
        }
      }
    });
    $('span#conferences').html(conf);
    $('span#events').html(evnt);
    $('span#hackathons').html(hktn);
    $('span#press').html(pres);
    $('span#projects').html(proj);
    $.each(conf_detail, function(key, values) {
      section = '<h3>' + key + '</h3><ul>';
      $.each(values, function(index, text) {
        section += '<li>' + text + '</li>';
      });
      section += '</ul>';
      $('div#conference_list').append(section);
    });
    $.each(evnt_detail, function(key, values) {
      section = '<h3>' + key + '</h3><ul>';
      $.each(values, function(index, text) {
        section += '<li>' + text + '</li>';
      });
      section += '</ul>';
      $('div#event_list').append(section);
    });
    $.each(hktn_detail, function(key, values) {
      section = '<h3>' + key + '</h3><ul>';
      $.each(values, function(index, text) {
        section += '<li>' + text + '</li>';
      });
      section += '</ul>';
      $('div#hackathon_list').append(section);
    });
    $.each(pres_detail, function(key, values) {
      section = '<h3>' + key + '</h3><ul>';
      $.each(values, function(index, text) {
        section += '<li>' + text + '</li>';
      });
      section += '</ul>';
      $('div#project_list').append(section);
    });
    $.each(proj_detail, function(key, values) {
      section = '<h3>' + key + '</h3><ul>';
      $.each(values, function(index, text) {
        section += '<li>' + text + '</li>';
      });
      section += '</ul>';
      $('div#project_list').append(section);
    });
  });
});
