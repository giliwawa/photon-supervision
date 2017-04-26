/**
 * Created by HDMI on 4/26/2017.
 */
(function ()
{
  'use strict';

  angular
    .module('app.feedback', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
  {
    // State
    $stateProvider
      .state('app.feedback', {
        url    : '/feedback',
        views  : {
          'content@app': {
            templateUrl: 'app/main/feedback/feedback.html',
            controller : 'feedbackController as vm'
          }
        },
        resolve: {
          feedbackData: function (msApi)
          {
            return msApi.resolve('feedback@get');
          }
        }
      });


    // Translation
    $translatePartialLoaderProvider.addPart('app/main/feedback');

    // Api
    msApiProvider.register('feedback', ['app/data/feedback/feedback.json']);

    // Navigation

    msNavigationServiceProvider.saveItem('fuse.feedback', {
      title    : 'hdmi',
      icon     : 'icon-tile-four',
      state    : 'app.feedback',
      translate: 'feedback.feedback_NAV',
      weight   : 3
    });
  }
})();
