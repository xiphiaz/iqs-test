angular.module('app.public.weightloss', [
    'app.public.weightloss.addEditLogModal'
])


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

    .controller('app.public.weightloss.controller', function($scope, currentGoal, allLogs, user, $modal, $filter) {

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
                latestLog = Number(_.first($scope.allLogs).weight),
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

            $scope.updateGraph(); //move goal band
        };



        $scope.promptAddLog = function(){

            return $modal.open({

                templateUrl: 'templates/app/public/weightloss/addEditLogModal/addEditModal.tpl.html',
                controller: 'app.public.weightloss.addEditLogModal.controller',
                size: 'md',
                resolve: {
                    mode: function(){
                        return 'add';
                    },
                    log: function(){
                        return {
                            weight: _.first($scope.allLogs).weight,
                            date: $filter('date')(new Date(), 'mediumDate')
                        }; //new log
                    }
                }

            }).result.then(function(newLog){
                $scope.allLogs.unshift(newLog);
            });

        };

        $scope.promptEditLog = function(log){

            return $modal.open({

                templateUrl: 'templates/app/public/weightloss/addEditLogModal/addEditModal.tpl.html',
                controller: 'app.public.weightloss.addEditLogModal.controller',
                size: 'md',
                resolve: {
                    mode: function(){
                        return 'edit';
                    },
                    log: function(){
                        return _.clone(log); //new log
                    }
                }

            }).result.then(function(editedLog){

            });

        };

        $scope.promptDeleteLog = function(log){

        };


        $scope.chartConfig = {

            options: {
                chart: {
                    type: 'spline'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            symbol: 'circle'
                        }
                    }
                }

            },

            series: [],
            title: {
                text: 'Weight over time'
            },
            loading: false,
            xAxis: {
                title: {text: 'Date'},
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Weight (kg)'
                }
            }
        };


        $scope.updateGraph = function(){

            var chartData = _.reduce(_.clone($scope.allLogs).reverse(), function(result, log, key){

                result.push([new Date(log.date).valueOf(), log.weight]);

                return result;
            }, []);

            $scope.chartConfig.series = [
                {
                    name: "Weight Logged",
                    color: '#5bc0de',
                    data: chartData
                },
                {
                    name: 'Goal line',
                    dashStyle: 'dot',
                    color: 'white',
                    data: [_.last(chartData), [ new Date().valueOf(), $scope.currentGoal.weight_goal ] ]
                }
            ];

            $scope.chartConfig.yAxis.plotBands =  [{
                color: '#5cb85c', // Color value
                from: Number($scope.currentGoal.weight_goal) - 1, // Start of the plot band
                to: Number($scope.currentGoal.weight_goal) + 1 // End of the plot band
            }];

        };

        $scope.updateGraph(); //init



    })

;