<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatusToAppliedJobs extends Migration
{
    public function up()
    {
        Schema::table('applied_jobs', function (Blueprint $table) {
            $table->enum('status', ['approved', 'pending', 'reject'])->default('pending');
        });
    }

    public function down()
    {
        Schema::table('applied_jobs', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
}
