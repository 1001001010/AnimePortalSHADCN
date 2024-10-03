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
        Schema::create('grops', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->integer('unix')->unique();
            $table->string('password');
            $table->unsignedBigInteger('anime_id');
            $table->timestamps();

            $table->foreign('anime_id')->references('id')->on('animes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grops');
    }
};
