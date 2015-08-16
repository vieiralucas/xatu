(function() {
    'use strict';
    
    angular
        .module('xatu')
        .factory('requests', Requests);

    Requests.$inject = ['$q', '$http'];
    function Requests($q, $http) {
        return {
            request: request
        };

        function request(url, method) {
            switch(method) {
            case 'GET':
                return _get(url);
            case 'HEAD':
                return _head(url);
            case 'POST':
                return _post(url);
            case 'PUT':
                return _put(url);
            case 'DELETE':
                return _delete(url);
            }

            return $q.reject('invalid method');
        }

        function _get(url) {
            return $http.get(url);
        }

        function _head(url) {
            return $q.reject('unimplemented');
        }

        function _post(url) {
            return $q.reject('unimplemented');
        }

        function _put(url) {
            return $q.reject('unimplemented');
        }

        function _delete(url) {
            return $q.reject('unimplemented');
        }
    }
})();
