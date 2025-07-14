<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAutoNumberSettingsTable extends Migration
{
    public function up(): void
    {
        Schema::create('auto_number_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('module_name'); // 'supplier', 'client', etc.
            $table->string('current_number')->default('000001');
            $table->unsignedInteger('digits')->default(6);
            $table->string('prefix')->nullable();
            $table->boolean('add_prefix')->default(false);
            $table->boolean('require_unique')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('auto_number_settings');
    }
}
