<?php

namespace App\Http\Controllers;
use App\Models\Job;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function createJob(Request $request)
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
    public function deleteJob($id){
        $job = Job::find($id);
        if($job) {
            $job->deleteJob()->delete();
            $job->delete();
    
            return __('messages.DELETED');
        } else {
            return "job" .__('messages.NOTFOUND');
        }
    }
    
    public function getJob($id)
    {
        $Job=Job::find($id);
        return $Job; 
    }
    public function updateJob($id, Request $request) {
        // dd($request->input('status'));
        $job = JOB::find($id);
    
        if (!$job) {
            return response()->json(['error' => "job" .__('messages.NOTFOUND')],  Response::HTTP_NOT_FOUND);
        } else {
            $data = [
                'Job_title' => $request->Job_title,
                'Job_description' => $request->Job_description,
                'Job_requirement' => $request->Job_requirement, 
                'Status' => $request->input('status'),
            ];
    
            if ($job->update($data)) {
                return response()->json(['message' => "job" .__('messages.UPDATED')]);

            } else {
                return response()->json(['error' => __('messages.FAILED')], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }
    
}
