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


        $scope.relativeGoalInfo = {
            value: 0,
            phrase: '',
            colour: 'default'
        };

        var reloadGoalPhrase = function(){

            var goal = Number($scope.currentGoal.weight_goal),
                latestLog = Number(_.last($scope.allLogs).weight),
                absValue = Math.abs(goal - latestLog).toFixed(1),
                successRange = 2,
                phrase, colour
            ;

            if (absValue === 0){
                phrase = 'at';
                colour = 'success';
            }else if (absValue < successRange){
                phrase = 'within '+successRange+' kgs of';
                colour = 'success';
            }else if (goal < latestLog){
                phrase = 'over';
                colour = 'danger';
            }else if (goal > latestLog){
                phrase = 'under';
                colour = 'warning';
            }
            
            return {
                current: latestLog,
                value: absValue,
                phrase: phrase,
                colour: colour
            };

        };

        $scope.relativeGoalInfo = reloadGoalPhrase(); //init

        $scope.goalUpdated = function(){
            $scope.relativeGoalInfo = reloadGoalPhrase();
        };



    })

;