<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('nic')->nullable();
            $table->string('dob')->nullable();
            $table->string('mobile', 20);
            $table->string('address1');
            $table->string('address2')->nullable();
            $table->string('city', 100);
            $table->string('state', 100);
            $table->string('postalCode', 20);
            $table->string('country', 100);
            $table->string('code', 100)->nullable();
            $table->string('currency', 10)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('category', 100)->nullable();
            $table->string('invoicingMethod', 100)->nullable();
            $table->text('notes')->nullable();
            $table->string('attachment')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};