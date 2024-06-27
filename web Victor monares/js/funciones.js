import { edit, getData, remove, save, selectOne } from "./firestore.js";
import { limpiar, verificar, soloNumeros } from "./utilidades.js";

let currentId = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnGuardar').addEventListener('click', handleSave);
    getData(actualizarTabla);
});

async function handleSave() {
    let isValid = true;
    document.querySelectorAll('.form-control').forEach(item => {
        if (!verificar(item.id)) {
            isValid = false;
        }
    });

    if (isValid) {
        const proyecto = {
            codigo: document.getElementById('codigo').value,
            nombre: document.getElementById('nombre').value.trim(),
            tipo: document.getElementById('tipo').value,
            fechaInicio: document.getElementById('fechaInicio').value,
            email: document.getElementById('email').value,
            presupuesto: document.getElementById('presupuesto').value,
            estado: document.querySelector('input[name="estado"]:checked').value
        };

        try {
            if (document.getElementById('btnGuardar').value === 'Guardar') {
                await save(proyecto);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Proyecto guardado correctamente',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                await edit(currentId, proyecto);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Proyecto actualizado correctamente',
                    timer: 2000,
                    showConfirmButton: false
                });
                currentId = 0;
            }
            limpiar();
            getData(actualizarTabla);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    }
}

function actualizarTabla(datos) {
    let tabla = '';
    datos.forEach((item) => {
        tabla += `<tr>
            <td>${item.codigo}</td>
            <td>${item.nombre}</td>
            <td>${item.tipo}</td>
            <td>${item.fechaInicio}</td>
            <td>${item.email}</td>
            <td>${item.presupuesto}</td>
            <td>${item.estado}</td>
            <td nowrap>
                <button class="btn btn-warning" data-id="${item.id}">Editar</button>
                <button class="btn btn-danger" data-id="${item.id}">Eliminar</button>
            </td>
        </tr>`;
    });
    document.getElementById('contenido').innerHTML = tabla;
    agregarEventListeners();
}

function agregarEventListeners() {
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });

    document.querySelectorAll('.btn-warning').forEach(btn => {
        btn.addEventListener('click', handleEdit);
    });
}

function handleDelete() {
    const id = this.dataset.id;
    Swal.fire({
        title: "¿Está seguro que desea eliminar el proyecto?",
        text: "No podrá revertir los cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await remove(id);
                Swal.fire({
                    title: "Eliminado!",
                    text: "El proyecto ha sido eliminado!",
                    icon: "success"
                });
                getData(actualizarTabla);
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el proyecto: ' + error.message, 'error');
            }
        }
    });
}

async function handleEdit() {
    const id = this.dataset.id;
    const proyecto = await selectOne(id);
    const p = proyecto.data();
    document.getElementById('codigo').value = p.codigo;
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('tipo').value = p.tipo;
    document.getElementById('fechaInicio').value = p.fechaInicio;
    document.getElementById('email').value = p.email;
    document.getElementById('presupuesto').value = p.presupuesto;
    document.querySelector(`input[name="estado"][value="${p.estado}"]`).checked = true;

    document.getElementById('btnGuardar').value = 'Actualizar';
    document.getElementById('codigo').readOnly = true;
    currentId = id;
}
