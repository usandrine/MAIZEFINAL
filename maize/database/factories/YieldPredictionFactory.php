<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class YieldPredictionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'field_id' => null, // Set in seeder or test
            'model_version' => 'v' . $this->faker->randomFloat(1, 1, 2),
            'prediction_date' => $this->faker->date(),
            'predicted_yield_t_ha' => $this->faker->randomFloat(3, 0, 20),
            'created_at' => $this->faker->dateTime(),
        ];
    }
}
