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
            'Job_requirement' => $request->input('Job_requirment'),
        ];
        Job::create($data);
    }
    public function getJobs(){
        $Jobs=Job::all();
        return response()->json(['Jobs' => $Jobs,]);   
    }
    public function DeleteJob($id){
        $Jobs=Job::find($id)->delete();
        if($Jobs)
        {
          return "delete sucessfull";
        }
        else{
          return "fail";
        }
    }
}