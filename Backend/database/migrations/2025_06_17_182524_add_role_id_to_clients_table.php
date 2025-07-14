<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->unsignedBigInteger('role_id')->default(3)->after('id');

            // Optional: If roles table exists and has an id of 3 for 'Client'
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });

        // Ensure existing clients have role_id = 3
        DB::table('clients')->update(['role_id' => 3]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
        });
    }
};
