import { Router } from 'express';
import Unit from './models/unit.js';
import Employee from './models/employee.js';
import PayStructure from './models/payStructure.js';
import Components from './data/components.js';
import Attendance from './models/attendance.js';

const router = Router();

router.post('/unit', async (req, res) => {
    try {
        const unit = new Unit({
            id: req.body.id,
            name: req.body.name,
            task: req.body.task,
            region: req.body.region,
            currency: req.body.currency,
        });

        console.log(unit);

        await unit.save();
        res.status(404).send();
    }
    catch (err) {
        console.log('Server-Error');
        console.log(err);
        res.send(err);
    }
});

router.post('/payst', async (req, res) => {
    try {
        let components = [];

        Object.entries(req.body.componentStatus).map(([component, status]) => {
            if (status)
                components.push(component);
        });
        console.log(components);

        const payStructure = new PayStructure({
            unitId: req.body.unitId,
            components: components,
        });

        console.log(payStructure);

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

router.post('/emp', async (req, res) => {
    try {
        let _salary = await getSalary(req);
        console.log('_salary')
        console.log(_salary)
        const employee = new Employee({
            id: req.body.id,
            name: req.body.name,
            unitId: req.body.unitId,
            experience: req.body.experience,
            avgWorkHour: null,
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

router.get('/components', async (req, res) => {
    try {
        let componentStatus = {};
        Object.keys(Components).map((component) => {
            componentStatus[component] = false
        });

        res.status(200).send(componentStatus);
    }
    catch (err) {
        console.log('Server-error');
        console.log(err);
        res.send(err);
    }
});

const getSalary = async (req) => {
    const response = await fetch(`http://127.0.0.1:3000/app/payst/${req.body.unitId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    });

    const data = await response.json();
    console.log('data');
    console.log(data);
    console.log('data[0].components');
    console.log(data[0].components);
    let _salary = 0;
    for (const component of data[0].components) {
        // console.log(component)
        // console.log(typeof Components[component])
        // console.log(req.body.experience)
        let temp = Components[component](req.body.experience, req.body.experience);
        // console.log(temp)
        _salary += temp;
    }
    return _salary;
}

router.put('/attendance', async (req, res) => {
    try {
        const attendance = new Attendance({
            empId: req.body.empId,
            attendanceDates: req.body.attendanceDates
        })

        let attendanceModified = {};
        attendanceModified = Object.assign(attendanceModified, attendance._doc);
        console.log(attendanceModified);
        delete attendanceModified._id;
        console.log(attendanceModified);
        console.log(attendance);

        await Attendance.findOneAndUpdate(
            { empId: attendance.empId },
            attendanceModified,
            { upsert: true, new: true }
        );
        
        res.status(200).send();
    } catch (err) {
        console.log('Server-Error');
        console.log(err);
        res.send(err);
    }
});


router.put('/empAttend', (req, res) => {
    try {
        console.log(req.body);
        res.status(200).send();
    } catch (err) {
        console.log('Server-Error');
        res.send(err);
    }
});

export default router;