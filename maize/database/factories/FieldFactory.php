<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FieldFactory extends Factory
{
    public function definition(): array
    {
        return [
            'farmer_id' => null, // Set in seeder or test
            'name' => $this->faker->word(),
            'area_ha' => $this->faker->randomFloat(2, 0.1, 100),
            'soil_type' => $this->faker->randomElement(['loam', 'clay', 'sandy']),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'created_at' => $this->faker->dateTime(),
        ];
    }
}
