import { useState } from 'react'

function PayStructure() {
    const [unitId, setUnitId] = useState(0)
    const [isBasic, setBasic] = useState(false)
    const [isBonus, setBonus] = useState(false)
    const [isHousing_Allowance, setHousing_Allowance] = useState(false)
    const [isTransport_Allowance, setTransport_Allowance] = useState(false)
    const [isTax, setTax] = useState(false)

    const postPayStructure = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/app/payst', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ "unitId": unitId, "Bonus": isBonus, "Housing_Allowance": isHousing_Allowance, "Transport_Allowance": isTransport_Allowance, "Basic": isBasic, "Tax": isTax })
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
                POST PAY STRUCTURE FORM
            </p>
            <div>
                <label name="unitId">Unit Id</label>
                <input type="number" name="unitId" placeholder="unitId" value={unitId} onChange={(e) => { setUnitId(e.target.value) }} /><br />
                <label name="Basic">Basic</label>
                <input
                    type="checkbox"
                    name="Basic"
                    checked={isBasic}
                    onChange={() => { setBasic(!isBasic) }}
                /> <br />
                <label name="Housing_Allowance">Housing_Allowance</label>
                <input
                    type="checkbox"
                    name="Housing_Allowance"
                    checked={isHousing_Allowance}
                    onChange={() => { setHousing_Allowance(!isHousing_Allowance) }}
                /> <br />
                <label name="Transport_Allowance">Transport_Allowance</label>
                <input
                    type="checkbox"
                    name="Transport_Allowance"
                    checked={isTransport_Allowance}
                    onChange={() => { setTransport_Allowance(!isTransport_Allowance) }}
                /> <br />
                <label name="Bonus">Bonus</label>
                <input
                    type="checkbox"
                    name="Bonus"
                    checked={isBonus}
                    onChange={() => { setBonus(!isBonus) }}
                /> <br />
                <label name="Tax">Tax</label>
                <input
                    type="checkbox"
                    name="Tax"
                    checked={isTax}
                    onChange={() => { setTax(!isTax) }}
                /> <br />
                <button type="submit" name="submit-button" id="submit-button" onClick={() => { postPayStructure() }}>Submit</button>
            </div>
        </>
    )
}
// "http://127.0.0.1:3000/app/unit"
export default PayStructure
