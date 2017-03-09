(function () {
    'use strict';

    angular
        .module('app.carOverview')
        .controller('MapController', MapController);

    /** @ngInject */
    function MapController($element, carOverviewData, $interval, $document) {
        var vm = this;
        vm.cardModel = {};
        //vm.cardModel.handleClick = handleMarkerClick;
        vm.cardModel = carOverviewData;
        carOverviewData.$promise.then(function (data) {

            vm.cardModel = data;



            mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsaXdhd2EiLCJhIjoiY2l6N2JzcnJoMDAyazJxbXFib3Jvb25rNiJ9.wW3kh2VqnEpdSZqYrbuzdw';
            var mapp = new mapboxgl.Map({
                container: document.getElementById('map'),
                style: 'mapbox://styles/mapbox/dark-v9',
                center: vm.cardModel.map.center,
                zoom: vm.cardModel.map.zoom,
                hash: false,
            });


            mapp.on('load', function () {

                var intiMarker = geoMarker([
                    [-122.48369693756104, 37.83381888486939]
                ]);
                mapp.addSource('marker',intiMarker);
                /*mapp.addLayer({
                    "id": "route",
                    "type": "line",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                "coordinates": [
                                    [-122.48369693756104, 37.83381888486939],
                                    [-122.48348236083984, 37.83317489144141],
                                    [-122.48339653015138, 37.83270036637107],
                                    [-122.48356819152832, 37.832056363179625],
                                    [-122.48404026031496, 37.83114119107971],
                                    [-122.48404026031496, 37.83049717427869],
                                    [-122.48348236083984, 37.829920943955045],
                                    [-122.48356819152832, 37.82954808664175],
                                    [-122.48507022857666, 37.82944639795659],
                                    [-122.48610019683838, 37.82880236636284],
                                    [-122.48695850372314, 37.82931081282506],
                                    [-122.48700141906738, 37.83080223556934],
                                    [-122.48751640319824, 37.83168351665737],
                                    [-122.48803138732912, 37.832158048267786],
                                    [-122.48888969421387, 37.83297152392784],
                                    [-122.48987674713133, 37.83263257682617],
                                    [-122.49043464660643, 37.832937629287755],
                                    [-122.49125003814696, 37.832429207817725],
                                    [-122.49163627624512, 37.832564787218985],
                                    [-122.49223709106445, 37.83337825839438],
                                    [-122.49378204345702, 37.83368330777276]
                                ]
                            }
                        }
                    },
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": "#FFF",
                        "line-width": 8
                    }
                });*/
                mapp.addLayer({
                    "id": "point",
                    "source": "marker",
                    "type": "circle",
                    "paint": {
                        "circle-radius": 10,
                        "circle-color": "#007cbf"
                    },
                    "filter": ["==", "$type", "Point"]
                });
                var destination = [
                    [-122.48369693756104, 37.83381888486939],
                    [-122.48348236083984, 37.83317489144141],
                    [-122.48339653015138, 37.83270036637107],
                    [-122.48356819152832, 37.832056363179625],
                    [-122.48404026031496, 37.83114119107971],
                    [-122.48404026031496, 37.83049717427869],
                    [-122.48348236083984, 37.829920943955045],
                    [-122.48356819152832, 37.82954808664175],
                    [-122.48507022857666, 37.82944639795659],
                    [-122.48610019683838, 37.82880236636284],
                    [-122.48695850372314, 37.82931081282506],
                    [-122.48700141906738, 37.83080223556934],
                    [-122.48751640319824, 37.83168351665737],
                    [-122.48803138732912, 37.832158048267786],
                    [-122.48888969421387, 37.83297152392784],
                    [-122.48987674713133, 37.83263257682617],
                    [-122.49043464660643, 37.832937629287755],
                    [-122.49125003814696, 37.832429207817725],
                    [-122.49163627624512, 37.832564787218985],
                    [-122.49223709106445, 37.83337825839438],
                    [-122.49378204345702, 37.83368330777276]
                ];
                var count = 1;
                var decimal = 7;
                var timestamp = 0;
                function updateMarker() {

                    if (mapp.getSource('marker')) {
                        var increment = 0;
                        increment=timestamp*0.01;

                        var lngLtd = mapp.getSource('marker')._data.features[0].geometry.coordinates;
                        var newLng = interpolate(destination[count-1][0],destination[count][0],increment);
                        var newLat = interpolate(destination[count-1][1],destination[count][1],increment);

                        if(lngLtd[0].toFixed(decimal) == destination[count][0].toFixed(decimal) && lngLtd[1].toFixed(decimal) == destination[count][1].toFixed(decimal)){
                            timestamp = 0;
                            if(count < destination.length-1)
                                count++;
                            else{return;}
                        }
                        mapp.getSource('marker').setData(geoMarker([[newLng,newLat]]).data);
                        requestAnimationFrame(updateMarker);
                        timestamp++;
                    }
                }

                function interpolate(from, to, precision) {
                    var res =  (from * (1 - precision)) + (to * precision);
                    return res;
                }

                function geoMarker(coords) {
                    var Geoj = {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features":[]
                        }
                    };
                    console.log(coords);
                    coords.forEach(function(coord,index){
                        Geoj.data.features.push({
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": coord
                            },
                            "properties":{
                                "id": index
                            }
                        });
                        //console.log(coord);
                    });
                    return Geoj;
                }


                updateMarker();

            });

            mapp.on('mousemove',function (e) {
                var features = mapp.queryRenderedFeatures(e.point,{ layers: ['point']})
                if(features.length){
                    console.log(features);
                }
            });
        });


        // Methods




        function handleMarkerClick() {
            console.log("clicked");
        }

        //////////
    }
})();
