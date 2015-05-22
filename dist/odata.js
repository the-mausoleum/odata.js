var OData = (function () {

    'use strict';

    String.prototype.format = function () {

        var args = arguments;

        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match;
        });

    };

    var _url = '';
    var _select = [];
    var _expand = [];

    var OData = function () {

    };

    OData.prototype.query = function (url) {

        _url = url;

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

        console.log(params)

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

        return _url + '?' + buildSelect() + buildExpand();

    };

    var getParams = function () {

        var params = {};
        var current = {};

        current = buildSelect();

        params[current.key] = current.value;

        current = buildExpand();

        params[current.key] = current.value;

        return params;

    };

    var buildSelect = function () {

        var parameter = {
            key: '',
            value: ''
        };

        if (_select.length < 1) {
            return parameter;
        }

        parameter = {
            key: '$select',
            value: _select.join(',')
        };

        return parameter;

    };

    var buildExpand = function () {

        var parameter = {
            key: '',
            value: ''
        };

        if (_expand.length < 1) {
            return parameter;
        }

        parameter = {
            key: '$expand',
            value: _expand.join(',')
        };

        return parameter;

    };

    return OData;

})();
