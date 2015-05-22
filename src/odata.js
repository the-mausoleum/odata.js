var OData = (function () {

    'use strict';

    var _include, _url, _orderby, _orderbyOrder, _top, _skip, _inlineCount, _select, _expand, _filter, _format;

    var init = function () {

        _include = [];
        _url = '';
        _orderby = [];
        _orderbyOrder = 'asc';
        _top = 0;
        _skip = 0;
        _inlineCount = 'allpages';
        _select = [];
        _expand = [];
        _filter = [];
        _format = 'json';

    };

    /**
     * @class OData
     * @description Creates a new OData instance.
     */
    var OData = function () {

        init();

    };

    /**
     * @function url
     * @description Sets the URL to construct OData queries against.
        If not set, calling {@link OData#query|query} will return the OData query parameters as an object.
     * @param {String} url - The URL to use.
     * @memberof OData
     * @instance
     */
    OData.prototype.url = function (url) {

        _url = url;

        return this;

    };

    /**
     * @function orderBy
     * @description Order the resulting data by the given property. [Tutorial]{@tutorial orderby}.
     * @param {String} property - The property to order by.
     * @memberof OData
     * @instance
     */
    OData.prototype.orderBy = function (item) {

        _orderby.push(item);

        include('$orderby');

        return this;

    };

    /**
     * @function ascending
     * @description {@link OData#orderBy|Order} the resulting data in ascending order.
     * @memberof OData
     * @instance
     */
    OData.prototype.ascending = function () {

        _orderbyOrder = 'asc';

        return this;

    };

    /**
     * @function asc
     * @description Shorthand function for {@link OData#ascending|ascending}.
     * @memberof OData
     * @instance
     */
    OData.prototype.asc = OData.prototype.ascending;

    /**
     * @function descending
     * @description {@link OData#orderBy|Order} the resulting data in descending order.
     * @memberof OData
     * @instance
     */
    OData.prototype.descending = function () {

        _orderbyOrder = 'desc';

        return this;

    };

    /**
     * @function desc
     * @description Shorthand function for {@link OData#descending|descending}.
     * @memberof OData
     * @instance
     */
    OData.prototype.desc = OData.prototype.descending;

    /**
     * @function top
     * @description Take the the first N elements from the resulting data.
     * @param {Integer} n - The number of elements to take. Must be non-negative.
     * @memberof OData
     * @instance
     */
    OData.prototype.top = function (n) {

        if (n < 0) {
            return this;
        }

        _top = n;

        include('$top');

        return this;

    };

    /**
     * @function skip
     * @description Skip the the first N elements from the resulting data.
     * @param {Integer} n - The number of elements to skip. Must be non-negative.
     * @memberof OData
     * @instance
     */
    OData.prototype.skip = function (n) {

        if (n < 0) {
            return this;
        }

        _skip = n;

        include('$skip');

        return this;

    };

    /**
     * @function inlineCount
     * @description Include a count of all the items in the data set in the response.
        If used in conjunction with {@link OData#filter|filter}, the filtering will take place <em>before</em> the count.
        Truthy values (e.g., true, 1) as the argument will set the value to 'allpages'.
        Falsy values (e.g., false, 0) as the argument will set the value to 'none'.
        Not passing in a parameter will set the value to 'allpages'.
     * @param {(Boolean|Integer|String)} option - Possible values are 'allpages' and 'none'.
     * @memberof OData
     * @instance
     */
    OData.prototype.inlineCount = function (option) {

        if (option === false || option === 0 || option === 'none') {
            _inlineCount = 'none';
        } else {
            _inlineCount = 'allpages';
        }

        include('$inlinecount');

        return this;

    };

    /**
     * @function count
     * @description Shorthand function for {@link OData#inlineCount|inlineCount}.
        Calling without arguments will set the value of inlineCount to <code>'allpages'</code>.
     * @memberof OData
     * @instance
     */
    OData.prototype.count = OData.prototype.inlineCount;

    /**
     * @function select
     * @description Specify a property to be include in the returned data.
        Use the <code>'*'</code> wildcard to include all properties.
     * @param {String} property - The property to include in the returned data.
     * @memberof OData
     * @instance
     */
    OData.prototype.select = function (item) {

        _select.push(item);

        include('$select');

        return this;

    };

    /**
     * @function filter
     * @description Set up filters for the data.
     * @param {Function} callback - The $filter callback.
     * @memberof OData
     * @instance
     */
    OData.prototype.filter = function (callback) {

        /**
         * @class Filter
         * @description Creates a new Filter instance for creating OData $filter queries.
         */
        var Filter = function () {

        };

        /**
         * @function equal
         * @description Check for equality between two objects.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the equality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function equal
         * @description Create an equality statement for a previous expression.
         * @param {*} value - The value to use in the equality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.equal = function (lhs, rhs) {

            join(lhs, 'eq', rhs);

            return this;

        };

        /**
         * @function eq
         * @description Shorthand function for {@link Filter#equal(1)|equal}.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the equality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function eq
         * @description Shorthand function for {@link Filter#equal(2)|equal}.
         * @param {*} value - The value to use in the equality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.eq = Filter.prototype.equal;

        /**
         * @function notEqual
         * @description Check if the property value is not equal to the given value.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function notEqual
         * @description Check if the result of the previous expression is not equal to the given value.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.notEqual = function (lhs, rhs) {

            join(lhs, 'ne', rhs);

            return this;

        };

        /**
         * @function ne
         * @description Shorthand function for {@link Filter#notEqual(1)|notEqual}.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function ne
         * @description Shorthand function for {@link Filter#notEqual(2)|notEqual}.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.ne = Filter.prototype.notEqual;

        /**
         * @function greaterThan
         * @description Check if the property value is greater than the given value.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function greaterThan
         * @description Check if the result of the previous expression is greater than the given value.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.greaterThan = function (lhs, rhs) {

            join(lhs, 'gt', rhs);

            return this;

        };

        /**
         * @function gt
         * @description Shorthand function for {@link Filter#greaterThan(1)|greaterThan}.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function gt
         * @description Shorthand function for {@link Filter#greaterThan(2)|greaterThan}.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.gt = Filter.prototype.greaterThan;

        /**
         * @function greaterThanOrEqual
         * @description Check if the property value is greater than or equal to the given value.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function greaterThanOrEqual
         * @description Check if the result of the previous expression is greater than or equal to the given value.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.greaterThanOrEqual = function (lhs, rhs) {

            join(lhs, 'ge', rhs);

            return this;

        };

        /**
         * @function ge
         * @description Shorthand function for {@link Filter#greaterThanOrEqual(1)|greaterThanOrEqual}.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function ge
         * @description Shorthand function for {@link Filter#greaterThanOrEqual(2)|greaterThanOrEqual}.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.ge = Filter.prototype.greaterThanOrEqual;

        /**
         * @function lessThan
         * @description Check if the property value is less than the given value.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function lessThan
         * @description Check if the result of the previous expression is less than the given value.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.lessThan = function (lhs, rhs) {

            join(lhs, 'lt', rhs);

            return this;

        };

        /**
         * @function lt
         * @description Shorthand function for {@link Filter#lessThan(1)|lessThan}.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function lt
         * @description Shorthand function for {@link Filter#lessThan(2)|lessThan}.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.lt = Filter.prototype.lessThan;

        /**
         * @function lessThanOrEqual
         * @description Check if the property value is less than or equal to the given value.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function lessThanOrEqual
         * @description Check if the result of the previous expression is less than or equal to the given value.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
        Filter.prototype.lessThanOrEqual = function (lhs, rhs) {

            join(lhs, 'le', rhs);

            return this;

        };

        /**
         * @function le
         * @description Shorthand function for {@link Filter#lessThanOrEqual(1)|lessThanOrEqual}.
         * @param {String} property - The property to use.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 1
         */

        /**
         * @function le
         * @description Shorthand function for {@link Filter#lessThanOrEqual(2)|lessThanOrEqual}.
         * @param {*} value - The value to use in the inequality check.
         * @memberof Filter
         * @instance
         * @variation 2
         */
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

        Filter.prototype.indexOf = function (lhs, rhs) {

            _filter.push('indexof(' + lhs + ', \'' + rhs + '\')');

            return this;

        };

        Filter.prototype.replace = function (property, find, replace) {

            _filter.push('replace(' + property + ', \'' + find + ', \'' + replace + '\')');

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

        Filter.prototype.round = function (property) {

            _filter.push('round(' + property + ')');

            return this;

        };

        Filter.prototype.floor = function (property) {

            _filter.push('floor(' + property + ')');

            return this;

        };

        Filter.prototype.ceiling = function (property) {

            _filter.push('ceiling(' + property + ')');

            return this;

        };

        Filter.prototype.isOf = function (lhs, rhs) {

            if (lhs !== null && typeof rhs === 'undefined') {
                _filter.push('isof(\'' + lhs + '\')');
            } else {
                _filter.push('isof(' + lhs + ', \'' + rhs + '\')');
            }

            return this;

        };

        Filter.prototype.next = function () {

            if (_filter.length > 0) {
                include('$filter');
            }

            return this;

        }.bind(this);

        var join = function (lhs, operator, rhs) {

            if (lhs !== null && typeof rhs === 'undefined') {
                _filter.push(joinArithmetic(operator, lhs));
            } else {
                _filter.push(joinLogical(lhs, operator, rhs));
            }

        };

        var joinLogical = function (lhs, operator, rhs) {

            return lhs + ' ' + operator + ' ' + '\'' + rhs + '\'';

        };

        var joinArithmetic = function (lhs, operator, rhs) {

            return lhs + ' ' + operator + (rhs ? ' ' + rhs : '');

        };

        if (typeof callback !== typeof Function) {
            return this;
        }

        return callback(new Filter());

    };

    OData.prototype.expand = function (item) {

        _expand.push(item);

        include('$expand');

        return this;

    };

    /**
     * @function format
     * @description Set the desired response format for the data.
        Possible formats: 'atom', 'json', 'xml'.
        Defaults to 'json'.
     * @param {String} format - The desired format.
     * @memberof OData
     * @instance
     */
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

    /**
     * @function atom
     * @description Sets the data {@link OData#format|format} to 'atom'.
     * @memberof OData
     * @instance
     */
    OData.prototype.atom = function () {

        return OData.prototype.format.apply(this, ['atom']);

    };

    /**
     * @function json
     * @description Sets the data {@link OData#format|format} to 'json'.
     * @memberof OData
     * @instance
     */
    OData.prototype.json = function () {

        return OData.prototype.format.apply(this, ['json']);

    };

    /**
     * @function xml
     * @description Sets the data {@link OData#format|format} to 'xml'.
     * @memberof OData
     * @instance
     */
    OData.prototype.xml = function () {

        return OData.prototype.format.apply(this, ['xml']);

    };

    /**
     * @function query
     * @description Build the resulting query.
        If the {@link OData#url|URL} has not been set, this function returns an Object containing the query parameters.
        If the URL has been set, it will return the URL with the query parameters attached to it.
     * @memberof OData
     * @instance
     */
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

        init();

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
