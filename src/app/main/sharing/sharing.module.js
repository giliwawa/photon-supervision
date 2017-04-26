(function ()
{
    'use strict';

    angular
        .module('app.sharing', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.sharing', {
                url    : '/sharing',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/sharing/feedback.html',
                        controller : 'sharingController as vm'
                    }
                },
                resolve: {
                    sharingData: function (msApi)
                    {
                        return msApi.resolve('sharing@get');
                    }
                }
            });


        // Translation
        $translatePartialLoaderProvider.addPart('app/main/sharing');

        // Api
        msApiProvider.register('sharing', ['app/data/sharing/sharing.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('fuse.sharing', {
            title    : 'daruom',
            icon     : 'icon-tile-four',
            state    : 'app.sharing',
            translate: 'sharing.sharing_NAV',
            weight   : 3
        });
    }
})();
