angular.module('weightLossService', [])
    .constant('USER_ID', '0b13e52d-b058-32fb-8507-10dec634a07c') //@todo temporary!
    .factory('weightLossService', function (apiService, USER_ID) {


        // Private methods, namespaced for code clarity
        var privateMethods = {

            userId: null,

            /**
             * Set user for this service
             * @returns {privateMethods}
             */
            setUser: function(){

                this._userId = USER_ID; //@todo retrieve from jwt token

                return this;
            },

            /**
             * Get user's goal
             * @returns {*}
             */
            getGoal: function(){
                return apiService.get('/users/'+this._userId+'/goal').then(function(res){

                    var goal = res.data.data; //@todo unwrap response in api

                    goal.weight_goal = Number(goal.weight_goal); //cast to number @todo make sure the API typecasts

                    return goal;
                }).catch(function(err){
                    console.error(err);
                });
            },

            /**
             * Get all user's logs
             * @returns {*}
             */
            getLogs: function(){
                return apiService.get('/users/'+this._userId+'/logs').then(function(res){

                    var weightLogs = res.data.weight_logs;

                    weightLogs = _.chain(weightLogs)
                        .map(function(log){
                            log.weight = Number(log.weight); //@todo typecast in API
                            return log;
                        })
                        .sortBy(function(weightLog){
                            return new Date(weightLog.date).valueOf();
                        })
                        .value()
                        .reverse()
                    ;

                    return weightLogs; //@todo unwrap response in api
                }).catch(function(err){
                    console.error(err);
                });
            }

        };

        var publicMethods = function(){

            return {

                /**
                 * Get users goal
                 * @returns {*}
                 */
                getGoal: function(){
                    return privateMethods.setUser().getGoal();
                },

                /**
                 * Get all user's logs
                 * @returns {*}
                 */
                getLogs: function(){
                    return privateMethods.setUser().getLogs();
                }

            };

        };

        return publicMethods();
    })
;