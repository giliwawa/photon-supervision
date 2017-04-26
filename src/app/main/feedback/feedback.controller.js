/**
 * Created by HDMI on 4/26/2017.
 */
(function ()
{
  'use strict';

  angular
    .module('app.feedback')
    .controller('feedbackController', feedbackController);

  /** @ngInject */
  function feedbackController(feedbackData)
  {
    var vm = this;
    vm.pathImg = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    vm.cardModel=feedbackData;

    console.log("data :", vm.data);
  }
})();
