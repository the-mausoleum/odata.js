var OData = (function () {

    'use strict';

    var _url = '';
    var _orderby = [];
    var _orderbyOrder = 'asc';
    var _top = 0;
    var _skip = 0;
    var _inlineCount = 'allpages';
    var _select = [];
    var _expand = [];
    var _format = 'json';

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

    OData.prototype.skip = function (n) {

        if (n < 0) {
            return this;
        }

        _skip = n;

        return this;

    };

    OData.prototype.inlineCount = function (option) {

        if (option) {
            _inlineCount = 'allpages';

            return this;
        }

        _inlineCount = 'none';

        return this;

    };

    OData.prototype.count = OData.prototype.inlineCount;

    OData.prototype.select = function (item) {

        _select.push(item);

        return this;

    };

    OData.prototype.expand = function (item) {

        _expand.push(item);

        return this;

    };

    OData.prototype.format = function (format) {

        switch (format.toLowerCase()) {
            case 'atom':
            case 'application/atom+xml':
                _format = 'atom';
                break;
            case 'xml':
            case 'application/xml':
                _format = 'xml';
                break;
            case 'json':
            case 'application/json':
                _format = 'json';
                break;
            default:
                _format = 'json';
        }

        return this;

    };

    OData.prototype.atom = function () {

        return OData.prototype.format.apply(this, ['atom']);

    };

    OData.prototype.json = function () {

        return OData.prototype.format.apply(this, ['json']);

    };

    OData.prototype.xml = function () {

        return OData.prototype.format.apply(this, ['xml']);

    };

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
        buildSkip(params);
        buildTop(params);
        buildInlineCount(params);
        buildOrderBy(params);
        buildFormat(params);

        return params;

    };

    var buildOrderBy = function (params) {

        if (_orderby.length < 1) {
            return params;
        }

        params.$orderby = _orderby.join(',') + ' ' + _orderbyOrder;

        return params;

    };

    var buildTop = function (params) {

        params.$top = _top;

        return params;

    };

    var buildSkip = function (params) {

        params.$skip = _skip;

        return params;

    };

    var buildInlineCount = function (params) {

        params.$inlinecount = _inlineCount;

        return params;

    };

    var buildSelect = function (params) {

        if (_select.length < 1) {
            return params;
        }

        params.$select = _select.join(',');

        return params;

    };

    var buildExpand = function (params) {

        if (_expand.length < 1) {
            return params;
        }

        params.$expand = _expand.join(',');

        return params;

    };

    var buildFormat = function (params) {

        params.$format = _format;

        return params;

    };

    return OData;

})();
