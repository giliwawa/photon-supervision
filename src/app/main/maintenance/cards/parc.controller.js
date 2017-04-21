(function ()
{
  'use strict';

  angular
    .module('app.maintenance')
    .controller('ParcController', ParcController);

  /** @ngInject */
  function ParcController(maintenanceData, $timeout)
  {
    var self = this;
    self.cardModel= {
      cars        : maintenanceData,
      title       : "Parc",
      subtitle    : "Manage Cars",
      page_size   : 5,
      total_items : maintenanceData.length,
      index       : 0,
      page        : maintenanceData.slice(0,5),
      currentCar  : null,
      sensor      : false,
      engine      : false,
      tires       : false,
      diagStarted : false,
      progBarS    : false,
      progBarE    : false,
      progBarT    : false,
      map         : { center: { latitude: 45, longitude: -73 }, zoom: 8 }
    }


    self.cardModel.nextPage = function(){

      if(self.cardModel.index - 1 < self.cardModel.total_items / self.cardModel.page_size){
        self.cardModel.index++;
        processPage(self.cardModel.index)
      }
    }

    self.cardModel.prevPage = function(){

      if(self.cardModel.index > 0){
        self.cardModel.index--;
        processPage(self.cardModel.index)
      }
    }

    self.cardModel.setCurrentCar = function(index){

      toggleStuff(['diagStarted', 'sensor', 'engine', 'tires'],-1)
      self.cardModel.currentCar = null;
      self.cardModel.currentCar = self.cardModel.page[index];

    }

    self.cardModel.startDiagnose = function(){
      self.cardModel.diagStarted = true;
      toggleStuff(['progBarS','progBarE','progBarT'])
      $timeout(function(){
        toggleStuff(['progBarS','sensor'])
      },1000)
      $timeout(function(){
        toggleStuff(['progBarT','tires'])
      },1500)
      $timeout(function(){
        toggleStuff(['progBarE','engine'])
      },2950)
    }

    function processPage(){
      self.cardModel.page = null;
      self.cardModel.page = [];

      var start = self.cardModel.index*self.cardModel.page_size
      for(var i= start; i < start + self.cardModel.page_size; i++){
        if(self.cardModel.cars[i])
          self.cardModel.page.push(self.cardModel.cars[i])
      }
    }

    /**
     *
     * @param bars Array
     * @param state Boolean
     */
    function toggleStuff(bars, state){
      if(state && state == -1){
        bars.forEach(function(bar){
          self.cardModel[bar] = ~state;
        })
        return;
      }
      bars.forEach(function(bar){
        self.cardModel[bar] = !self.cardModel[bar];
      })
    }

    function initMap(pos) {
      var uluru = {lat : pos[0], lng: pos[1]};
      var elem = document.getElementById('map');
      console.log(uluru);
      console.log(elem);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }

  }
})();
