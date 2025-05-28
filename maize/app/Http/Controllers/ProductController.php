<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="Product API",
 *     version="1.0.0",
 *     description="API documentation for Product endpoints"
 * )
 *
 * @OA\Server(
 *     url="/api",
 *     description="API Server"
 * )
 *
 * @OA\Tag(
 *     name="products",
 *     description="Operations about products"
 * )
 *
 * @OA\Schema(
 *     schema="Product",
 *     type="object",
 *     title="Product",
 *     required={"id", "name"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Maize Sensor"),
 *     @OA\Property(property="description", type="string", example="A sensor for maize fields"),
 *     @OA\Property(property="image_url", type="string", example="https://example.com/image.jpg"),
 *     @OA\Property(property="firmware_version", type="string", example="1.0.0"),
 *     @OA\Property(property="is_active", type="boolean", example=true),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class ProductController extends Controller
{
    // GET /api/products
    /**
     * @OA\Get(
     *     path="/products",
     *     summary="Get list of products",
     *     tags={"products"},
     *     @OA\Response(response=200, description="List of products")
     * )
     */
    public function index()
    {
        return Product::paginate();   // automatic JSON
    }

    // POST /api/products
    /**
     * @OA\Post(
     *     path="/products",
     *     summary="Create a new product",
     *     tags={"products"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="image_url", type="string"),
     *             @OA\Property(property="firmware_version", type="string"),
     *             @OA\Property(property="is_active", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Product created")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:120',
            'description'      => 'nullable|string',
            'image_url'        => 'nullable|url',
            'firmware_version' => 'nullable|string|max:20',
            'is_active'        => 'boolean',
        ]);

        return Product::create($validated);
    }

    // GET /api/products/{product}
    /**
     * @OA\Get(
     *     path="/products/{product}",
     *     summary="Get a product by ID",
     *     tags={"products"},
     *     @OA\Parameter(
     *         name="product",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Product data")
     * )
     */
    public function show(Product $product)
    {
        return $product;
    }

    // PUT/PATCH /api/products/{product}
    /**
     * @OA\Put(
     *     path="/products/{product}",
     *     summary="Update a product",
     *     tags={"products"},
     *     @OA\Parameter(
     *         name="product",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="image_url", type="string"),
     *             @OA\Property(property="firmware_version", type="string"),
     *             @OA\Property(property="is_active", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Product updated")
     * )
     */
    public function update(Request $request, Product $product)
    {
        $product->update($request->validate([
            'name'             => 'sometimes|required|string|max:120',
            'description'      => 'nullable|string',
            'image_url'        => 'nullable|url',
            'firmware_version' => 'nullable|string|max:20',
            'is_active'        => 'boolean',
        ]));

        return $product->refresh();
    }

    // DELETE /api/products/{product}
    /**
     * @OA\Delete(
     *     path="/products/{product}",
     *     summary="Delete a product",
     *     tags={"products"},
     *     @OA\Parameter(
     *         name="product",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=204, description="Product deleted")
     * )
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }
}
