<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\TelemetryController;
use App\Http\Controllers\FlightController;

Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show']);
Route::post('/vehicles/create', [VehicleController::class, 'store']);

Route::post('/vehicles/{vehicle}/flights', [FlightController::class, 'store']);
Route::get('/vehicles/{vehicle}/flights', [FlightController::class, 'index']);
Route::get('/vehicles/{vehicle}/flights/{flight}', [FlightController::class, 'show']);

Route::post('/vehicles/{vehicle}/flights/{flight}/telemetry', [TelemetryController::class, 'store']);
Route::get('/vehicles/{vehicle}/flights/{flight}/telemetry', [TelemetryController::class, 'index']);
Route::get('/vehicles/{vehicle}/flights/{flight}/telemetry/latest', [TelemetryController::class, 'latest']);