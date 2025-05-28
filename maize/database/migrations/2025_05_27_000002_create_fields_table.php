<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('fields', function (Blueprint $table) {
            $table->uuid('field_id')->primary();
            $table->uuid('farmer_id');
            $table->string('name', 100);
            $table->decimal('area_ha', 6, 2);
            $table->string('soil_type', 50)->nullable();
            $table->decimal('latitude', 9, 6)->nullable();
            $table->decimal('longitude', 9, 6)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();

            $table->foreign('farmer_id')->references('farmer_id')->on('farmers')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fields');
    }
};
