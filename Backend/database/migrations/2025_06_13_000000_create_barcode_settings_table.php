<?php
// database/migrations/2025_06_13_000000_create_barcode_settings_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('barcode_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type')->default('CODE128');
            $table->boolean('enable_weight')->default(false);
            $table->string('embedded_format')->nullable();
            $table->integer('weight_divider')->default(1000);
            $table->integer('currency_divider')->default(100);
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('barcode_settings');
    }
};
