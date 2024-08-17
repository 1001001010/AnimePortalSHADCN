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
        Schema::create('animes', function (Blueprint $table) {
            $table->id();
            $table->enum('age', ['0', '6', '12', '16', '18']);
            $table->enum('status', ['ongoing', 'came_out', 'preview']);
            $table->string('type');
            $table->string('name');
            $table->integer('unix');
            $table->string('original');
            $table->string('studio');
            $table->string('voice');
            $table->string('director');
            $table->string('autor');
            $table->text('description');
            $table->string('cover');
            $table->json('screens');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animes');
    }
};
