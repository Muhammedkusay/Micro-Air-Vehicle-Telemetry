import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import Error from "../components/Error";
import Loading from "../components/Loading";
import FlightCard from "../components/FlightCard";
import Header from "../components/Header";
import VehicleCard from "../components/VehicleCard";

export default function Vehicles() {

    const [vehicles, setVehicles] = useState([])

    const {request, loading, error} = useApi()

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const result = await request(`/vehicles`)
                setVehicles(result.data)
            } catch(error) {
                console.error(error)
            }
        }

        fetchVehicles()
    }, [])

    if (loading) return <Loading />
    if (error) return <Error message={error}/>

    return (
        <div>
            <Header />
            <div className="w-full md:w-[90%] mx-auto">
                <h1 className="w-fit mx-auto text-lg py-3">Vehicles</h1>
                <Link to={'/vehicles/create'} className="block w-fit mb-2 px-5 pt-0.5 pb-1.5 text-sm text-white bg-slate-800 hover:bg-slate-600 rounded-md">Add<span className="pl-1.5 text-lg">+</span></Link>
                <div className="flex flex-col gap-2">
                {
                    vehicles.length == 0 
                    ? <Error message={"No flights found"} />
                    : vehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle}/>
                    ))
                }
                </div>
            </div>
        </div>
    );
}