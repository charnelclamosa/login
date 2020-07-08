<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class SigninController extends Controller
{
    // Sign in
    public function signin(Request $req) {
        $user = User::where([
            'username' => $req['username'],
            'password' => $req['password']
        
        ])->get();
        return $user;
    }
}