(function ()
{
    'use strict';

    angular
        .module('app.home', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.home', {
                url    : '/home',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/home/home.html',
                        controller : 'HomeController as vm'
                    },
                    'card1@app.home' : {
                        templateUrl: 'app/main/home/card1/card.html',
                        controller : 'Card1Controller as cm'
                    }
                },
                resolve: {
                    homeData: function (msApi)
                    {
                        return msApi.resolve('home@get');
                    },
                    card1data: function (msApi)
                    {
                        return msApi.resolve('card1@get');
                    }
                }
            });

        // Translation
        //$translatePartialLoaderProvider.addPart('app/main/sample');

        // Api
        msApiProvider.register('home', ['app/data/home/home.json']);
        msApiProvider.register('card1', ['app/data/home/card1.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('fuse.home', {
            title    : 'Home',
            icon     : 'icon-tile-four',
            state    : 'app.home',
            /*stateParams: {
             'param1': 'page'
             },*/
            //translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });
    }
})();