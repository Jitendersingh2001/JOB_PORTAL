<?php

namespace App\Http\Controllers;
use App\Models\AppliedJob;

use Illuminate\Http\Request;

class AppliedJobController extends Controller
{
    public function applyJob(Request $request)
    {
        // dd($request);
        $userId = $request->input('userId'); 
        $jobId = $request->input('jobId');
        $existingApplication = AppliedJob::where('user_id', $userId)->where('job_id', $jobId)->first();

        if (!$existingApplication) {
            AppliedJob::create([
                'user_id' => $userId,
                'job_id' => $jobId,
            ]);
            return response()->json(['message' => 'Job applied successfully']);
        } else {
            return response()->json([
                'message' => 'Job application already exists'], 302);
        }
    }
}
