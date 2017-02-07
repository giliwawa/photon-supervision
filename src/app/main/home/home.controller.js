(function ()
{
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(homeData)
    {
        var vm = this;

        // Data
        vm.helloText = homeData.data.helloText;
        // Methods

        //////////
    }
})();
