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

    OData.prototype.build = function () {

        return _url + '?' + buildSelect();

    };

    var buildSelect = function () {

        return '$select={0}'.format(_select.join(','));

    };

    return OData;

})();
