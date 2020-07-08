<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class SignupController extends Controller
{
    // Validate username if duplicate
    public function validateUsername(Request $req) {
        $user = User::where(
            'username', $req['username']
        )->get();
        return $user;
    }

    // Sign up
    public function signup(Request $req) {
        User::insert([
            'username' => $req['username'],
            'password' => $req['password'],
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }
}