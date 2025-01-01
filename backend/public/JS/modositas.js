function feldolgozas(event, id) {
    event.preventDefault();

    let dolgoz = async () => {
        try {
            const cim = document.querySelector('#cim').value;
            const szerzo = document.querySelector('#szerzo').value;
            const ar = Number(document.querySelector('#ar').value);
            const oldalszam = Number(
                document.querySelector('#oldalszam').value
            );
            const kep = document.querySelector('#kep').value;
            const tipus = document.querySelector('#tipus').value;

            const response = await fetch(`/konyvmodosit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cim,
                    szerzo,
                    ar,
                    oldalszam,
                    kep,
                    tipus,
                }),
            });

            const valasz = await response.json();

            if (response.ok) {
                window.alert(valasz.msg);
                window.location.href = '/konyvek';
            } else {
                window.alert(valasz.msg);
            }
        } catch (error) {
            console.log(`Valami hiba történt: ${error.message}`);
        }
    };

    dolgoz();
}
