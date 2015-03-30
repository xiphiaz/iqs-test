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
                currentGoal: function(userService){
                    return userService.getGoal();
                },
                allLogs: function(userService){
                    return userService.getLogs()
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

    })

;