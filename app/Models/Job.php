<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        'Job_title',
        'Job_description',
        'Job_requirement',
    ];
    use HasFactory;
}
