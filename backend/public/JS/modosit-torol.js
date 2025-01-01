function modosit(id) {
    window.location.href = `/konyvmodosit/${id}`;
}

function torol(id) {
    let dolgoz = async () => {
        try {
            const response = await fetch(`/konyvmodosit/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
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
