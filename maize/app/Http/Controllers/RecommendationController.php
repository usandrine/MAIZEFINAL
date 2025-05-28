<?php

namespace App\Http\Controllers;

use App\Models\Recommendation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @OA\Schema(
 *     schema="Recommendation",
 *     type="object",
 *     title="Recommendation",
 *     required={"id", "field_id", "recommendation_date", "recommendation_type", "message"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="field_id", type="string", example="f1a2b3c4-d5e6-7890-1234-56789abcdef0"),
 *     @OA\Property(property="recommendation_date", type="string", format="date", example="2025-05-27"),
 *     @OA\Property(property="recommendation_type", type="string", example="fertilizer"),
 *     @OA\Property(property="message", type="string", example="Apply 50kg/ha of NPK"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class RecommendationController extends Controller
{
    /**
     * Display a listing of the recommendations.
     *
     * @OA\Get(
     *     path="/recommendations",
     *     summary="Get list of all recommendations",
     *     tags={"Recommendations"},
     *     @OA\Response(response=200, description="List of recommendations")
     * )
     */
    public function index()
    {
        return Recommendation::all();
    }

    /**
     * Store a newly created recommendation in storage.
     *
     * @OA\Post(
     *     path="/recommendations",
     *     summary="Create a new recommendation",
     *     tags={"Recommendations"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"field_id","recommendation_date","recommendation_type","message"},
     *             @OA\Property(property="field_id", type="string"),
     *             @OA\Property(property="recommendation_date", type="string", format="date"),
     *             @OA\Property(property="recommendation_type", type="string"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Recommendation created")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'field_id' => 'required|exists:fields,field_id',
            'recommendation_date' => 'required|date',
            'recommendation_type' => 'required|string|max:50',
            'message' => 'required|string',
        ]);
        $recommendation = Recommendation::create($validated);
        return response()->json($recommendation, 201);
    }

    /**
     * Display the specified recommendation.
     *
     * @OA\Get(
     *     path="/recommendations/{recommendation}",
     *     summary="Get a specific recommendation",
     *     tags={"Recommendations"},
     *     @OA\Parameter(
     *         name="recommendation",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Recommendation details"),
     *     @OA\Response(response=404, description="Recommendation not found")
     * )
     */
    public function show($rec_id)
    {
        $recommendation = Recommendation::find($rec_id);
        if (!$recommendation) {
            return response()->json(['message' => 'Recommendation not found'], 404);
        }
        return response()->json($recommendation);
    }

    /**
     * Update the specified recommendation in storage.
     *
     * @OA\Put(
     *     path="/recommendations/{recommendation}",
     *     summary="Update a recommendation",
     *     tags={"Recommendations"},
     *     @OA\Parameter(
     *         name="recommendation",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="recommendation_date", type="string", format="date"),
     *             @OA\Property(property="recommendation_type", type="string"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Recommendation updated"),
     *     @OA\Response(response=404, description="Recommendation not found")
     * )
     */
    public function update(Request $request, $rec_id)
    {
        $recommendation = Recommendation::find($rec_id);
        if (!$recommendation) {
            return response()->json(['message' => 'Recommendation not found'], 404);
        }
        $validated = $request->validate([
            'field_id' => 'sometimes|exists:fields,field_id',
            'recommendation_date' => 'sometimes|date',
            'recommendation_type' => 'sometimes|string|max:50',
            'message' => 'sometimes|string',
        ]);
        $recommendation->update($validated);
        return response()->json($recommendation);
    }

    /**
     * Remove the specified recommendation from storage.
     *
     * @OA\Delete(
     *     path="/recommendations/{recommendation}",
     *     summary="Delete a recommendation",
     *     tags={"Recommendations"},
     *     @OA\Parameter(
     *         name="recommendation",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Recommendation deleted"),
     *     @OA\Response(response=404, description="Recommendation not found")
     * )
     */
    public function destroy($rec_id)
    {
        $recommendation = Recommendation::find($rec_id);
        if (!$recommendation) {
            return response()->json(['message' => 'Recommendation not found'], 404);
        }
        $recommendation->delete();
        return response()->json(null, 204);
    }
}
