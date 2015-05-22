var OData = (function () {

    'use strict';

    String.prototype.format = function () {

        var args = arguments;

        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match;
        });

    };

    var _url = '';
    var _orderby = [];
    var _orderbyOrder = 'asc';
    var _top = 0;
    var _select = [];
    var _expand = [];

    var OData = function () {

    };

    OData.prototype.query = function (url) {

        _url = url;

        return this;

    };

    OData.prototype.orderby = function (item) {

        _orderby.push(item);

        return this;

    };

    OData.prototype.ascending = function () {

        _orderbyOrder = 'asc';

        return this;

    };

    OData.prototype.asc = OData.prototype.ascending;

    OData.prototype.descending = function () {

        _orderbyOrder = 'desc';

        return this;

    };

    OData.prototype.desc = OData.prototype.descending;

    OData.prototype.top = function (n) {

        if (n < 0) {
            return this;
        }

        _top = n;

        return this;

    };

    OData.prototype.select = function (item) {

        _select.push(item);

        return this;

    };

    OData.prototype.expand = function (item) {

        _expand.push(item);

        return this;

    }

    OData.prototype.build = function () {

        var query = '';
        var params = getParams();

        for (var i in params) {
            if (!i) {
                continue;
            }

            if (!params[i]) {
                continue;
            }

            query += i + '=' + params[i] + '&';
        }

        if (query.lastIndexOf('&') === query.length - 1) {
            query = query.slice(0, query.length - 1);
        }

        return query;

    };

    var getParams = function () {

        var params = {};

        buildSelect(params);
        buildExpand(params);
        buildTop(params);
        buildOrderBy(params);

        return params;

    };

    var buildOrderBy = function (params) {

        if (_orderby.length < 1) {
            return params;
        }

        return params['$orderby'] = _orderby.join(',') + ' ' + _orderbyOrder;

    };

    var buildTop = function (params) {

        return params['$top'] = _top;

    };

    var buildSelect = function (params) {

        if (_select.length < 1) {
            return params;
        }

        return params['$select'] = _select.join(',');

    };

    var buildExpand = function (params) {

        if (_expand.length < 1) {
            return params;
        }

        return params['$expand'] = _expand.join(',');

    };

    return OData;

})();
