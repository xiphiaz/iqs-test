<?php

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class WeightGoalController extends RestController
{

    public static $entity = 'WeightGoal';

    /**
     * Get user's goal
     * @param $userId
     * @return \Dingo\Api\Http\ResponseBuilder
     */
    public function getGoal($userId){

        //@todo check auth user is this user (applies to all methods)
        $user = User::findOrFail($userId);

        $goal = $user->weightGoal;

        if (!$goal){
            throw new NotFoundHttpException('Goal not found for user');
        }

        return $this->response->item($goal, new BaseTransformer);

    }

    /**
     * Save user's goal
     * @param $userId
     * @return \Dingo\Api\Http\ResponseBuilder
     */
    public function saveGoal($userId){

        $log = WeightGoal::create(Input::all());

        //@todo validate request, check for existing.

        $log->save();

        return $this->response->created();
    }

}