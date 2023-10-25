<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    protected $fillable = [
        'Job_title',
        'Job_description',
        'Job_requirement',
        'Status',
    ];
    use HasFactory;
    public function deleteJob()
    {
        return $this->hasMany(AppliedJob::class, 'job_id');
    }
}
