(function ()
{
    'use strict';

    angular
        .module('app.home')
        .controller('Card1Controller', Card1Controller);

    /** @ngInject */
    function Card1Controller(card1data)
    {
        var vm = this;

        // Data
        console.log(card1data);
        vm.cardModel = card1data.data;
        // Methods

        //////////
    }
})();
