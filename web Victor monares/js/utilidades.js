export const limpiar = (id) => {
    document.getElementById(id).value = '';
};

export const verificar = (id) => {
    const elemento = document.getElementById(id);
    if (elemento.value.trim() === '') {
        elemento.classList.add('is-invalid');
        document.getElementById(`e-${id}`).textContent = 'Este campo es obligatorio';
    } else {
        elemento.classList.remove('is-invalid');
        document.getElementById(`e-${id}`).textContent = '';
    }
};

export const soloNumeros = (id) => {
    const elemento = document.getElementById(id);
    elemento.value = elemento.value.replace(/[^0-9]/g, '');
};
