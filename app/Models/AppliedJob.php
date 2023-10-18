<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppliedJob extends Model
{
    protected $fillable = [
        'job_id',
        'user_id',
        'status',
    ];
    use HasFactory;
}
