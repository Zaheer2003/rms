<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registerdetails', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('businessName');
            $table->string('shopType')->nullable();
            $table->string('shopAddress')->nullable();
            $table->string('shopWorkers')->nullable();
            $table->string('shopCurrency')->nullable();
            $table->string('shopCountry')->nullable();
            $table->string('clerk_user_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registerdetails');
    }
};
