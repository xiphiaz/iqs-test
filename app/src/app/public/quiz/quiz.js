angular.module('app.public.quiz', [])

    .config(function(stateHelperServiceProvider) {
        stateHelperServiceProvider.addState('app.public.quiz', {
            url: '/',
            views: {
                "main@app.public": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'app.public.quiz.controller',
                    templateUrl: 'templates/app/public/quiz/quiz.tpl.html'
                }
            },
            data: {
                title: "Quiz",
                role: 'public'
            }
        });
    })

    .controller('app.public.quiz.controller', function($scope) {


    })

;