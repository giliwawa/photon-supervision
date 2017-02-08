(function ()
{
    'use strict';

    angular
        .module('app.carOverview')
        .controller('MapController', MapController);

    /** @ngInject */
    function MapController(carOverviewData,$interval)
    {
        var vm = this;
        vm.cardModel={};
        vm.cardModel.handleClick = handleMarkerClick;
        vm.cardModel = carOverviewData;
        carOverviewData.$promise.then(function(data){
            console.log("data arrived");
            vm.cardModel= data;
            var interval = $interval(updateMarker,200);
            console.log(vm.cardModel);
        });



        // Methods


        function updateMarker(count){
            if(vm.cardModel.marker){
                var increment = Math.random() *0.0001;
                if(Math.floor(Math.random()))
                    increment *= -1;
                vm.cardModel.marker.coords.latitude += increment;
                vm.cardModel.marker.coords.longitude += increment;
                //console.log(vm.cardModel.marker.coords);
            }
        }

        function handleMarkerClick() {
            console.log("clicked");
        }
        //////////
    }
})();
