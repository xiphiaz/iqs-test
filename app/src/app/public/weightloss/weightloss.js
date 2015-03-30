angular.module('app.public.weightloss', [])

    .config(function(stateHelperServiceProvider) {
        stateHelperServiceProvider.addState('app.public.weightloss', {
            url: '/',
            views: {
                "main@app.public": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'app.public.weightloss.controller',
                    templateUrl: 'templates/app/public/weightloss/weightloss.tpl.html'
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

    .controller('app.public.weightloss.controller', function($scope) {


    })

;