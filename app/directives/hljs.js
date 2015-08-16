(function() {
    'use strict';

    angular
        .module('hljs', [])
        .directive('xtHljs', xtHljs);

    function xtHljs() {
        return {
            restrict: 'E',
            link: linker
        };

        function linker(scope, element, attrs) {
            attrs.$observe('input', function(input) {
                if (input.length > 0) {
                    var dom = $('<pre><code>' + input + '</code></pre>');
                    $(element).html(dom);
                }
            });
        }
    }
})();
