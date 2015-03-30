angular.module('app.public.cut', [])

    .config(function(stateHelperServiceProvider) {
        stateHelperServiceProvider.addState('app.public.cut', {
            url: '/',
            views: {
                "main@app.public": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'app.public.cut.controller',
                    templateUrl: 'templates/app/public/cut/cut.tpl.html'
                }
            },
            resolve: /*@ngInject*/{
            },
            data: {
                title: "Home",
                role: 'public'
            }
        });
    })

    .controller('app.public.cut.controller', function($scope) {


    })

;