<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ClientController extends Controller
{
    public function store(Request $request)
    {
      $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'mobile' => 'required|string|max:20|unique:clients,mobile',
            'address1' => 'required|string|max:255',
            'address2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'postalCode' => 'required|string|max:20',
            'country' => 'required|string|max:100',
            'currency' => 'nullable|string|max:10',
            'email' => 'nullable|email|max:255|unique:clients,email',
            'category' => 'nullable|string|max:100',
            'invoicingMethod' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
            'image' => 'nullable|image|max:2048', 
            'nic' => 'nullable|string|max:50|unique:clients,nic',
            'dob' => 'nullable|string|max:50',
            'status' => 'nullable|string|max:50',
        ]);

        $allowAccess = $request->input('allowAccess', false);
        $sendCredentials = $request->input('sendCredentials', false);
        $generatedPassword = null;
        $user = null;
        if ($allowAccess && $request->email) {
            // Check if user already exists
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                $generatedPassword = bin2hex(random_bytes(4)); // 8-char random password
                $user = User::create([
                    'name' => $request->firstName . ' ' . $request->lastName,
                    'email' => $request->email,
                    'password' => Hash::make($generatedPassword),
                ]);
                // Optionally, set a flag for first login password change
            }
        }

        // Fetch latest client code and increment
        $latestClient = Client::orderByDesc('id')->first();
        if ($latestClient && is_numeric($latestClient->code)) {
            $newCode = (int)$latestClient->code + 1;
        } else {
            $newCode = 1;
        }

        $client = new Client();
        $client->firstName = $request->firstName;
        $client->lastName = $request->lastName;
        $client->mobile = $request->mobile;
        $client->address1 = $request->address1;
        $client->address2 = $request->address2;
        $client->city = $request->city;
        $client->state = $request->state;
        $client->postalCode = $request->postalCode;
        $client->country = $request->country;
        $client->code = $newCode;
        $client->currency = $request->currency;
        $client->email = $request->email;
        $client->category = $request->category;
        $client->invoicingMethod = $request->invoicingMethod;
        $client->notes = $request->notes;
        $client->nic = $request->nic;
        $client->dob = $request->dob;
        $client->status = $request->status;
        $client->role = $request->role ?? 'Client';
        $client->role_id = 3; // Assuming 'Client' role has ID 3
        $client->allowAccess = $allowAccess;
        $client->sendCredentials = $sendCredentials;
        $client->user_id = Auth::id();
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('clients', 'public');
            $client->image = $path;
        } else {
            $client->image = null;
        }
        $user_id = $client->user_id = Auth::id();
        $userName = 
        $client->save();

        // Send credentials if requested
        if ($sendCredentials && $user && $generatedPassword) {
            // You should create a Mailable for this in a real app
            Mail::raw(
                "Your account has been created.\nEmail: {$user->email}\nPassword: {$generatedPassword}",
                function ($message) use ($user) {
                    $message->to($user->email)
                        ->subject('Your Client Account Credentials');
                }
            );
        }
 

        Activity::create([
            'title' => 'Client Added',
            'description' => 'User added a new client: ' . $client->firstName . ' ' . $client->lastName,
            'icon_bg' => '#5f76e8',
            'icon' => 'UserPlus',
            'user_id' =>$user_id ,
            'date' => now(),
        ]);
        return response()->json(['message' => 'Client created successfully', 'client' => $client], 201);



    }
    public function getNextCode()
    {
        $latestClient = Client::orderByDesc('id')->first();
        if ($latestClient && is_numeric($latestClient->code)) {
            $nextCode = (int)$latestClient->code + 1;
        } else {
            $nextCode = 1;
        }
        return response()->json(['next_code' => $nextCode]);
    }

    public function index(Request $request)
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    public function destroy($id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(['message'=>'not found'],404);
        }
        $user_id = $client->user_id = Auth::id();
        $client->delete();
    
        Activity::create([
            'title' => 'Brand Deleted',
            'description' => 'User deleted the client: ' .  $client->firstName . ' ' . $client->lastName,
            'icon_bg' => '#e53e3e', // red for delete
            'icon' => 'FileText',
            'user_id' => $user_id,
            'date' => now(),
        ]);

        return response()->json(['message' =>'Client Deleted Successfully']);
    }

    public function show($id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }
        return response()->json($client);
    }
}