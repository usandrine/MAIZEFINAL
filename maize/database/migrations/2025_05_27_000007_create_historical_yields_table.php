<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('historical_yields', function (Blueprint $table) {
            $table->bigIncrements('hist_id');
            $table->string('region_or_field', 100);
            $table->integer('year');
            $table->decimal('yield_t_ha', 8, 3);
            $table->string('source', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historical_yields');
    }
};
