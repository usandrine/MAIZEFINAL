<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SensorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'field_id' => null, // Set in seeder or test
            'sensor_type' => $this->faker->randomElement(['soil_moisture', 'temperature', 'humidity']),
            'installation_date' => $this->faker->date(),
            'status' => $this->faker->randomElement(['active', 'maintenance', 'retired']),
        ];
    }
}
