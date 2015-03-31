angular.module('app.public.weightloss.addEditLogModal', [])


    .controller('app.public.weightloss.addEditLogModal.controller', function($modalInstance, $scope, mode, log) {

        $scope.log = log;
        $scope.mode = mode;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.addLog = function(log){

        };

        $scope.saveLog = function(log){

        };

        $scope.opened = false;
        $scope.openDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };


    })

;