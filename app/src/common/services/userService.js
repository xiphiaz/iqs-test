angular.module('userService', [])
    .constant('USER_ID', '0b13e52d-b058-32fb-8507-10dec634a07c') //@todo temporary!
    .factory('userService', function (apiService, USER_ID) {


        // Private methods, namespaced for code clarity
        var privateMethods = {

            userId: null,

            setUser: function(){

                this._userId = USER_ID; //@todo retrieve from jwt token

                return this;
            },

            getAllUsers: function(){

                return apiService.get('/users').then(function(res){
                    return res.data; //@todo unwrap response in api
                }).catch(function(err){
                    console.error(err);
                });

            },

            getUser: function(){
                return apiService.get('/users/'+this._userId).then(function(res){
                    return res.data.data; //@todo unwrap response in api
                }).catch(function(err){
                    console.error(err);
                });
            },

            getGoal: function(){
                return apiService.get('/users/'+this._userId+'/goal').then(function(res){
                    return res.data.data; //@todo unwrap response in api
                }).catch(function(err){
                    console.error(err);
                });
            },

            getLogs: function(){
                return apiService.get('/users/'+this._userId+'/logs').then(function(res){
                    return res.data.weight_logs; //@todo unwrap response in api
                }).catch(function(err){
                    console.error(err);
                });
            }

        };

        var publicMethods = function(){

            return {

                getAllUsers: function(){
                    return privateMethods.getAllUsers();
                },

                getUser: function(){
                    return privateMethods.setUser().getUser();
                },

                getGoal: function(){
                    return privateMethods.setUser().getGoal();
                },

                getLogs: function(){
                    return privateMethods.setUser().getLogs();
                }

            };

        };

        return publicMethods();
    })
;