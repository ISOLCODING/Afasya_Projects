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
        Schema::table('content_pages', function (Blueprint $table) {
            $table->string('menu_icon')->nullable()->after('is_in_menu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('content_pages', function (Blueprint $table) {
            $table->dropColumn('menu_icon');
        });
    }
};
