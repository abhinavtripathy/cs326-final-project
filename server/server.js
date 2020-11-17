import express from 'express';
import pgPromise from 'pg-promise';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public/'));
app.use(express.json());

let database = {};

const pgp = pgPromise({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },
    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }

});

// Local PostgreSQL credentials
const username = "postgres";
const password = "postgres";

const url = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/`;
const db = pgp(url);


async function connectAndRun(task) {
    let connection = null;

    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        throw e;
    } finally {
        try {
            connection.done();
        } catch (ignored) {

        }
    }
}

async function getHospital() {
    return await connectAndRun(db => db.any("SELECT * FROM patient;"))
}

// Print Database  
app.post('/database', (req, res) => {
    // const hospitals = await getHospital();
    // res.send(JSON.stringify(hospitals));
    console.log(req.body);
    res.send({
        'hello': 'world'
    });

});


// POST Patients 
app.post('/patients', async (req, res) => {
    const data = req.body;
    console.log(data);
    await connectAndRun(db => db.none("INSERT INTO patient(first_name, last_name, phone, email, age, emergency_phone, address, pickup, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [data.first_name, data.last_name, data.phone, data.email, data.age, data.emergency_phone, data.address, data.pickup, data.password]));
    res.send({
        'message': 'success'
    });
});

// GET All Patients 
app.get('/patients', async (req, res) => {
    const patients = await connectAndRun(db => db.any("SELECT * FROM patient;"))
    res.send(JSON.stringify(patients));
});

// GET Patients 
app.get('/patients/:id', async (req, res) => {
    const patients = await connectAndRun(db => db.any("SELECT * FROM patient where id = $1;", [parseInt(req.params.id)]));
    res.send(JSON.stringify(patients));
});

// PUT Patients 
app.put('/patients/:id', async (req, res) => {
    await connectAndRun(db => db.none("update patient set first_name = $1, last_name = $2, phone = $3, email = $4, age = $5, emergency_phone = $6, address = $7, pickup = $8, password = $9 where id = $10", [data.first_name, data.last_name, data.phone, data.email, data.age, data.emergency_phone, data.address, data.pickup, data.password, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});

// DELETE Patients 
app.delete('/patients/:id', async (req, res) => {
    await connectAndRun(db => db.none("delete from patient where id = $1", [parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});



// POST Drivers
app.post('/drivers', async (req, res) => {
    const data = req.body;
    console.log(data);
    await connectAndRun(db => db.none("INSERT INTO patient(first_name, last_name, phone, email, age, car_make, car_model, car_color, car_plate, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);", [data.first_name, data.last_name, data.phone, data.email, data.age, data.car_make, data.car_model, data.car_color, data.car_plate, data.password]));
    res.send({
        'message': 'success'
    });
});

// GET Drivers
app.get('/drivers/:id', async (req, res) => {
    const drivers = await connectAndRun(db => db.any("SELECT * FROM driver where id = $1;", [parseInt(req.params.id)]));
    res.send(JSON.stringify(drivers));
});

// PUT Drivers
app.put('/drivers/:id', async (req, res) => {
    await connectAndRun(db => db.none("update patient set first_name = $1, last_name = $2, phone = $3, email = $4, age = $5, car_make = $6, car_model = $7, car_color = $8, car_plate = $9, password = $10 where id = $11", [data.first_name, data.last_name, data.phone, data.email, data.age, data.car_make, data.car_model, data.car_color, data.car_plate, data.password, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});

// DELETE Drivers
app.delete('/drivers/:id', (req, res) => {
    await connectAndRun(db => db.none("delete from driver where id = $1", [parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});



// PUT Patients 
app.put('/hospitals/:id', (req, res) => {
    if (database['hospitals'].find(item => {
            return item.id === parseInt(req.params.id);
        })) {
        for (let i = 0; i < database['hospitals'].length; i++) {
            if (database['hospitals'][i].id === parseInt(req.params.id)) {
                database['hospitals'][i] = req.body;
            }

        }
        res.send({
            'Message': 'Success'
        });
    } else {
        res.send({
            'message': 'error'
        });
    }
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});