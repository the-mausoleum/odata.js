var OData = (function () {

    'use strict';

    var _include = [];

    var _url = '';
    var _orderby = [];
    var _orderbyOrder = 'asc';
    var _top = 0;
    var _skip = 0;
    var _inlineCount = 'allpages';
    var _select = [];
    var _expand = [];
    var _filter = [];
    var _format = 'json';

    var OData = function () {

    };

    OData.prototype.url = function (url) {

        _url = url;

        return this;

    };

    OData.prototype.orderby = function (item) {

        _orderby.push(item);

        include('$orderby');

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

        include('$top');

        return this;

    };

    OData.prototype.skip = function (n) {

        if (n < 0) {
            return this;
        }

        _skip = n;

        include('$skip');

        return this;

    };

    OData.prototype.inlineCount = function (option) {

        if (option === false || option === 0 || option === 'none') {
            _inlineCount = 'none';
        } else {
            _inlineCount = 'allpages';
        }

        include('$inlinecount');

        return this;

    };

    OData.prototype.count = OData.prototype.inlineCount;

    OData.prototype.select = function (item) {

        _select.push(item);

        include('$select');

        return this;

    };

    OData.prototype.filter = function (callback) {

        var Filter = function () {

        };

        Filter.prototype.equal = function (lhs, rhs) {

            join(lhs, 'eq', rhs);

            return this;

        };

        Filter.prototype.eq = Filter.prototype.equal;

        Filter.prototype.notEqual = function (lhs, rhs) {

            join(lhs, 'ne', rhs);

            return this;

        };

        Filter.prototype.ne = Filter.prototype.notEqual;

        Filter.prototype.greaterThan = function (lhs, rhs) {

            join(lhs, 'gt', rhs);

            return this;

        };

        Filter.prototype.gt = Filter.prototype.greaterThan;

        Filter.prototype.greaterThanOrEqual = function (lhs, rhs) {

            join(lhs, 'ge', rhs);

            return this;

        };

        Filter.prototype.ge = Filter.prototype.greaterThanOrEqual;

        Filter.prototype.lessThan = function (lhs, rhs) {

            join(lhs, 'lt', rhs);

            return this;

        };

        Filter.prototype.lt = Filter.prototype.lessThan;

        Filter.prototype.lessThanOrEqual = function (lhs, rhs) {

            join(lhs, 'le', rhs);

            return this;

        };

        Filter.prototype.le = Filter.prototype.lessThanOrEqual;

        Filter.prototype.and = function () {

            _filter.push('and');

            return this;

        };

        Filter.prototype.or = function () {

            _filter.push('or');

            return this;

        };

        Filter.prototype.not = function () {

            _filter.push('not');

            return this;

        };

        Filter.prototype.add = function (lhs, rhs) {

            _filter.push(joinArithmetic(lhs, 'add', rhs));

            return this;

        };

        Filter.prototype.subtract = function (lhs, rhs) {

            _filter.push(joinArithmetic(lhs, 'sub', rhs));

            return this;

        };

        Filter.prototype.sub = Filter.prototype.subtract;

        Filter.prototype.multiply = function (lhs, rhs) {

            _filter.push(joinArithmetic(lhs, 'mul', rhs));

            return this;

        };

        Filter.prototype.mul = Filter.prototype.multiply;

        Filter.prototype.divide = function (lhs, rhs) {

            _filter.push(joinArithmetic(lhs, 'div', rhs));

            return this;

        };

        Filter.prototype.div = Filter.prototype.divide;

        Filter.prototype.modulo = function (lhs, rhs) {

            _filter.push(joinArithmetic(lhs, 'mod', rhs));

            return this;

        };

        Filter.prototype.mod = Filter.prototype.modulo;

        Filter.prototype.substringOf = function (lhs, rhs) {

            _filter.push('substringof(\'' + rhs + '\', ' + lhs + ')');

            return this;

        };

        Filter.prototype.startsWith = function (lhs, rhs) {

            _filter.push('startswith(' + lhs + ', \'' + rhs + '\')');

            return this;

        };

        Filter.prototype.endsWith = function (lhs, rhs) {

            _filter.push('startswith(' + lhs + ', \'' + rhs + '\')');

            return this;

        };

        Filter.prototype.length = function (lhs, rhs) {

            _filter.push('length(' + lhs + ')');

            return this;

        };

        Filter.prototype.year = function (lhs) {

            _filter.push('year(' + lhs + ')');

            return this;

        };

        Filter.prototype.month = function (lhs) {

            _filter.push('month(' + lhs + ')');

            return this;

        };

        Filter.prototype.day = function (lhs) {

            _filter.push('day(' + lhs + ')');

            return this;

        };

        Filter.prototype.hour = function (lhs) {

            _filter.push('hour(' + lhs + ')');

            return this;

        };

        Filter.prototype.minute = function (lhs) {

            _filter.push('minute(' + lhs + ')');

            return this;

        };

        Filter.prototype.second = function (lhs) {

            _filter.push('second(' + lhs + ')');

            return this;

        };

        Filter.prototype.next = function () {

            include('$filter');

            return this;

        }.bind(this);

        var join = function (lhs, operator, rhs) {

            if (lhs !== null && typeof rhs === 'undefined') {
                _filter.push(joinArithmetic('eq', lhs));
            } else {
                _filter.push(joinLogical(lhs, 'eq', rhs));
            }

        };

        var joinLogical = function (lhs, operator, rhs) {

            return lhs + ' ' + operator + ' ' + '\'' + rhs + '\'';

        };

        var joinArithmetic = function (lhs, operator, rhs) {

            return lhs + ' ' + operator + (rhs ? ' ' + rhs : '');

        };

        return callback(new Filter());

    };

    OData.prototype.expand = function (item) {

        _expand.push(item);

        include('$expand');

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

        include('$format');

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

    OData.prototype.query = function () {

        var query;
        var params = getParams();

        if (_url) {
            query = '';

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
        } else {
            query = {};

            _include.forEach(function (value) {
                query[value] = params[value];
            });
        }

        return query;

    };

    var include = function (param) {

        _include.push(param);

    };

    var getParams = function () {

        var params = {};

        buildSelect(params);
        buildExpand(params);
        buildFilter(params);
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

    var buildFilter = function (params) {

        params.$filter = _filter.join(' ');

        return params;

    };

    var buildFormat = function (params) {

        params.$format = _format;

        return params;

    };

    return OData;

})();
