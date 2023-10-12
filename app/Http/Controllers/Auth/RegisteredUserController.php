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
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $role = new Role();
        $user->roles()->save($role);
        event(new Registered($user));

        Auth::login($user);
        $mailData = ['title' => 'WELCOME ' . $user->name,
    "body"=>"We are thrilled to welcome you to our community! Your successful registration marks the beginning of an exciting journey with us. We're here to assist you every step of the way, and we can't wait to share all that our platform has to offer.

    Feel free to explore and make the most of your membership. If you have any questions or need assistance, please don't hesitate to reach out to our support team"]; 

       if( Mail::to($user->email)->send(new Registration($mailData)))
       {
        return redirect(RouteServiceProvider::HOME);
       }

        
    }
}
