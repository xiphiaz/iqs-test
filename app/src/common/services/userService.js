angular.module('userService', [])
    .constant('USER_ID', '0b13e52d-b058-32fb-8507-10dec634a07c') //@todo temporary!
    .factory('userService', function (apiService, USER_ID) {


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
             * Retrieve all users
             * @returns {*}
             */
            getAllUsers: function(){

                return apiService.get('/users').then(function(res){
                    return res.data; //@todo unwrap response in api
                }).catch(function(err){
                    console.error(err);
                });

            },

            /**
             * Get one user (the current one)
             * @returns {*}
             */
            getUser: function(){
                return apiService.get('/users/'+this._userId).then(function(res){
                    return res.data.data; //@todo unwrap response in api
                }).catch(function(err){
                    console.error(err);
                });
            }

        };

        var publicMethods = function(){

            return {

                /**
                 * Get all users
                 * @returns {*}
                 */
                getAllUsers: function(){
                    return privateMethods.getAllUsers();
                },

                /**
                 * Get current user
                 * @returns {*}
                 */
                getUser: function(){
                    return privateMethods.setUser().getUser();
                }

            };

        };

        return publicMethods();
    })
;