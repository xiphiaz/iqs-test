<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


Route::api('v1', function () {

    Route::group(['prefix' => 'users'], function () {

        Route::get('/', 'UserController@getAll');
        Route::get('/{id}', 'UserController@getOne');


        //Goal
        Route::get('/{id}/goal', 'WeightGoalController@getGoal');
        Route::put('/{id}/goal', 'WeightGoalController@saveGoal');

        Route::get('/{id}/logs', 'WeightLogController@getAllLogs');
        Route::get('/{id}/logs/{date}', 'WeightLogController@getOneLog');
        Route::put('/{id}/logs/{date}', 'WeightLogController@saveLog');
        Route::delete('/{id}/logs/{date}', 'WeightLogController@removeLog');


    });




});