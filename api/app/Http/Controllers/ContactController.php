<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $contacts = Contact::where('user_id', $user->id)->get();

        return response()->json($contacts);
    }

    public function show($user_id)
    {
        $contacts = Contact::where('user_id', $user_id)->get();

        return response()->json($contacts);
    }

    public function showContact($id)
    {
        $contact = Contact::findOrFail($id);

        return response()->json($contact);
    }

    public function store(Request $request, $user_id)
    {
        $contact = new Contact([
            'user_id' => $user_id,
            'contact_name' => $request->input('contact_name'),
            'phone' => $request->input('phone'),
            'whatsapp' => $request->input('whatsapp'),
            'email' => $request->input('email'),
        ]);

        $contact->save();

        return response()->json($contact, 201);
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json([
            'message' => 'Contato excluído com sucesso.'
        ]);
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update($request->all());

        return response()->json($contact);
    }
}
