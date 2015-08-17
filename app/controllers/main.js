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
            method: 'GET',
            url: '',
            headers: {
                'Content-Type': 'application/json' 
            }
        };
        vm.history = setupHistory();
        vm.newHeader = {
            key: '',
            value: ''
        };

        // public api
        vm.go = go;
        vm.addHeader = addHeader;
        vm.removeHeader = removeHeader;
        vm.copyHist = copyHist;
        vm.deleteHist = deleteHist;

        function setupHistory() {
            if (!$localStorage.history) {
                $localStorage.history = [];
            }

            return $localStorage.history;
        }

        function go() {
            var hist;

            addHeader();

            hist = angular.copy(vm.current)
            vm.loading = true;
            $requests.request(vm.current).then(function(response) {
                vm.response = response;
                hist.date = Date.now();
                vm.history.push(hist);
                $localStorage.history = vm.history;
                vm.loading = false;
            });
        }

        function addHeader() {
            if (vm.newHeader.key.length > 0 && vm.newHeader.value.length > 0) {
                vm.current.headers[vm.newHeader.key] = vm.newHeader.value;
                vm.newHeader.key = '';
                vm.newHeader.value = '';
            }
        }

        function removeHeader(key) {
            console.log(key);
            delete vm.current.headers[key];
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
