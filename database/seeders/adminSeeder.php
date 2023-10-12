<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Admin@123',
            'email' => 'admin123@gmail.com',
            'password' => Hash::make('123456789'),
        ]);
        $role = new Role(['role' => 'admin']);
        $user->roles()->save($role);
    }
}
