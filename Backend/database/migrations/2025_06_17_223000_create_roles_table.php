<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // Admin, Employee, Client
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Insert the three roles
        \DB::table('roles')->insert([
            ['name' => 'Admin', 'description' => 'System Owner/Admin', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Employee', 'description' => 'Employee User', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Client', 'description' => 'Client User', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
