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

    /**
     * @return \Dingo\Api\Http\ResponseBuilder
     * @throws ValidationException
     */
    public function saveUserSummary()
    {

        $dt = new Carbon\Carbon();
        $before = $dt->subYears(20)->format('Y-m-d');

        $rules = array(
            'headline' => 'required|max:100',
            'bodytext' => 'required',
            'dob' => 'required|date|before:' . $before,
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {

            $messages = $validator->messages();

            throw new ValidationException($messages);

        }

        $userSummary = new UserSummary;
        $userSummary->headline = Input::get('name');
        $userSummary->bodytext = Input::get('email');
        $userSummary->dob = Carbon::createFromFormat('d/m/Y', Input::get('dob'))->format('Y-m-d');

        $userSummary->save();

        return $this->response->noContent();

    }

}