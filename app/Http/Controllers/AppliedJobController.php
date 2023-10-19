<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppliedJobMail;
use App\Models\AppliedJob;
use App\Models\Role;
use App\Models\User;
use App\Models\Job;
use App\Events\SendNotification;
use Illuminate\Http\Request;
use Twilio\Rest\Client;

class AppliedJobController extends Controller
{
    public function applyJob(Request $request)
    {
         // credentials for Twilio
         $twilioConfig = config('services.twilio');

         $account_sid = $twilioConfig['account_sid'];
         $account_token = $twilioConfig['account_token'];
         $number = $twilioConfig['number'];

        $adminRole=Role::where('role', 'admin')->first();
        $adminId = $adminRole->user_id; 
        // dd($request);
        $userId = $request->input('userId'); 
        $user=User::find($userId);
        $jobId = $request->input('jobId');
        $job=Job::find($jobId);
        $jobTitle=$job->job_title;
        $existingApplication = AppliedJob::where('user_id', $userId)->where('job_id', $jobId)->first();

        if (!$existingApplication) {
            AppliedJob::create([
                'user_id' => $userId,
                'job_id' => $jobId,
            ]);
            event(new SendNotification('Job applied successfully', $adminId,$user->name));
             // Twilio client for sending an SMS
      
        $client = new Client($account_sid, $account_token);
        $smsHead = "Applied for $jobTitle"; 
        $smsBody = JOBCONTENT; 
        $client->messages->create('+91' . $user->Phone_no, [
            'from' => $number,
            'body' => $smsHead . "\n" . $smsBody, 
        ]);
        $mailData = [ 'title' => 'Welcome ' . $user->name,  'body' => JOBCONTENT,'JobTitle'=>$jobTitle]; 
        if(Mail::to($user->email)->send(new AppliedJobMail($mailData)))
        {
            return response()->json(['message' => 'Job applied successfully']);
        }
           
        } else {
            return response()->json([
                'message' => 'Job application already exists'], 302);
        }

    }
    public function GetAppliedJobs() {
        return AppliedJob::select('job_id')->distinct()->with('Jobs')->get();
    }
    public function GetAppliedCanditates($id)
    {
        return AppliedJob::select('user_id')->where('job_id', $id)->with("users")->get();
    }
    public function UpdateStatus($jobId, Request $request) {
        foreach ($request->all() as $item) {
            $userId = $item['userId'];
            $status = $item['status'];
            $appliedJob = AppliedJob::where('job_id', $jobId)->where('user_id', $userId)->first();
            if ($appliedJob) {
                $appliedJob->update(['status' => $status]);
           
                    $user = User::find($userId);
    
                    if ($user) {
                        $userName = $user->name;
                        event(new SendNotification("Job status updated by Admin", $userId, $userName));
                    }
                
            }
        }
       
        return response()->json(['message' => 'Status updated successfully'], 200);
    }
    
    
    
    public function GetAppliedJob($userid)
    {
       return AppliedJob::where('user_id', $userid)->with('Jobs')->get();
    }
    
    
    
    
}
