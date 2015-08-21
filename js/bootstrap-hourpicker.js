!function ( $ ) {

    var selector = '[data-hourpicker]',
        all = [];

    function clearHourPickers(except) {
        var ii;
        for(ii = 0; ii < all.length; ii++) {
            if(all[ii] != except) {
                all[ii].hide();
            }
        }
    }

    function HourPicker( element, options ) {
        this.$el = $(element);
        console.log(this.$el);
        this.proxy('show').proxy('hide').proxy('keyHandler').proxy('selectHours');

        var options = $.extend({}, $.fn.hourpicker.defaults, options );


        $.extend(this, options);
        this.$el.data('hourpicker', this);
        this.$el.addClass('hasHourPicker');
        all.push(this);
        this.init();



    }

    HourPicker.prototype = {

        init: function() {

            hourTable = $("<div>").addClass('hourTable');
            // Populate day of week headers, realigned by startOfWeek.
            this.$hours = $('<div>').addClass('hours');
            for (var i = 0; i < this.hourNames.length; i++) {
                var $hour = $('<div>').attr('hour', this.hourNames[i]);
                $hour.text(this.hourNames[i]);
                this.$hours.append($hour);
            };


            hourTable.append(this.$hours);

            this.$picker = $('<div>')
                .click(function(e) { e.stopPropagation() })
                // Use this to prevent accidental text selection.
                .mousedown(function(e) { e.preventDefault() })
                .addClass('hourpicker')
                .append(hourTable)
                .insertAfter(this.$el);

            this.$el
                .focus(this.show)
                .click(this.show)
                .change($.proxy(function() { this.selectHours(); }, this));

            $('div', this.$hours).click($.proxy(function(e) {
                var $targ = $(e.target);
                $targ.toggleClass('selected');
                // The date= attribute is used here to provide relatively fast
                // selectors for setting certain date cells.

                var hr = [];
                $(this.$hours.find('.selected')).each(function (idx, elt) {
                    hr.push($(elt).attr('hour'));
                });
                console.log(hr);


                this.update(hr.join(','));


            }, this));

            //this.selectHours();
            //this.hide();

        }

        , selectHours: function(date) {
            if (typeof(hour) == "undefined") {
                hour = this.parse(this.$el.val());
            };
            this.selectedHourStr = hour;
        }

        , update: function(s) {
            this.$el.val(s).change();
        }

        , show: function(e) {
            e && e.stopPropagation();

            // Hide all other datepickers.
            clearHourPickers(this);

            var offset = this.$el.offset();

            this.$picker.css({
                top: offset.top + this.$el.outerHeight() + 2,
                left: offset.left
            }).show();

            $('html').on('keydown', this.keyHandler);
        }

        , hide: function() {
            this.$picker.hide();
            $('html').off('keydown', this.keyHandler);
        }

        , keyHandler: function(e) {
            // Keyboard navigation shortcuts.
            switch (e.keyCode)
            {
                case 9:
                case 27:
                    // Tab or escape hides the datepicker. In this case, just return
                    // instead of breaking, so that the e doesn't get stopped.
                    this.hide(); return;
                case 13:
                    // Enter selects the currently highlighted date.
                    this.update(this.selectedHourStr); this.hide(); break;
                case 38:
                    // Arrow up goes to prev week.
                    this.ahead(0, -7); break;
                case 40:
                    // Arrow down goes to next week.
                    this.ahead(0, 7); break;
                case 37:
                    // Arrow left goes to prev day.
                    this.ahead(0, -1); break;
                case 39:
                    // Arrow right goes to next day.
                    this.ahead(0, 1); break;
                default:
                    return;
            }
            e.preventDefault();
        }

        , parse: function(s) {
            console.log(s);
            // Parse imploded list.
            var m;
            if ((m = s.split(',') )) {
                return m;
            } else {
                return null;
            }
        }

        , proxy: function(meth) {
            // Bind a method so that it always gets the datepicker instance for
            // ``this``. Return ``this`` so chaining calls works.
            this[meth] = $.proxy(this[meth], this);
            return this;
        }

    };

    /* HOURPICKER PLUGIN DEFINITION
     * ============================ */

    $.fn.hourpicker = function( options ) {
        return this.each(function() { new HourPicker(this, options); });
    };

    $(function() {
        $(selector).hourpicker();
        $('html').click(clearHourPickers);
    });

    $.fn.hourpicker.HourPicker = HourPicker;

    $.fn.hourpicker.defaults = {
        hourNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
            "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
    };
}( window.jQuery || window.ender );