import { Router } from 'express';
import Unit from './models/unit.js';
import Employee from './models/employee.js';
import PayStructure from './models/payStructure.js';
import Components from './data/components.js';

const router = Router();

router.post('/unit', async (req, res) => {
    const unit = new Unit({
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        region: req.body.region,
        currency: req.body.currency,
    });

    console.log(unit);
    try {
        await unit.save();
        res.status(404).send();
    }
    catch (err) {
        console.log('Server-Error');
        console.log(err);
        res.send(err);
    }
});

router.get('/empsal/:id', async (req, res) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/app/emp/${req.params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        });

        const data = await response.json();
        res.status(200).send({ salary: data[0].salary });
    }
    catch (err) {
        console.log('Server-Error');
        console.log(err);
        res.send(err);
    }
});

router.get('/emp/:id', async (req, res) => {
    try {
        const employee = await Employee.find({ id: req.params.id });
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.status(200).send(employee);
    }
    catch (err) {
        console.log('Server-Error');
        console.log(err);
        res.send(err);
    }
});

router.post('/emp', async (req, res) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/app/payst/${req.body.unitId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        });

        const data = await response.json();
        console.log(data);
        console.log(data[0].components);
        let _salary = 0;
        for (const component of data[0].components) {
            _salary += Components[component](req.body.experience, req.body.experience);
        }

        const employee = new Employee({
            id: req.body.id,
            name: req.body.name,
            unitId: req.body.unitId,
            experience: req.body.experience,
            salary: _salary,
        });

        console.log(employee);

        await employee.save();
        res.status(200).send();
    }
    catch (err) {
        console.log('Server-Error');
        console.log(err);
        res.send(err);
    }
});


router.post('/payst', async (req, res) => {
    let components = [];

    Object.keys(req.body).map((key) => {
        if (typeof req.body[key] === 'boolean' && req.body[key])
            components.push(key);
    });
    console.log(components);

    const payStructure = new PayStructure({
        unitId: req.body.unitId,
        components: components,
    });

    console.log(payStructure);

    console.log(payStructure);
    try {
        await payStructure.save();
        res.status(200).send();
    }
    catch (err) {
        console.log('Server-Error');
        console.log(err);
        res.send(err);
    }
});


router.get('/payst/:unitId', async (req, res) => {
    try {
        const payStructure = await PayStructure.find({ unitId: req.params.unitId });
        console.log(payStructure);
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.status(200).send(payStructure);
    }
    catch (err) {
        console.log('Server-Error');
        console.log(err);
        res.send(err);
    }
});

export default router;