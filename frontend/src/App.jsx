import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Flights from "./pages/Flights";
import FlightDetail from "./pages/FlightDetail";
import Vehicles from "./pages/Vehicles";
import CreateVehicle from "./pages/CreateVehicle";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/vehicles/:vehicleId/flights"
                    element={<Flights />}
                />

                <Route
                    path="/vehicles"
                    element={<Vehicles />}
                />

                <Route
                    path="/vehicles/create"
                    element={<CreateVehicle />}
                />

                <Route
                    path="/vehicles/:vehicleId/flights/:flightId"
                    element={<FlightDetail />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;