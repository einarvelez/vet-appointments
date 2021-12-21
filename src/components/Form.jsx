import { useState, useEffect } from 'react';
import Error from './Error';

const Form = ({ patients, setPatients, patient, setPatient }) => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [symtoms, setSymtoms] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(patient).length > 0) {
            setName(patient.name)
            setOwner(patient.owner)
            setEmail(patient.email)
            setStartDate(patient.startDate)
            setSymtoms(patient.symtoms)
        }
    }, [patient])

    const generateId = () => {
        const random = Math.random().toString(36).substring(2);
        const date = Date.now().toString(36)
        return random + date
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        //Form Validation
        if ([name, owner, email, startDate, symtoms].includes('')) {
            setError(true)
            return
        } else {
            setError(false)
            
            const patientObject = {
                name,
                owner,
                email,
                startDate,
                symtoms
            }

            if(patient.id){
                //Update Patient
                patientObject.id = patient.id
                const updatedPatients = patients.map(patientState => patientState.id === patient.id ? patientObject : patientState)
                setPatients(updatedPatients)
                setPatient({})
            }else{
                //New patient
                patientObject.id = generateId()
                setPatients([...patients, patientObject])
            }

            //Clean Form
            setName('')
            setOwner('')
            setEmail('')
            setStartDate('')
            setSymtoms('')
        }

    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Patients Follow Up</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Add patients and {''}
                <span className="text-indigo-600 font-bold">manage them</span>
            </p>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {error && <Error>All fields are mandatory</Error>}
                <div className="mb-5">
                    <label htmlFor="pet" className="block text-gray-700 uppercase font-bold">
                        Pet name {name}
                    </label>
                    <input
                        id="pet"
                        type="text"
                        placeholder="Pet name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="owner" className="block text-gray-700 uppercase font-bold">
                        Owner Name
                    </label>
                    <input
                        id="owner"
                        type="text"
                        placeholder="Owner Name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Owner Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="startDate" className="block text-gray-700 uppercase font-bold">
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="symtoms" className="block text-gray-700 uppercase font-bold">
                        Symptoms
                    </label>
                    <textarea
                        id="symtoms"
                        placeholder="Symtoms Description"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={symtoms}
                        onChange={(e) => setSymtoms(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={ patient.id  ? 'Edit Patient' : 'Add Patient' }
                />
            </form>
        </div>
    )
}

export default Form
