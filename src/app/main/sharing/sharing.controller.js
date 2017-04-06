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
        var pathImg = "img/user.PNG";
      vm.cardModel=sharingData;

      console.log("data :", vm.data);

    }
})();
