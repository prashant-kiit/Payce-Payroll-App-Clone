import { useState, useEffect, useId } from 'react'

function PayStructure() {
    const [unitId, setUnitId] = useState(0)
    const [componentStatus, setComponentStatus] = useState({})
    const id = useId()

    const postPayStructure = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/app/payst', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ unitId: unitId, componentStatus: componentStatus })
            })

            console.log(response)

            if (!response.ok) {
                setStatus('Status : ' + response.status + ' - ' + response.statusText)
                throw new Error(response.status + ' - ' + response.statusText)
            }

        } catch (err) {
            console.log('Client-Error')
            console.log(err)
        }
    }
    const getComponents = async () => {
        const response = await fetch('http://127.0.0.1:3000/app/components', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })

        if (!response.ok) {
            setStatus('Status : ' + response.status + ' - ' + response.statusText)
            throw new Error(response.status + ' - ' + response.statusText)
        }

        const data = await response.json()
        console.log('data')
        console.log(data)
        setComponentStatus(data)
    }

    useEffect(() => {
        getComponents()
        return () => { }
    }, [])

    return (
        <>
            <h2>Payroll App</h2>
            <p>
                POST PAY STRUCTURE FORM
            </p>
            <div>
                <div>
                    <label name="unitId">Unit Id</label>
                    <input type="number" name="unitId" placeholder="unitId" value={unitId} onChange={(e) => {
                        setUnitId(e.target.value)
                    }} /><br />
                </div>

                <div>
                    {Object.keys(componentStatus).map((component, index) => {
                        return (
                            <div key={'div' + index}>
                                <label key={'lable' + index} name={component}>{component}</label>
                                <input
                                    type="checkbox"
                                    key={'input' + index}
                                    name={component}
                                    onChange={() => {
                                        componentStatus[component] = !componentStatus[component]
                                        setComponentStatus(componentStatus)
                                        console.log(componentStatus)
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
                <button type="submit" name="submit-button" id="submit-button" onClick={() => {
                    postPayStructure()
                }}>Submit</button>
            </div>
        </>
    )
}
// "http://127.0.0.1:3000/app/unit"
export default PayStructure
