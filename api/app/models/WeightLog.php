<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;

class WeightLog extends BaseModel implements UserInterface {

	use UserTrait;


    const PRIMARY_KEY = 'weight_log_id';

    protected $primaryKey = self::PRIMARY_KEY;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'weight_logs';

}
