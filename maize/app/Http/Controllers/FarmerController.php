<?php

namespace App\Http\Controllers;

use App\Models\Farmer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FarmerController extends Controller
{
    /**
     * @OA\Schema(
     *     schema="Farmer",
     *     type="object",
     *     title="Farmer",
     *     required={"farmer_id", "user_id", "name", "email", "phone", "region", "registered_at"},
     *     @OA\Property(property="farmer_id", type="string", example="fa1b2c3d-4e5f-6789-0123-456789abcdef"),
     *     @OA\Property(property="user_id", type="integer", example=1),
     *     @OA\Property(property="name", type="string", example="Jane Doe"),
     *     @OA\Property(property="email", type="string", format="email", example="jane@example.com"),
     *     @OA\Property(property="phone", type="string", example="+254712345678"),
     *     @OA\Property(property="region", type="string", example="Nairobi"),
     *     @OA\Property(property="registered_at", type="string", format="date-time", example="2025-05-27T10:00:00Z"),
     *     @OA\Property(property="created_at", type="string", format="date-time"),
     *     @OA\Property(property="updated_at", type="string", format="date-time")
     * )
     */

    /**
     * Display a listing of the farmers.
     *
     * @OA\Get(
     *     path="/farmers",
     *     summary="Get list of all farmers",
     *     tags={"Farmers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="List of farmers"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function index(Request $request)
    {
        return Farmer::where('user_id', $request->user()->id)->get();
    }

    /**
     * Store a newly created farmer in storage.
     *
     * @OA\Post(
     *     path="/farmers",
     *     summary="Create a new farmer",
     *     tags={"Farmers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","phone","region","registered_at"},
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="region", type="string"),
     *             @OA\Property(property="registered_at", type="string", format="date-time")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Farmer created"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'required|string|max:20',
            'region' => 'required|string|max:100',
            'registered_at' => 'required|date',
        ]);
        $validated['user_id'] = $user->id;
        $farmer = Farmer::create($validated);
        return response()->json($farmer, 201);
    }

    /**
     * Display the specified farmer.
     *
     * @OA\Get(
     *     path="/farmers/{farmer}",
     *     summary="Get a specific farmer",
     *     tags={"Farmers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="farmer",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Farmer details"),
     *     @OA\Response(response=404, description="Farmer not found"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function show(Request $request, $farmer_id)
    {
        $farmer = Farmer::where('farmer_id', $farmer_id)
            ->where('user_id', $request->user()->id)
            ->first();
        if (!$farmer) {
            return response()->json(['message' => 'Farmer not found'], 404);
        }
        return response()->json($farmer);
    }

    /**
     * Update the specified farmer in storage.
     *
     * @OA\Put(
     *     path="/farmers/{farmer}",
     *     summary="Update a farmer",
     *     tags={"Farmers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="farmer",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="region", type="string"),
     *             @OA\Property(property="registered_at", type="string", format="date-time")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Farmer updated"),
     *     @OA\Response(response=404, description="Farmer not found"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function update(Request $request, $farmer_id)
    {
        $farmer = Farmer::where('farmer_id', $farmer_id)
            ->where('user_id', $request->user()->id)
            ->first();
        if (!$farmer) {
            return response()->json(['message' => 'Farmer not found'], 404);
        }
        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|max:150',
            'phone' => 'sometimes|string|max:20',
            'region' => 'sometimes|string|max:100',
            'registered_at' => 'sometimes|date',
        ]);
        $farmer->update($validated);
        return response()->json($farmer);
    }

    /**
     * Remove the specified farmer from storage.
     *
     * @OA\Delete(
     *     path="/farmers/{farmer}",
     *     summary="Delete a farmer",
     *     tags={"Farmers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="farmer",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=204, description="Farmer deleted"),
     *     @OA\Response(response=404, description="Farmer not found"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function destroy(Request $request, $farmer_id)
    {
        $farmer = Farmer::where('farmer_id', $farmer_id)
            ->where('user_id', $request->user()->id)
            ->first();
        if (!$farmer) {
            return response()->json(['message' => 'Farmer not found'], 404);
        }
        $farmer->delete();
        return response()->json(null, 204);
    }
}
