<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\User;
use App\models\EmailVerification;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        $code = Str::random(6);


        EmailVerification::updateOrCreate(
            ['email' => $request->email], // condição de busca
            [ // valores para criar/atualizar
                'name' => $request->name,
                'password' => Hash::make($request->password),
                'code' => $code,
                'expires_at' => Carbon::now()->addMinutes(15),
            ]
        );


        Mail::raw("Your Verify Code is: $code", function ($message) use ($request) {
            $message->to($request->email)->subject('Verify your Email - ReadersVerse');
        });

        return response()->json(['message' => 'Code sent to email informed']);
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string',
        ]);

        $verification = EmailVerification::where('email', $request->email)
            ->where('code', $request->code)
            ->where('expires_at', '>', now())
            ->first();

        if (!$verification) {
            return response()->json(['message' => 'Invalid or Expired Code'], 400);
        }

        $user = User::create([
            'name' => $verification->name,
            'email' => $verification->email,
            'password' => $verification->password,
            'email_verified_at' => now(),
        ]);

        $verification->delete();

        return response()->json(['message' => 'E-mail verified succesful']);
    }

    public function verifyLogin(Request $request)
    {
        $request->validate([
            'email' => 'required | email',
            'password' => 'required'
        ]);

        $userLogin = User::where('email', $request->email)->first();

        if ($userLogin && Hash::check($request->password, $userLogin->password)) {
            $codeLogin = Str::random(6);

            EmailVerification::updateOrCreate(
                ['email' => $request->email],
                [
                    'name' => $userLogin->name, // copia do usuário real
                    'password' => $userLogin->password, // copia do usuário real
                    'code' => $codeLogin,
                    'expires_at' => Carbon::now()->addMinutes(15),
                ]
            );

            Mail::raw("Your verification code is: $codeLogin", function ($message) use ($request) {
                $message->to($request->email)->subject("Verification Code - Readers Verse");
            });
            return response()->json(['message' => 'Code sent to email informed']);
        } else {
            return response()->json(['message' => 'Email or password invalid'], 401);
        }
    }

    public function validateCodeLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string',
        ]);

        $verificationLogin = EmailVerification::where('email', $request->email)
            ->where('code', $request->code)
            ->where('expires_at', '>', now())
            ->first();

        if (!$verificationLogin) {
            return response()->json(['message' => 'Invalid or Expired Code'], 400);
        }

        // Pega o usuário
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Autenticação bem-sucedida - apaga verificação
        $verificationLogin->delete();

        Auth::login($user);

        // Aqui você pode retornar um token, se estiver usando Laravel Sanctum ou JWT
        return response()->json([
            'message' => 'Login verified successfully',
            'user' => $user
        ]);
    }
}
