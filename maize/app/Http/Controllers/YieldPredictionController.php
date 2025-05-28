<?php

namespace App\Http\Controllers;

/**
 * @OA\Schema(
 *     schema="YieldPrediction",
 *     type="object",
 *     title="YieldPrediction",
 *     required={"id", "field_id", "model_version", "prediction_date", "predicted_yield_t_ha"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="field_id", type="string", example="f1a2b3c4-d5e6-7890-1234-56789abcdef0"),
 *     @OA\Property(property="model_version", type="string", example="v1.0.0"),
 *     @OA\Property(property="prediction_date", type="string", format="date", example="2025-05-27"),
 *     @OA\Property(property="predicted_yield_t_ha", type="number", format="float", example=7.5),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */

use App\Models\YieldPrediction;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class YieldPredictionController extends Controller
{
    /**
     * Display a listing of the yield predictions.
     *
     * @OA\Get(
     *     path="/yield-predictions",
     *     summary="Get list of all yield predictions",
     *     tags={"YieldPredictions"},
     *     @OA\Response(response=200, description="List of yield predictions")
     * )
     */
    public function index()
    {
        return YieldPrediction::all();
    }

    /**
     * Store a newly created yield prediction in storage.
     *
     * @OA\Post(
     *     path="/yield-predictions",
     *     summary="Create a new yield prediction",
     *     tags={"YieldPredictions"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"field_id","model_version","prediction_date","predicted_yield_t_ha"},
     *             @OA\Property(property="field_id", type="string"),
     *             @OA\Property(property="model_version", type="string"),
     *             @OA\Property(property="prediction_date", type="string", format="date"),
     *             @OA\Property(property="predicted_yield_t_ha", type="number", format="float")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Yield prediction created")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'field_id' => 'required|exists:fields,field_id',
            'model_version' => 'required|string|max:50',
            'prediction_date' => 'required|date',
            'predicted_yield_t_ha' => 'required|numeric',
        ]);
        $prediction = YieldPrediction::create($validated);
        return response()->json($prediction, 201);
    }

    /**
     * Display the specified yield prediction.
     *
     * @OA\Get(
     *     path="/yield-predictions/{prediction}",
     *     summary="Get a specific yield prediction",
     *     tags={"YieldPredictions"},
     *     @OA\Parameter(
     *         name="prediction",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Yield prediction details"),
     *     @OA\Response(response=404, description="Yield prediction not found")
     * )
     */
    public function show($prediction_id)
    {
        $prediction = YieldPrediction::find($prediction_id);
        if (!$prediction) {
            return response()->json(['message' => 'Yield prediction not found'], 404);
        }
        return response()->json($prediction);
    }

    /**
     * Update the specified yield prediction in storage.
     *
     * @OA\Put(
     *     path="/yield-predictions/{prediction}",
     *     summary="Update a yield prediction",
     *     tags={"YieldPredictions"},
     *     @OA\Parameter(
     *         name="prediction",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="field_id", type="string"),
     *             @OA\Property(property="model_version", type="string"),
     *             @OA\Property(property="prediction_date", type="string", format="date"),
     *             @OA\Property(property="predicted_yield_t_ha", type="number", format="float")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Yield prediction updated"),
     *     @OA\Response(response=404, description="Yield prediction not found")
     * )
     */
    public function update(Request $request, $prediction_id)
    {
        $prediction = YieldPrediction::find($prediction_id);
        if (!$prediction) {
            return response()->json(['message' => 'Yield prediction not found'], 404);
        }
        $validated = $request->validate([
            'field_id' => 'sometimes|exists:fields,field_id',
            'model_version' => 'sometimes|string|max:50',
            'prediction_date' => 'sometimes|date',
            'predicted_yield_t_ha' => 'sometimes|numeric',
        ]);
        $prediction->update($validated);
        return response()->json($prediction);
    }

    /**
     * Remove the specified yield prediction from storage.
     *
     * @OA\Delete(
     *     path="/yield-predictions/{prediction}",
     *     summary="Delete a yield prediction",
     *     tags={"YieldPredictions"},
     *     @OA\Parameter(
     *         name="prediction",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Yield prediction deleted"),
     *     @OA\Response(response=404, description="Yield prediction not found")
     * )
     */
    public function destroy($prediction_id)
    {
        $prediction = YieldPrediction::find($prediction_id);
        if (!$prediction) {
            return response()->json(['message' => 'Yield prediction not found'], 404);
        }
        $prediction->delete();
        return response()->json(null, 204);
    }
}
