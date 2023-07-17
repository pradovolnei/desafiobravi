<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'success' => 1,
                'message' => 'Login bem-sucedido!',
                'user' => $user,
            ], 200);
        } else {
            return response()->json([
                'success' => 0,
                'message' => 'Credenciais inválidas.',
            ], 401);
        }
    }

    public function yourMethod()
    {
        $user = Auth::user();
        
        // Resto da lógica do seu método
        
        // Exemplo de retorno de resposta JSON com o usuário autenticado
        return response()->json([
            'user' => $user,
            'message' => 'Endpoint protegido acessado com sucesso.'
        ]);
    }
}
