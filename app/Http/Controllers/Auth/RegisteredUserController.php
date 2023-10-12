<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use App\Models\Role;
use App\Mail\Registration;
use Illuminate\Support\Facades\Mail;
use Twilio\Rest\Client;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // credentials for Twilio
        $twilioConfig = config('services.twilio');

        $account_sid = $twilioConfig['account_sid'];
        $account_token = $twilioConfig['account_token'];
        $number = $twilioConfig['number'];

        
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'], 
            'phone_no' => ['required', 'numeric'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_no' => $request->phone_no,
            'password' => Hash::make($request->password),
        ]);

        $role = new Role();
        $user->roles()->save($role);
        event(new Registered($user));
        Auth::login($user);
        
        // Mail data for email
        $mailData = ['title' => 'WELCOME ' . $user->name, 'body' => CONTENT]; 
        
        // Twilio client for sending an SMS
        $client = new Client($account_sid, $account_token);
        $client->messages->create('+91' . $user->phone_no, [
            'from' => $number,
            'body' => CONTENT, 
        ]);

        // Send a registration email
        if(Mail::to($user->email)->send(new Registration($mailData)))
        {
            return redirect(RouteServiceProvider::HOME);
        }

       
    }
}
