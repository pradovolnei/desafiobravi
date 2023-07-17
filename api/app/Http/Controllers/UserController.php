<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
    {
        if($request->password != $request->confirm_password)
            return response()->json([
                'message' => '*Senhas diferentes*',
            ], 201);

        $verify_email = User::where("email", $request->email)->count();
        if($verify_email > 0)
            return response()->json([
                'message' => '*E-mail já cadastrado*',
            ], 201);

        // Validação dos dados de entrada
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Criptografar a senha com SHA1
        $validatedData['password'] = bcrypt($validatedData['password']);

        // Criação do novo usuário
        $user = User::create($validatedData);

        // Retorno da resposta
        return response()->json([
            'message' => 'Usuário criado com sucesso!',
            'user' => $user,
        ], 201);
    }
    
}
