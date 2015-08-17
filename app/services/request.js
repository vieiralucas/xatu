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

        function request(request) {
            var deffered = $q.defer();

            $http(request).then(function(response) {
                deffered.resolve(stringify(response.data));
            }).catch(function(err) {
                deffered.reject(err);
            });

            return deffered.promise;
        }

        function stringify(data) {
            try {
                data = JSON.stringify(data, null, '  ');
            } catch(e) {}

            return data;
        }
    }
})();
