<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RecommendationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'field_id' => null, // Set in seeder or test
            'recommendation_date' => $this->faker->date(),
            'recommendation_type' => $this->faker->randomElement(['irrigation', 'fertilizer_timing']),
            'message' => $this->faker->sentence(),
            'created_at' => $this->faker->dateTime(),
        ];
    }
}
