<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SuporteController extends Controller
{
    public function index()
    {
        return view('validar_colchetes.index');
    }

    public function validar(Request $request)
    {
        $string = $request->input('string');
        $resultado = $this->validarColchetes($string);

        return view('validar_colchetes.resultado', compact('resultado'));
    }

    public function validarColchetes($string)
    {
        $abertura = ['(', '{', '['];
        $fechamento = [')', '}', ']'];
        $pilha = [];

        for ($i = 0; $i < strlen($string); $i++) {
            $char = $string[$i];

            if (in_array($char, $abertura)) {
                array_push($pilha, $char);
            } elseif (in_array($char, $fechamento)) {
                if (empty($pilha)) {
                    return false;
                }

                $topo = array_pop($pilha);

                if (($char === ')' && $topo !== '(') ||
                    ($char === '}' && $topo !== '{') ||
                    ($char === ']' && $topo !== '[')) {
                    return false;
                }
            }
        }

        return empty($pilha) ? "Válido" : "Inválido";
    }
    
}
