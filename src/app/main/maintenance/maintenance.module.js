(function ()
{
  'use strict';

  angular
    .module('app.maintenance', [])
    .config(config);

  /** @ngInject */
  function config(uiGmapGoogleMapApiProvider,$mdThemingProvider,$stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
  {
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    uiGmapGoogleMapApiProvider.configure({
      china: true,
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
      });
    // State
    $stateProvider
      .state('app.maintenance', {
        url    : '/maintenance',
        views  : {
          'content@app': {
            templateUrl: 'app/main/maintenance/maintenance.html',
            controller : 'MaintenanceController as vm'
          },
          'parc@app.maintenance' : {
            templateUrl: 'app/main/maintenance/cards/main.html',
            controller : 'ParcController as cm'
          }
        },
        resolve: {
          maintenanceData: function (msApi)
          {
            return msApi.resolve('cars@query');
          }

        }
      });

    // Translation
    //$translatePartialLoaderProvider.addPart('app/main/sharing');

    // Api
    msApiProvider.register('cars', ['http://localhost:4000/cars']);

    // Navigation

    msNavigationServiceProvider.saveItem('fuse.maintenance', {
      title    : 'Maintenance',
      icon     : 'icon-tile-four',
      state    : 'app.maintenance',
      weight   : 4
    });
  }
})();
