<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;

class AppliedJob extends Model
{
    protected $fillable = [
        'job_id',
        'user_id',
        'status',
    ];
    use HasFactory;
    public function Jobs(){
        return $this->belongsTo(Job::class, 'job_id');
    }
    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
