<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SensorReadingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'sensor_id' => null, // Set in seeder or test
            'timestamp' => $this->faker->dateTime(),
            'value' => $this->faker->randomFloat(2, 0, 100),
        ];
    }
}
