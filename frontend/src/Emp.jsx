import { useState } from 'react'

function Emp() {

    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [unitId, setUnitId] = useState(0)
    // const [salary, setSalary] = useState(0)
    const [experience, setExperience] = useState(0)
    const [status, setStatus] = useState('')

    const postEmp = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/app/emp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ "id": id, "name": name, "unitId": unitId, "experience": experience, })
                // "salary": salary
            })

            console.log(response)

            // if (!response.ok) {
            //     setStatus('Status : ' + response.status + ' - ' + response.statusText)
            //     throw new Error(response.status + ' - ' + response.statusText)
            // }

        } catch (err) {
            console.log('Client-Error')
            console.log(err)
        }
    }

    return (
        <>
            <h2>Payroll App</h2>
            <p>
                POST EMPLOYEE FORM
            </p>
            <div>
                <input type="number" name="id" placeholder="id" value={id} onChange={(e) => { setId(e.target.value) }} /><br />
                <input type="text" name="name" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
                <input type="text" name="unitId" placeholder="unitId" value={unitId} onChange={(e) => { setUnitId(e.target.value) }} /><br />
                <input type="number" name="experience" placeholder="experience" value={experience} onChange={(e) => { setExperience(e.target.value) }} /><br />
                {/* <input type="number" name="salary" placeholder="salary" value={salary} onChange={(e) => { setSalary(e.target.value) }} /><br /> */}
                <button type="submit" name="submit-button" id="submit-button" onClick={() => { postEmp() }}>Submit</button>
                <p name="status">{status}</p>
            </div>
        </>
    )
}
// "http://127.0.0.1:3000/app/unit"
export default Emp
