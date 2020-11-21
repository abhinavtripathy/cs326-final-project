window.addEventListener('load', async function () {

    document.getElementById('submit-profile').addEventListener('click', () => {
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value;
        const emergency = document.getElementById('emergency').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const pickUpLocation = document.getElementById('pickup').value;
        const password = document.getElementById('password').value;
        const response = await fetch('/patients', {
            method: 'POST',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                age: age,
                phone: phone,
                emergency_phone: emergency,
                home_address: address,
                email: email,
                pickup: pickUpLocation,
                password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        if(response.ok) {
            alert('Signed up successfully.');
        } else {
            alert('Error signing up.');
        }
    });
});
