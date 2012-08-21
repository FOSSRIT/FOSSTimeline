#!/usr/bin/env python

from datetime import date
import json

from gi.repository import Gtk

class ContribWindow(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self)

        top = Gtk.VBox()

        self.choose_type = Gtk.ComboBoxText()
        top.add(self.choose_type)

        self.discipline = Gtk.Entry()
        top.add(self.discipline)

        self.label = Gtk.Entry()
        top.add(self.label)

        self.date = Gtk.Calendar()
        top.add(self.date)

        self.detail = Gtk.Entry()
        top.add(self.detail)

        self.url = Gtk.Entry()
        top.add(self.url)

        done = Gtk.Button("Done!")
        done.connect('clicked', self.save_JSON)
        top.add(done)

        self.add(top)

    def setup(self):
        with open('contributors.js') as file_:
            self.JSON_data = json.load(file_)
        for type_name in self.JSON_data['types']:
            self.choose_type.append_text(type_name)
        self.clear_text()

    def save_JSON(self, widget):
        new_event = {
           "type": "choose_type",
           "label": "label",
           "discipline": "discipline",
           "date": "date",
           "relationship": "choose_type",
           "relationship-detail": "detail",
           "imageURL": "choose_type",
           "url": "url",
        }
        for bit, bat in new_event.items():
            widget = getattr(self, bat)
            if isinstance(widget, Gtk.ComboBoxText):
                bat = widget.get_active_text()
            elif isinstance(widget, Gtk.Entry):
                bat = widget.get_text()
            elif isinstance(widget, Gtk.Calendar):
                date_bits = list(widget.get_date())
                date_bits[1] += 1
                bat = str(date(*date_bits))
            if bit == 'imageURL':
                bat = bat.lower() + '.png'
            new_event[bit] = bat
        self.JSON_data['items'].append(new_event)

        with open('contributors.js', 'w') as file_:
            json.dump(self.JSON_data, file_, indent=4)
        self.clear_text()

    def clear_text(self):
        self.choose_type.set_active(1)
        self.discipline.set_text('subtype')
        self.label.set_text('label')
        self.detail.set_text('details')
        self.url.set_text('http://')


if __name__ == '__main__':
    win = ContribWindow()
    win.setup()
    win.connect("delete-event", Gtk.main_quit)
    win.show_all()
    Gtk.main()
