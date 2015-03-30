<?php

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class WeightLogController extends RestController
{

    public static $entity = 'WeightLog';

    /**
     * Retrieve all logs
     * @param $userId
     * @return \Dingo\Api\Http\ResponseBuilder
     */
    public function getAllLogs($userId){

        //@todo verify user is logged in user (applies to all methods)
        $user = User::findOrFail($userId);

        $logs = $user->weightLogs;

        if (!$logs){
            throw new NotFoundHttpException('No logs found for user');
        }

        return $this->response->item($logs, new BaseTransformer);

    }

    /**
     * Save log
     * @param $userId
     * @param $logId
     * @return \Dingo\Api\Http\ResponseBuilder
     */
    public function saveLog($userId, $logId){

        $log = WeightLog::create(Input::all());

        //@todo validate request, check for duplicate day.

        $log->save();

        return $this->response->created();
    }

    /**
     * Remove Log
     * @param $userId
     * @param $logId
     * @return \Dingo\Api\Http\ResponseBuilder
     */
    public function deleteLog($userId, $logId){

        $user = User::findOrFail($userId); //check user exists @todo check user is current user

        $log = WeightLog::findOrFail($logId);

        $log->delete();

        return $this->response->noContent();

    }

}