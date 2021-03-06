window.addEventListener('load', async function () {

    document.getElementById('submit-profile').addEventListener('click', async () => {
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value;
        const carModel = document.getElementById('car-model').value;
        const carType = document.getElementById('car-type').value;
        const carMake = document.getElementById('car-make').value;
        const license = document.getElementById('license').value;
        const email = document.getElementById('email').value;
        const carColor = document.getElementById('car-color').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/drivers', {
            method: 'POST',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                age: age,
                phone: phone,
                car_model: carModel,
                car_make: carMake,
                car_type: carType,
                car_color: carColor,
                car_plate: license,
                email: email,
                password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        if (response.ok) {
            alert('Signed up successfully.');
            window.location.href = 'login.html';
        } else {
            alert('Error signing up.');
        }
    });
});