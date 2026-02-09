<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('client_name')->nullable()->after('uuid');
            $table->string('client_email')->nullable()->after('client_name');
            $table->string('client_whatsapp')->nullable()->after('client_email');
            $table->string('company')->nullable()->after('client_whatsapp');
            $table->text('note')->nullable()->after('company');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['client_name', 'client_email', 'client_whatsapp', 'company', 'note']);
        });
    }
};
