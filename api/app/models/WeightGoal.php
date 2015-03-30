<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;

class WeightGoal extends BaseModel implements UserInterface {

	use UserTrait;


    const PRIMARY_KEY = 'weight_goal_id';

    protected $primaryKey = self::PRIMARY_KEY;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'weight_goals';

    public function user(){
        return $this->belongsTo('User');
    }

}
