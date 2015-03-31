<?php


use Faker\Factory as Faker;
use Carbon\Carbon as Carbon;

class UserStorySeeder extends Seeder {

    private $faker;

    public function __construct(){

        $this->faker = Faker::create('au_AU');

    }

    private function createUser($email = null, $seed = null){


        $faker = $this->faker;

        if ($seed){

            $faker->seed($seed);
        }

        if ($email == null){
            $email = $faker->email;
        }

        $user = new User([
            'user_id' => $userId = $faker->uuid,
            'email' => $email,
            'password' => Hash::make('password'),
            'first_name' => $faker->firstName,
            'last_name' => $faker->lastName,
            'phone' => $faker->phoneNumber,
            'mobile' => $faker->phoneNumber,
        ]);

        $user->timestamps = true;
        $user->save();

        return $userId;

    }

    private function addUserGoal($userId){

        $faker = $this->faker;

        $user = new WeightGoal([
            'weight_goal_id' => $faker->uuid,
            'user_id' => $userId,
            'weight_goal' => $goal = $faker->randomFloat(1, 50, 90),
        ]);

        $user->timestamps = true;
        $user->save();

        return $goal;

    }

    private function addUserLog($userId, $dateTime, $goalWeight){

        $faker = $this->faker;

        $user = new WeightLog([
            'weight_log_id' => $faker->uuid,
            'user_id' => $userId,
            'date' => $dateTime,
            'weight' => $faker->randomFloat(1, $goalWeight, $goalWeight+15)
        ]);

        $user->timestamps = true;
        $user->save();

    }

    private function createUserWeightData($userId = false){

        if (!$userId){
            $userId = $this->createUser();
        }

        $goal = $this->addUserGoal($userId);

        $date = Carbon::now();

        foreach(range(0, 90) as $day){ //3 months worth of data

            $date->subDay(1);

            if ($this->faker->boolean(20)){ //20% of the time log every day
                $this->addUserLog($userId, clone $date, $goal);
            }

        }

    }

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{

        $userId = $this->createUser('john.smith@example.com', 1);
        $this->createUserWeightData($userId); //seed the base user

        foreach(range(0, 9) as $index){

            $this->createUserWeightData();

        }



	}

}
