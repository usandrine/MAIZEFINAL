<?php

namespace App\Http\Controllers;

use App\Models\SensorReading;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @OA\Schema(
 *     schema="SensorReading",
 *     type="object",
 *     title="SensorReading",
 *     required={"id", "sensor_id", "timestamp", "value"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="sensor_id", type="string", example="s1a2b3c4-d5e6-7890-1234-56789abcdef0"),
 *     @OA\Property(property="timestamp", type="string", format="date-time", example="2025-05-27T12:00:00Z"),
 *     @OA\Property(property="value", type="number", format="float", example=23.5),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class SensorReadingController extends Controller
{
    /**
     * Display a listing of the sensor readings.
     *
     * @OA\Get(
     *     path="/sensor-readings",
     *     summary="Get list of all sensor readings",
     *     tags={"SensorReadings"},
     *     @OA\Response(response=200, description="List of sensor readings")
     * )
     */
    public function index()
    {
        return SensorReading::all();
    }

    /**
     * Store a newly created sensor reading in storage.
     *
     * @OA\Post(
     *     path="/sensor-readings",
     *     summary="Create a new sensor reading",
     *     tags={"SensorReadings"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"sensor_id","timestamp","value"},
     *             @OA\Property(property="sensor_id", type="string"),
     *             @OA\Property(property="timestamp", type="string", format="date-time"),
     *             @OA\Property(property="value", type="number", format="float")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Sensor reading created")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sensor_id' => 'required|exists:sensors,sensor_id',
            'timestamp' => 'required|date',
            'value' => 'required|numeric',
        ]);
        $reading = SensorReading::create($validated);
        return response()->json($reading, 201);
    }

    /**
     * Display the specified sensor reading.
     *
     * @OA\Get(
     *     path="/sensor-readings/{reading}",
     *     summary="Get a specific sensor reading",
     *     tags={"SensorReadings"},
     *     @OA\Parameter(
     *         name="reading",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Sensor reading details"),
     *     @OA\Response(response=404, description="Sensor reading not found")
     * )
     */
    public function show($reading_id)
    {
        $reading = SensorReading::find($reading_id);
        if (!$reading) {
            return response()->json(['message' => 'Sensor reading not found'], 404);
        }
        return response()->json($reading);
    }

    /**
     * Update the specified sensor reading in storage.
     *
     * @OA\Put(
     *     path="/sensor-readings/{reading}",
     *     summary="Update a sensor reading",
     *     tags={"SensorReadings"},
     *     @OA\Parameter(
     *         name="reading",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="timestamp", type="string", format="date-time"),
     *             @OA\Property(property="value", type="number", format="float")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Sensor reading updated"),
     *     @OA\Response(response=404, description="Sensor reading not found")
     * )
     */
    public function update(Request $request, $reading_id)
    {
        $reading = SensorReading::find($reading_id);
        if (!$reading) {
            return response()->json(['message' => 'Sensor reading not found'], 404);
        }
        $validated = $request->validate([
            'sensor_id' => 'sometimes|exists:sensors,sensor_id',
            'timestamp' => 'sometimes|date',
            'value' => 'sometimes|numeric',
        ]);
        $reading->update($validated);
        return response()->json($reading);
    }

    /**
     * Remove the specified sensor reading from storage.
     *
     * @OA\Delete(
     *     path="/sensor-readings/{reading}",
     *     summary="Delete a sensor reading",
     *     tags={"SensorReadings"},
     *     @OA\Parameter(
     *         name="reading",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Sensor reading deleted"),
     *     @OA\Response(response=404, description="Sensor reading not found")
     * )
     */
    public function destroy($reading_id)
    {
        $reading = SensorReading::find($reading_id);
        if (!$reading) {
            return response()->json(['message' => 'Sensor reading not found'], 404);
        }
        $reading->delete();
        return response()->json(null, 204);
    }
}
