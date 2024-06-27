    <div class="modal fade" id="agregarEmpleadoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 titulo_modal">Registrar Nuevo Empleado</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formularioEmpleado" action="" method="POST" autocomplete="off">
                        <div class="mb-3">
                            <label class="form-label">Nombre</label>
                            <input type="text" name="nombre" class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Cédula (rut)</label>
                            <input type="text" name="cedula" class="form-control" required />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Edad</label>
                            <input type="number" name="edad" class="form-control" required />
                        </div>
                        <div class="row">
                        
                            <div class="col-md-6">
                                <label class="form-label">Sexo</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="sexo" id="sexo_m" value="Masculino" checked>
                                    <label class="form-check-label" for="sexo_m">
                                        Masculino
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="sexo" id="sexo_f" value="Femenino">
                                    <label class="form-check-label" for="sexo_f">
                                        Femenino
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Teléfono</label>
                            <input type="number" name="telefono" class="form-control" required />
                        </div>
                        <div class="mb-3">
                                <label class="form-label">Seleccione el Cargo</label>
                                <select name="cargo" class="form-select" required>
                                    <option selected value="">Seleccione</option>
                                    <option value="Profesor">Profesor</option>
                                    <option value="Asistente">Asistente</option>
                                    <option value="RRHH">RRHH</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Limpieza">Limpieza</option>
                                </select>
                                <div class="mb-3">
                            <label class="form-label">Año ingreso</label>
                            <input type="number" name="año-ingreso" class="form-control" required />
                        </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary btn_add" onclick="window.addNuevoEmpleado(event)">
                                Registrar nuevo empleado
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>