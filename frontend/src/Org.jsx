import { useState } from 'react'

function Org() {

  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [region, setRegion] = useState('')
  const [currency, setCurrency] = useState('')

  const postUnit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/app/unit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ "id": id, "name": name, "type": type, "region": region, "currency": currency })
      })

      console.log(response)

    } catch (err) {
      console.log('Client-Error')
      console.log(err)
    }
  }

  return (
    <>
      <h2>Payroll App</h2>
      <p>
        POST UNIT FORM
      </p>
      <div>
        <input type="number" name="id" placeholder="id" value={id} onChange={(e) => { setId(e.target.value) }} /><br />
        <input type="text" name="name" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
        <input type="text" name="type" placeholder="type" value={type} onChange={(e) => { setType(e.target.value) }} /><br />
        <input type="text" name="region" placeholder="region" value={region} onChange={(e) => { setRegion(e.target.value) }} /><br />
        <input type="text" name="currency" placeholder="currency" value={currency} onChange={(e) => { setCurrency(e.target.value) }} /><br />
        <button type="submit" name="submit-button" id="submit-button" onClick={() => { postUnit() }}>Submit</button>
      </div>
    </>
  )
}

export default Org
