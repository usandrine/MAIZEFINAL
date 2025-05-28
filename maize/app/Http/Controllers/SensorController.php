<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @OA\Schema(
 *     schema="Sensor",
 *     type="object",
 *     title="Sensor",
 *     required={"sensor_id", "field_id", "sensor_type", "installation_date", "status"},
 *     @OA\Property(property="sensor_id", type="string", example="s1a2b3c4-d5e6-7890-1234-56789abcdef0"),
 *     @OA\Property(property="field_id", type="string", example="f1a2b3c4-d5e6-7890-1234-56789abcdef0"),
 *     @OA\Property(property="sensor_type", type="string", example="soil_moisture"),
 *     @OA\Property(property="installation_date", type="string", format="date", example="2025-05-27"),
 *     @OA\Property(property="status", type="string", example="active"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class SensorController extends Controller
{
    /**
     * Display a listing of the sensors.
     *
     * @OA\Get(
     *     path="/sensors",
     *     summary="Get list of all sensors",
     *     tags={"Sensors"},
     *     @OA\Response(response=200, description="List of sensors")
     * )
     */
    public function index()
    {
        return Sensor::all();
    }

    /**
     * Store a newly created sensor in storage.
     *
     * @OA\Post(
     *     path="/sensors",
     *     summary="Create a new sensor",
     *     tags={"Sensors"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"field_id","sensor_type","installation_date","status"},
     *             @OA\Property(property="field_id", type="string"),
     *             @OA\Property(property="sensor_type", type="string"),
     *             @OA\Property(property="installation_date", type="string", format="date"),
     *             @OA\Property(property="status", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Sensor created")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'field_id' => 'required|exists:fields,field_id',
            'sensor_type' => 'required|string|max:50',
            'installation_date' => 'required|date',
            'status' => 'required|string|max:20',
        ]);
        $sensor = Sensor::create($validated);
        return response()->json($sensor, 201);
    }

    /**
     * Display the specified sensor.
     *
     * @OA\Get(
     *     path="/sensors/{sensor}",
     *     summary="Get a specific sensor",
     *     tags={"Sensors"},
     *     @OA\Parameter(
     *         name="sensor",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Sensor details"),
     *     @OA\Response(response=404, description="Sensor not found")
     * )
     */
    public function show($sensor_id)
    {
        $sensor = Sensor::find($sensor_id);
        if (!$sensor) {
            return response()->json(['message' => 'Sensor not found'], 404);
        }
        return response()->json($sensor);
    }

    /**
     * Update the specified sensor in storage.
     *
     * @OA\Put(
     *     path="/sensors/{sensor}",
     *     summary="Update a sensor",
     *     tags={"Sensors"},
     *     @OA\Parameter(
     *         name="sensor",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="sensor_type", type="string"),
     *             @OA\Property(property="installation_date", type="string", format="date"),
     *             @OA\Property(property="status", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Sensor updated"),
     *     @OA\Response(response=404, description="Sensor not found")
     * )
     */
    public function update(Request $request, $sensor_id)
    {
        $sensor = Sensor::find($sensor_id);
        if (!$sensor) {
            return response()->json(['message' => 'Sensor not found'], 404);
        }
        $validated = $request->validate([
            'field_id' => 'sometimes|exists:fields,field_id',
            'sensor_type' => 'sometimes|string|max:50',
            'installation_date' => 'sometimes|date',
            'status' => 'sometimes|string|max:20',
        ]);
        $sensor->update($validated);
        return response()->json($sensor);
    }

    /**
     * Remove the specified sensor from storage.
     *
     * @OA\Delete(
     *     path="/sensors/{sensor}",
     *     summary="Delete a sensor",
     *     tags={"Sensors"},
     *     @OA\Parameter(
     *         name="sensor",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=204, description="Sensor deleted"),
     *     @OA\Response(response=404, description="Sensor not found")
     * )
     */
    public function destroy($sensor_id)
    {
        $sensor = Sensor::find($sensor_id);
        if (!$sensor) {
            return response()->json(['message' => 'Sensor not found'], 404);
        }
        $sensor->delete();
        return response()->json(null, 204);
    }
}
