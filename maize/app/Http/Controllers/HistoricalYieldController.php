<?php

namespace App\Http\Controllers;

use App\Models\HistoricalYield;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @OA\Schema(
 *     schema="HistoricalYield",
 *     type="object",
 *     title="HistoricalYield",
 *     required={"id", "region_or_field", "year", "yield_t_ha", "source"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="region_or_field", type="string", example="Region A"),
 *     @OA\Property(property="year", type="integer", example=2024),
 *     @OA\Property(property="yield_t_ha", type="number", format="float", example=6.2),
 *     @OA\Property(property="source", type="string", example="Ministry of Agriculture"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class HistoricalYieldController extends Controller
{
    /**
     * Display a listing of the historical yields.
     *
     * @OA\Get(
     *     path="/historical-yields",
     *     summary="Get list of all historical yields",
     *     tags={"HistoricalYields"},
     *     @OA\Response(response=200, description="List of historical yields")
     * )
     */
    public function index()
    {
        return HistoricalYield::all();
    }

    /**
     * Store a newly created historical yield in storage.
     *
     * @OA\Post(
     *     path="/historical-yields",
     *     summary="Create a new historical yield",
     *     tags={"HistoricalYields"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"region_or_field","year","yield_t_ha","source"},
     *             @OA\Property(property="region_or_field", type="string"),
     *             @OA\Property(property="year", type="integer"),
     *             @OA\Property(property="yield_t_ha", type="number", format="float"),
     *             @OA\Property(property="source", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Historical yield created")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'region_or_field' => 'required|string|max:100',
            'year' => 'required|integer',
            'yield_t_ha' => 'required|numeric',
            'source' => 'required|string|max:100',
        ]);
        $historicalYield = HistoricalYield::create($validated);
        return response()->json($historicalYield, 201);
    }

    /**
     * Display the specified historical yield.
     *
     * @OA\Get(
     *     path="/historical-yields/{historical_yield}",
     *     summary="Get a specific historical yield",
     *     tags={"HistoricalYields"},
     *     @OA\Parameter(
     *         name="historical_yield",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Historical yield details"),
     *     @OA\Response(response=404, description="Historical yield not found")
     * )
     */
    public function show($hist_id)
    {
        $historicalYield = HistoricalYield::find($hist_id);
        if (!$historicalYield) {
            return response()->json(['message' => 'Historical yield not found'], 404);
        }
        return response()->json($historicalYield);
    }

    /**
     * Update the specified historical yield in storage.
     *
     * @OA\Put(
     *     path="/historical-yields/{historical_yield}",
     *     summary="Update a historical yield",
     *     tags={"HistoricalYields"},
     *     @OA\Parameter(
     *         name="historical_yield",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="region_or_field", type="string"),
     *             @OA\Property(property="year", type="integer"),
     *             @OA\Property(property="yield_t_ha", type="number", format="float"),
     *             @OA\Property(property="source", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Historical yield updated"),
     *     @OA\Response(response=404, description="Historical yield not found")
     * )
     */
    public function update(Request $request, $hist_id)
    {
        $historicalYield = HistoricalYield::find($hist_id);
        if (!$historicalYield) {
            return response()->json(['message' => 'Historical yield not found'], 404);
        }
        $validated = $request->validate([
            'region_or_field' => 'sometimes|string|max:100',
            'year' => 'sometimes|integer',
            'yield_t_ha' => 'sometimes|numeric',
            'source' => 'sometimes|string|max:100',
        ]);
        $historicalYield->update($validated);
        return response()->json($historicalYield);
    }

    /**
     * Remove the specified historical yield from storage.
     *
     * @OA\Delete(
     *     path="/historical-yields/{historical_yield}",
     *     summary="Delete a historical yield",
     *     tags={"HistoricalYields"},
     *     @OA\Parameter(
     *         name="historical_yield",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Historical yield deleted"),
     *     @OA\Response(response=404, description="Historical yield not found")
     * )
     */
    public function destroy($hist_id)
    {
        $historicalYield = HistoricalYield::find($hist_id);
        if (!$historicalYield) {
            return response()->json(['message' => 'Historical yield not found'], 404);
        }
        $historicalYield->delete();
        return response()->json(null, 204);
    }
}
