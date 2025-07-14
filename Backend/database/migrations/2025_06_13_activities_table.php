<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('icon_bg')->nullable();
            $table->string('icon')->nullable();
            $table->timestamp('date')->useCurrent();
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('activities');
    }
};
