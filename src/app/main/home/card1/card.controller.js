(function ()
{
    'use strict';

    angular
        .module('app.home')
        .controller('Card1Controller', Card1Controller);

    /** @ngInject */
    function Card1Controller(card1data,$scope)
    {
        var vm = this;
        vm.cardModel={};
        vm.cardModel.index = 0;
        vm.cardModel.onClick={};
        vm.charts = [];
        // Data
        $scope.$on('chart-create', function (evt, chart) {
            console.log(vm.charts.length);
            vm.charts.push(chart);
        });
        console.log(card1data);
        vm.cardModel= card1data;
        vm.cardModel.onClick = function (point, event) {
            vm.cardModel.bar.data[0] = vm.cardModel.bar.dataMatrice[point[0]._index];
            vm.cardModel.bar.series[0] = point[0]._model.label;
            $scope.$apply(function(){
                vm.cardModel;
            })
        }
        // Methods

        //////////
    }
})();
