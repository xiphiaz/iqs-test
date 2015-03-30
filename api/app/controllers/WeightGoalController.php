<?php

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class WeightGoalController extends RestController
{

    public static $entity = 'WeightGoal';

    public function getGoal($userId){

        $user = User::findOrFail($userId);

        $goal = $user->weightGoal;

        if (!$goal){
            throw new NotFoundHttpException('Goal not found for user');
        }

        return $this->response->item($goal, new BaseTransformer);

    }

}