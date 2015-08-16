(function() {
    'use strict';

    angular
        .module('xatu')
        .controller('MainController', MainController);

    MainController.$inject = ['requests', '$localStorage'];
    function MainController($requests, $localStorage) {
        var vm = this;

        // set start data
        vm.current = {
            url: '',
            method: 'GET'
        };
        vm.history = setupHistory();

        // public api
        vm.go = go;
        vm.copyHist = copyHist;
        vm.deleteHist = deleteHist;

        function go() {
            vm.loading = true;
            $requests.request(vm.current.url, vm.current.method).then(function(response) {
                vm.response = response.data;
                vm.history.push({
                    date: Date.now(),
                    url: vm.current.url,
                    method: vm.current.method
                });
                $localStorage.history = vm.history;
                vm.loading = false;
            });
        }

        function setupHistory() {
            if (!$localStorage.history) {
                $localStorage.history = [];
            }

            return $localStorage.history;
        }

        function copyHist(hist) {
            vm.current = angular.copy(hist);
        }

        function deleteHist(index) {
            vm.history.splice(index, 1);
            $localStorage.history = vm.history;
        }
    }
})();
