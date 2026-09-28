import { useState } from "react";
import Header from "../components/Header";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { usePostApi } from "../hooks/usePostApi";
import Message from "../components/Message";

export default function CreateVehicle() {
    const [name, setName] = useState('')
    const [systemId, setSystemId] = useState('0')
    const [error, setError] = useState(null)

    const {request, loading, message} = usePostApi()

    const changeName = (e) => {
        setName(e.target.value)
    }

    const changeSystemId = (e) => {
        setSystemId(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)

        if(name.trim() == '') {
            setError('Please Enter Vehicle Name!')
            return
        }
        if(systemId == '0') {
            setError('Please Select Vehicle Type!')
            return
        }

        const createVehicle = async () => {
            try {
                await request(
                    `/vehicles/create`,
                    {
                        'name': name,
                        'system_id': systemId,
                    }
                )
            } catch(error) {
                console.error(error)
            } 
        }

        createVehicle()
    }

    return (
        <div>
            <Header></Header>
            <h1 className="w-fit mx-auto text-lg py-3">Vehicles</h1>
            <form onSubmit={handleSubmit} className="w-2/5 mx-auto p-12 flex flex-col gap-4 border border-slate-300 shadow-sm rounded-lg">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={changeName} name="name" id="name" placeholder="Copter" className="p-2 pt-1.5 outline-2 outline-slate-300 focus:outline-blue-700 rounded-md"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="system_id">Type</label>
                    <select onChange={changeSystemId} name="system_id" id="system_id" className="p-2 pt-1.5 cursor-pointer outline-2 outline-slate-300 focus:outline-blue-700 rounded-md">
                        <option value="0">Select Vehicle Type</option>
                        <option value="1">Copter</option>
                        <option value="2">Plane</option>
                    </select>
                </div>
                {
                    error && <Error message={error}/>
                }
                <button type="submit" className="block mb-2 px-5 pt-1.5 pb-2 text-sm text-white bg-slate-800 hover:bg-slate-600 cursor-pointer rounded-md">
                    {loading ? <Loading /> : 'Submit'}
                </button>
                {
                    message && <Message message={message}/>
                }
            </form>
        </div>
    )
}