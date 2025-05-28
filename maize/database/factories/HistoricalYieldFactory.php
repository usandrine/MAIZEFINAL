<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class HistoricalYieldFactory extends Factory
{
    public function definition(): array
    {
        return [
            'region_or_field' => $this->faker->word(),
            'year' => $this->faker->year(),
            'yield_t_ha' => $this->faker->randomFloat(3, 0, 20),
            'source' => $this->faker->company(),
        ];
    }
}
