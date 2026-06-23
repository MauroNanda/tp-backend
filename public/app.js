const API_BASE = '/api';

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.getElementById('tab-' + tabId).style.display = 'block';
  document.getElementById('page-title').innerText = 'Gestión de ' + tabId.charAt(0).toUpperCase() + tabId.slice(1);
  loadData(tabId);
}

function toggleForm(entity) {
  const formContainer = document.getElementById('form-container-' + entity);
  if (formContainer.style.display === 'none') {
    formContainer.style.display = 'block';
  } else {
    formContainer.style.display = 'none';
  }
}

async function loadData(entity) {
  try {
    let url = `${API_BASE}/${entity}`;
    const res = await fetch(url);
    const data = await res.json();
    renderTable(entity, data);
  } catch (err) {
    console.error('Error loading data:', err);
  }
}

function renderTable(entity, data) {
  const tbody = document.getElementById('tbody-' + entity);
  tbody.innerHTML = '';
  
  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 20px;">No hay datos registrados en ${entity}.</td></tr>`;
    return;
  }
  
  data.forEach(row => {
    const tr = document.createElement('tr');
    if (entity === 'clientes') {
      tr.innerHTML = `<td>${row.id}</td><td>${row.nombre}</td><td>${row.apellido}</td><td>${row.dni}</td>`;
    } else if (entity === 'socios') {
      tr.innerHTML = `<td>${row.id}</td><td>${row.nombre}</td><td>${row.apellido}</td><td>${row.dni}</td><td>${row.numeroSocio}</td><td>${row.activo ? 'Sí':'No'}</td>
        <td>
          <button class="action-btn toggle-btn" onclick="toggleStatus('socios', ${row.id}, ${row.activo})">Cambiar Estado</button>
          <button class="action-btn delete-btn" onclick="deleteRecord('socios', ${row.id})">Borrar</button>
        </td>`;
    } else if (entity === 'transacciones') {
      const clienteInfo = row.Cliente ? `${row.Cliente.nombre} ${row.Cliente.apellido}` : 'N/A';
      tr.innerHTML = `<td>${row.id}</td><td>${row.clienteId || 'N/A'}</td><td>${clienteInfo}</td><td>${row.IdiomaOrigen}</td><td>${row.IdiomaDestino}</td>`;
    } else if (entity === 'empleados') {
      tr.innerHTML = `<td>${row.id}</td><td>${row.nombre}</td><td>${row.apellido}</td><td>${row.email}</td>`;
    } else if (entity === 'publicaciones') {
      tr.innerHTML = `<td>${row.id}</td><td>${row.Título}</td><td>${row.vigente ? 'Sí':'No'}</td><td>${row.empleado || row.empleadoId}</td>
        <td>
          <button class="action-btn toggle-btn" onclick="toggleStatus('publicaciones', ${row.id}, ${row.vigente})">Cambiar Estado</button>
          <button class="action-btn delete-btn" onclick="deleteRecord('publicaciones', ${row.id})">Borrar</button>
        </td>`;
    }
    tbody.appendChild(tr);
  });
}

async function submitForm(e, entity) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  
  if (entity === 'publicaciones') {
    payload.vigente = form.querySelector('[name="vigente"]').checked;
  }

  try {
    const res = await fetch(`${API_BASE}/${entity}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
      form.reset();
      document.getElementById('form-container-' + entity).style.display = 'none';
      loadData(entity);
    } else {
      const err = await res.json();
      const errorMsg = err.error || err.msg || 'Fallo al guardar';
      alert('Atención: ' + (typeof errorMsg === 'object' ? errorMsg.message || 'Error interno' : errorMsg));
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteRecord(entity, id) {
  if (!confirm('¿Seguro que deseas borrar este registro?')) return;
  try {
    const res = await fetch(`${API_BASE}/${entity}/${id}`, { method: 'DELETE' });
    if (res.ok) loadData(entity);
  } catch (err) {
    console.error(err);
  }
}

async function toggleStatus(entity, id, currentStatus) {
  try {
    const payload = entity === 'socios' ? { activo: !currentStatus } : { vigente: !currentStatus };
    const res = await fetch(`${API_BASE}/${entity}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) loadData(entity);
  } catch (err) {
    console.error(err);
  }
}

showTab('clientes');
