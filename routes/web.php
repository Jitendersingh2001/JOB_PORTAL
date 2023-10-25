<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\AppliedJobController;
use App\Http\Controllers\PusherController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
//Job Routes
Route::post('/job',[JobController::class,'createJob']);
Route::get('/job',[JobController::class,'getJobs']);
Route::delete('/job/{id}',[JobController::class,'deleteJob']);
Route::get('/job/{id}',[JobController::class,'getJob']);
Route::post('/updateJob/{id}',[JobController::class,'updateJob']);
//Applied Job Route
Route::post('/applyjob',[AppliedJobController::class,'ApplyJob']);
Route::get('/applied_jobs',[AppliedJobController::class,'getAppliedJobs']);
Route::get('/appliedjobs/{id}',[AppliedJobController::class,'getAppliedJob']);
Route::post('/getCanditates/{id}',[AppliedJobController::class,'getAppliedCanditates']);
Route::post('/updateCandidateStatus/{id}',[AppliedJobController::class,'UpdateStatus']);

//Auth Routes
Route::get('/dashboard', [AuthenticatedSessionController::class,'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
