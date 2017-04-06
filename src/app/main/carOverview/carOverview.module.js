(function ()
{
    'use strict';

    angular
        .module('app.carOverview', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.car-overview', {
                url    : '/car-overview',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/carOverview/carOverview.html',
                        controller : 'CarOverviewController as vm'
                    },
                    'map-view@app.car-overview': {
                        templateUrl: 'app/main/carOverview/map/map.html',
                        controller : 'MapController as vm'
                    }
                },
                resolve: {
                    carOverviewData: function (msApi)
                    {
                        return msApi.resolve('carOverview@get');
                    },

                }
            });

        // Translation
        //$translatePartialLoaderProvider.addPart('app/main/sharing');

        // Api
        msApiProvider.register('carOverview', ['app/data/carOverview/carOverview.json']);
        // Navigation

        msNavigationServiceProvider.saveItem('fuse.carOverview', {
            title    : 'Car Overview',
            icon     : 'icon-tile-four',
            state    : 'app.car-overview',
            /*stateParams: {
             'param1': 'page'
             },*/
            //translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 2
        });
    }
})();
