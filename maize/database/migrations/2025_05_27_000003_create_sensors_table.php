<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sensors', function (Blueprint $table) {
            $table->uuid('sensor_id')->primary();
            $table->uuid('field_id');
            $table->string('sensor_type', 50);
            $table->date('installation_date')->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamps();

            $table->foreign('field_id')->references('field_id')->on('fields')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sensors');
    }
};
