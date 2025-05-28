<?php

namespace App\Http\Controllers;

use App\Models\Field;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FieldController extends Controller
{
    /**
     * @OA\Schema(
     *     schema="Field",
     *     type="object",
     *     title="Field",
     *     required={"field_id", "farmer_id", "name", "area_ha", "soil_type", "latitude", "longitude"},
     *     @OA\Property(property="field_id", type="string", example="f1a2b3c4-d5e6-7890-1234-56789abcdef0"),
     *     @OA\Property(property="farmer_id", type="string", example="fa1b2c3d-4e5f-6789-0123-456789abcdef"),
     *     @OA\Property(property="name", type="string", example="North Plot"),
     *     @OA\Property(property="area_ha", type="number", format="float", example=2.5),
     *     @OA\Property(property="soil_type", type="string", example="loam"),
     *     @OA\Property(property="latitude", type="number", format="float", example=-1.2921),
     *     @OA\Property(property="longitude", type="number", format="float", example=36.8219),
     *     @OA\Property(property="created_at", type="string", format="date-time"),
     *     @OA\Property(property="updated_at", type="string", format="date-time")
     * )
     */

    /**
     * Display a listing of the fields.
     *
     * @OA\Get(
     *     path="/fields",
     *     summary="Get list of all fields",
     *     tags={"Fields"},
     *     @OA\Response(response=200, description="List of fields")
     * )
     */
    public function index()
    {
        return Field::all();
    }

    /**
     * Store a newly created field in storage.
     *
     * @OA\Post(
     *     path="/fields",
     *     summary="Create a new field",
     *     tags={"Fields"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"farmer_id","name","area_ha","soil_type","latitude","longitude"},
     *             @OA\Property(property="farmer_id", type="string"),
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="area_ha", type="number", format="float"),
     *             @OA\Property(property="soil_type", type="string"),
     *             @OA\Property(property="latitude", type="number", format="float"),
     *             @OA\Property(property="longitude", type="number", format="float")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Field created")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'farmer_id' => 'required|exists:farmers,farmer_id',
            'name' => 'required|string|max:100',
            'area_ha' => 'required|numeric',
            'soil_type' => 'required|string|max:50',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);
        $field = Field::create($validated);
        return response()->json($field, 201);
    }

    /**
     * Display the specified field.
     *
     * @OA\Get(
     *     path="/fields/{field}",
     *     summary="Get a specific field",
     *     tags={"Fields"},
     *     @OA\Parameter(
     *         name="field",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Field details"),
     *     @OA\Response(response=404, description="Field not found")
     * )
     */
    public function show($field_id)
    {
        $field = Field::find($field_id);
        if (!$field) {
            return response()->json(['message' => 'Field not found'], 404);
        }
        return response()->json($field);
    }

    /**
     * Update the specified field in storage.
     *
     * @OA\Put(
     *     path="/fields/{field}",
     *     summary="Update a field",
     *     tags={"Fields"},
     *     @OA\Parameter(
     *         name="field",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="area_ha", type="number", format="float"),
     *             @OA\Property(property="soil_type", type="string"),
     *             @OA\Property(property="latitude", type="number", format="float"),
     *             @OA\Property(property="longitude", type="number", format="float")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Field updated"),
     *     @OA\Response(response=404, description="Field not found")
     * )
     */
    public function update(Request $request, $field_id)
    {
        $field = Field::find($field_id);
        if (!$field) {
            return response()->json(['message' => 'Field not found'], 404);
        }
        $validated = $request->validate([
            'farmer_id' => 'sometimes|exists:farmers,farmer_id',
            'name' => 'sometimes|string|max:100',
            'area_ha' => 'sometimes|numeric',
            'soil_type' => 'sometimes|string|max:50',
            'latitude' => 'sometimes|numeric',
            'longitude' => 'sometimes|numeric',
        ]);
        $field->update($validated);
        return response()->json($field);
    }

    /**
     * Remove the specified field from storage.
     *
     * @OA\Delete(
     *     path="/fields/{field}",
     *     summary="Delete a field",
     *     tags={"Fields"},
     *     @OA\Parameter(
     *         name="field",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=204, description="Field deleted"),
     *     @OA\Response(response=404, description="Field not found")
     * )
     */
    public function destroy($field_id)
    {
        $field = Field::find($field_id);
        if (!$field) {
            return response()->json(['message' => 'Field not found'], 404);
        }
        $field->delete();
        return response()->json(null, 204);
    }
}
