angular.module('app.public.weightloss', [])


    .config(function(stateHelperServiceProvider) {
        stateHelperServiceProvider.addState('app.public.weightloss', {
            url: '/weightloss',
            views: {
                "main@app.public": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'app.public.weightloss.controller',
                    templateUrl: 'templates/app/public/weightloss/weightloss.tpl.html'
                }
            },
            resolve: /*@ngInject*/{
                user: function(userService){
                    return userService.getUser();
                },
                currentGoal: function(weightLossService){
                    return weightLossService.getGoal();
                },
                allLogs: function(weightLossService){
                    return weightLossService.getLogs()
                }
            },
            data: {
                title: "Home",
                role: 'public'
            }
        });
    })

    .controller('app.public.weightloss.controller', function($scope, currentGoal, allLogs, user) {

        $scope.user = user;
        $scope.currentGoal = currentGoal;
        $scope.allLogs = allLogs;


        $scope.relativeGoalInfo = {};

        var reloadGoalPhrase = function(){

            var goal = Number($scope.currentGoal.weight_goal);
            var latestLog = Number(_.last($scope.allLogs).weight);

            $scope.relativeGoalInfo.value = Math.abs(goal - latestLog).toFixed(1);

            if (goal < latestLog){
                $scope.relativeGoalInfo.phrase = 'over';
            }else if (latestLog > goal){
                $scope.relativeGoalInfo.phrase = 'under';
            }else{
                $scope.relativeGoalInfo.phrase = 'on';
            }

        };

        reloadGoalPhrase();

    })

;