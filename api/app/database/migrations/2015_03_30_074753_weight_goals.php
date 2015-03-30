<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class WeightGoals extends Migration {

    const TABLE_NAME = 'weight_goals';

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create(static::TABLE_NAME, function(Blueprint $table)
            {
                $table->engine = 'InnoDB';

                $table->char('weight_goal_id', 36);
                $table->char('user_id', 36);
                $table->float('weight_goal');

                $table->dateTime('created_at');
                $table->dateTime('updated_at');

                $table->primary('weight_goal_id');

                $table->unique(['user_id', 'weight_goal']); //user can only have one goal
                $table->foreign('user_id')->references('user_id')->on('users');
            }
        );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop(static::TABLE_NAME);
	}

}
