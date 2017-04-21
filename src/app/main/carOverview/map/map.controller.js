(function () {
    'use strict';

    angular
        .module('app.carOverview')
        .controller('MapController', MapController);

    /** @ngInject */
    function MapController($element, carOverviewData, $interval, $document, socketIoService) {
        var vm = this;
        vm.cardModel = {};
        //vm.cardModel.handleClick = handleMarkerClick;
        vm.cardModel = carOverviewData;
        var cars = {};
        var cartomove;
        carOverviewData.$promise.then(function (data) {

            vm.cardModel = data;

            mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsaXdhd2EiLCJhIjoiY2l6N2JzcnJoMDAyazJxbXFib3Jvb25rNiJ9.wW3kh2VqnEpdSZqYrbuzdw';
            var mapp = new mapboxgl.Map({
                container: document.getElementById('map'),
                style: 'mapbox://styles/mapbox/dark-v9',
                center: [10.154776, 36.83743],
                zoom: 12,
                hash: false
            });


            mapp.on('load', function () {

              socketIoService.on('car_movement',function(car){
                if(!cars[car._id]) {
                  cars[car._id] = car;
                  mapp.addSource('marker'+car._id,geoMarker([cars[car._id].position]));
                  mapp.addLayer({
                    "id": "point",
                    "source": "marker"+car._id,
                    "type": "circle",
                    "paint": {
                      "circle-radius": 10,
                      "circle-color": "#007cbf"
                    },
                  });
                }else{
                  console.log(cars)
                  cars[car._id].position.coordinates = car.position.coordinates;
                  cartomove = car;
                  requestAnimationFrame(updateMarker);

                  console.log('updating car['+car._id+']');
                }
              });

                function updateMarker(){
                  mapp.getSource('marker'+cartomove._id).setData(geoMarker([cartomove.position.coordinates]).data);
                }

                function geoMarker(coords) {
                    var Geoj = {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features":[]
                        }
                    };

                    coords.forEach(function(coord,index){
                        Geoj.data.features.push({
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [coord[1],coord[0]]
                            },
                            "properties":{
                                "id": index
                            }
                        });

                    });
                    return Geoj;
                }


            });
        });

    }
})();
