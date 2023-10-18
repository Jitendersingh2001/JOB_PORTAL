<?php

namespace App\Http\Controllers;
use App\Models\Job;

use Illuminate\Http\Request;

class JobController extends Controller
{
    public function CreateJob(Request $request)
    {
        // dd($request);
        $data = [
            'Job_title' => $request->input('Job_title'),
            'Job_description' => $request->input('Job_description'),
            'Job_requirement' => $request->input('Job_requirement'),
        ];
        Job::create($data);
    }
    public function getJobs(){
        $Jobs=Job::all();
        return response()->json(['Jobs' => $Jobs,]);   
    }
    public function DeleteJob($id){
        $job = Job::find($id);
        if($job) {
            $job->deletejob()->delete();
            $job->delete();
    
            return "Delete successful";
        } else {
            return "Job not found";
        }
    }
    
    public function getJob($id)
    {
        $Job=Job::find($id);
        return $Job; 
    }
    public function UpdateJob($id, Request $request) {
        // dd($request->input('status'));
        $job = JOB::find($id);
    
        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        } else {
            $data = [
                'Job_title' => $request->input('Job_title'),
                'Job_description' => $request->input('Job_description'),
                'Job_requirement' => $request->input('Job_requirement'), 
                'Status' => $request->input('status'),
            ];
    
            if ($job->update($data)) {
                return response()->json(['message' => 'Job updated successfully']);
            } else {
                return response()->json(['error' => 'Failed to update the job'], 500);
            }
        }
    }
    
}
