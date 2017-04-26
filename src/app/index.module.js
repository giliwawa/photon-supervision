(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // sharing
            'app.sharing',
            'app.feedback',
            //home
            'app.home',
            //carOverview
            'app.carOverview',
            //maintenance
            'app.maintenance',
            'uiGmapgoogle-maps'


        ]);
})();
