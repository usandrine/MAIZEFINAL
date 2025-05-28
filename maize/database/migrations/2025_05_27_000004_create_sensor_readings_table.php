<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sensor_readings', function (Blueprint $table) {
            $table->bigIncrements('reading_id');
            $table->uuid('sensor_id');
            $table->timestamp('timestamp');
            $table->float('value');
            $table->timestamps();

            $table->index(['sensor_id', 'timestamp']);
            $table->foreign('sensor_id')->references('sensor_id')->on('sensors')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sensor_readings');
    }
};
