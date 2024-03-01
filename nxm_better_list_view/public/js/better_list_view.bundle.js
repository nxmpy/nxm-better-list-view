/*
# Nxm Better List View © 2023
# Author:  AmeenAhmed & Zat nd Bas
# Company: Nxmpy pvt ltd
# Licence: Please refer to LICENSE file
*/


nxm.views.ListView = class ListView extends nxm.views.ListView {
    constructor(opts) {
		super(opts);
		this._row_class = 'level list-row';
		this._row_backgrounds = [
            'active', 'primary', 'secondary',
            'success', 'danger', 'warning', 'info',
        ];
	}
    get_args() {
        var args = super.get_args();
        if (!args.formface || args.formface !== this.formface) {
            nxm.throw(__('ListView invalid super args.'));
            return args;
        }
        if (
            $.isArray(this.settings.query_fields)
            && this.settings.query_fields.length
        ) {
            for (let i in this.settings.query_fields) {
                let field = nxm.model.get_full_column_name(
                    this.settings.query_fields[i],
                    this.formface
                );
                if (args.fields.indexOf(field) < 0)
                    args.fields.push(field);
            }
        }
        if (
            (
                $.isPlainObject(this.settings.query_filters)
                && !$.isEmptyObject(this.settings.query_filters)
            ) || (
                $.isArray(this.settings.query_filters)
                && this.settings.query_filters.length
            )
        ) {
            for (let key in this.settings.query_filters) {
                let cond = this._get_query_filter(key);
                if (cond && args.filters.indexOf(cond) < 0)
                    args.filters.push(cond);
            }
        }
        if (cint(this.settings.page_length)) {
            args.page_length = cint(this.settings.page_length);
        }
        return args;
    }
    render_list() {
        if (this.settings._data_render) {
            delete this.settings._data_render;
            super.render_list();
            return;
        }
        if (!this.settings.parser && $.isFunction(this.settings.data_parser)) {
            this.settings.parser = this.settings.data_parser;
        }
        if (!$.isFunction(this.settings.parser)) {
            super.render_list();
            return;
        }
        var me = this,
        dataBK = [];
        this.data.forEach(function(row, i) {
            dataBK[i] = Object.assign({}, row);
        });
        (new Promise(function(resolve, reject) {
            try {
                me.settings.parser(me.data, resolve, reject);
            } catch(e) { reject(); }
        })).catch(function() {
            me.data = dataBK;
        }).finally(function() {
            me.settings._data_render = 1;
            me.render_list();
        });
    }
    get_list_row_html(doc) {
        let html = super.get_list_row_html(doc);
        if (!$.isFunction(this.settings.set_row_background)) return html;
        let color = this.settings.set_row_background(doc);
        if (!color || Object.prototype.toString.call(color) !== '[object String]') return html;
        if (this._row_backgrounds.indexOf(color) >= 0) {
            html = html.replace(this._row_class, this._row_class + ' table-' + color);
        } else if (
            (color[0] === '#' && color.length >= 4)
            || color.substring(0, 3).toLowerCase() === 'rgb'
            || color.substring(0, 4).toLowerCase() === 'hsla'
        ) {
            html = html.replace(this._row_class, this._row_class + '" style="background-color:' + color);
        }
        return html;
    }
    _get_query_filter(column) {
        let cond = this.settings.query_filters[column],
        sign = '=',
        value = cond;
        if ($.isArray(cond)) {
            let len = cond.length,
            i = 0;
            if (len < 2) return;
            if (len > 2) column = cond[i++];
            sign = cond[i++];
            value = cond[i++];
        }
        return [this.formface, column, sign, value];
    }
};