<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    public function index() {
        $vehicles = Vehicle::all();

        if(!$vehicles) {
            return response()->json([
                'message' => 'No vehicles found'
            ], 404);
        }

        return response()->json([
            'data' => $vehicles
        ], 200);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'system_id' => 'required|string',
        ]);

        $vehicle = Vehicle::create($validated);

        if(!$vehicle) {
            return response()->json([
                'message' => 'Failed to create vehicle.',
            ], 401);

        }

        return response()->json([
            'data' => $vehicle,
            'message' => 'Vehicle created successfully.',
        ], 200);
    }

    public function show(Request $request, $id) {
        $vehicle = Vehicle::find($id);

        if(!$vehicle) {
            return response()->json([
                'message' => 'Vehicle not found'
            ], 404);
        }

        return response()->json([
            'data' => $vehicle,
        ], 200);
    }
}
