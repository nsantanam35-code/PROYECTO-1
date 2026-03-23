function seleccionarMedico(nombre) {
    localStorage.setItem('medico_seleccionado', nombre);
    if (localStorage.getItem('session')) {
        renderDashboard(localStorage.getItem('session'));
        window.location.href = "#seccion-login";
    } else {
        window.location.href = "#seccion-login";
        alert("Has seleccionado a " + nombre + ". Inicia sesión para confirmar.");
    }
}

function renderDashboard(user) {
    const users = JSON.parse(localStorage.getItem('users_db')) || {};
    const data = users[user];
    const medicoPendiente = localStorage.getItem('medico_seleccionado');
    
    if(!data) return;

    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('dashboard-container').classList.remove('hidden');
    document.getElementById('user-info-display').innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <span>Paciente: <strong>${data.nombre}</strong></span>
            <span class="badge bg-info text-dark">${data.prevision || 'FONASA'}</span>
        </div>
    `;

    // ÁREA DE AGENDAMIENTO ACTIVO
    const agendaDiv = document.getElementById('agenda-selector');
    if(medicoPendiente) {
        agendaDiv.innerHTML = `
            <div class="alert alert-warning border-0 shadow-sm">
                <h6 class="fw-bold text-dark">🗓️ Reservando con ${medicoPendiente}</h6>
                <input type="date" id="fecha-cita" class="form-control form-control-sm mb-2" value="2026-03-24">
                <div class="d-flex gap-2 flex-wrap">
                    <button onclick="confirmarCita('09:00')" class="btn btn-sm btn-danger">09:00</button>
                    <button onclick="confirmarCita('11:00')" class="btn btn-sm btn-danger">11:00</button>
                    <button onclick="confirmarCita('16:00')" class="btn btn-sm btn-danger">16:00</button>
                </div>
                <button onclick="cancelarSeleccion()" class="btn btn-link btn-sm text-muted mt-2">Cancelar</button>
            </div>
        `;
    } else {
        agendaDiv.innerHTML = `
            <div class="p-3 text-center border rounded border-secondary border-opacity-25 bg-white">
                <p class="small text-muted mb-2">¿Necesitas una nueva cita?</p>
                <a href="#telemedicina" class="btn btn-outline-danger btn-sm px-4">Ver Especialistas</a>
            </div>
        `;
    }

    // LISTADO DE CITAS CONFIRMADAS
    const citas = data.citas || [];
    const listaCitasHTML = citas.length > 0 
        ? citas.map(c => `<li class="list-group-item d-flex justify-content-between align-items-center small">
            <span>📅 ${c.fecha} - ${c.hora}</span>
            <span class="fw-bold">${c.medico}</span>
          </li>`).join('')
        : '<li class="list-group-item text-muted small text-center">No tienes citas programadas</li>';

    document.getElementById('lista-recetas').innerHTML = `
        <div class="mt-3">
            <h6 class="fw-bold small text-uppercase text-secondary">Mis Próximas Citas</h6>
            <ul class="list-group list-group-flush mb-3">${listaCitasHTML}</ul>
            <h6 class="fw-bold small text-uppercase text-secondary">Recetas y Órdenes</h6>
            <ul class="list-group list-group-flush">${data.recetas.map(r => `<li class="list-group-item border-0 px-0">📄 ${r}</li>`).join('')}</ul>
        </div>
    `;
}

function confirmarCita(hora) {
    const fecha = document.getElementById('fecha-cita').value;
    const medico = localStorage.getItem('medico_seleccionado');
    const user = localStorage.getItem('session');
    
    if(!fecha) { alert("Selecciona una fecha"); return; }

    let users = JSON.parse(localStorage.getItem('users_db'));
    if(!users[user].citas) users[user].citas = [];
    
    // Guardamos la cita en el perfil del usuario
    users[user].citas.push({ medico, fecha, hora });
    localStorage.setItem('users_db', JSON.stringify(users));
    
    alert(`✅ Cita confirmada con ${medico}`);
    localStorage.removeItem('medico_seleccionado');
    renderDashboard(user); // Actualizamos la vista sin recargar la página completa
}

function cancelarSeleccion() {
    localStorage.removeItem('medico_seleccionado');
    renderDashboard(localStorage.getItem('session'));
}

function logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('medico_seleccionado');
    location.reload();
}

// Mantener el resto de funciones de login/registro iguales...
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value.toLowerCase();
    const pass = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users_db')) || {};
    if (users[user] && users[user].pass === pass) {
        localStorage.setItem('session', user);
        renderDashboard(user);
    } else { alert("Datos incorrectos"); }
});

if(localStorage.getItem('session')) renderDashboard(localStorage.getItem('session'));
