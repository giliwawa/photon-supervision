(function ()
{
    'use strict';

    angular
        .module('app.sharing')
        .controller('sharingController', sharingController);

    /** @ngInject */
    function sharingController(sharingData)
    {
      var vm = this;
      vm.pathImg = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      vm.cardModel=sharingData;

      console.log("data :", vm.data);
    }
})();
