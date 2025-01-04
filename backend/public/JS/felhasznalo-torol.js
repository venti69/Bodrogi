function felhasznaloTorol(id) {
    let dolgoz = async () => {
        try {
            const response = await fetch(`/felhasznalok/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const valasz = await response.json();

            if (response.ok) {
                window.alert(valasz.msg);
                window.location.href = '/felhasznalok';
            } else {
                window.alert(valasz.msg);
            }
        } catch (error) {
            console.log(`Valami hiba történt: ${error.message}`);
        }
    };

    dolgoz();
}
