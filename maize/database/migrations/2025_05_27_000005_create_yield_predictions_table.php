<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('yield_predictions', function (Blueprint $table) {
            $table->bigIncrements('prediction_id');
            $table->uuid('field_id');
            $table->string('model_version', 50);
            $table->date('prediction_date');
            $table->decimal('predicted_yield_t_ha', 8, 3);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();

            $table->foreign('field_id')->references('field_id')->on('fields')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('yield_predictions');
    }
};
