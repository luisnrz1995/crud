const API_URL = 'http://localhost:4000/api';

// === BLOQUEO DE ACCESO AL DASHBOARD SIN SESIÓN ===
if (window.location.pathname.includes("dashboard.html")) {
  const usuario = localStorage.getItem('user');
  if (!usuario) {
    window.location.replace('index.html');
  }
}

// === LIMPIAR CAMPOS TRAS CIERRE DE SESIÓN ===
if (window.location.pathname.includes("index.html")) {
  if (sessionStorage.getItem('logout') === 'true') {
    const correo = document.getElementById('correo-login');
    const clave = document.getElementById('clave-login');
    if (correo) correo.value = '';
    if (clave) clave.value = '';
    sessionStorage.removeItem('logout');
  }
}

// === ELEMENTOS DE LOGIN / REGISTRO ===
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('form-login');
const registerForm = document.getElementById('form-register');
const alerta = document.getElementById('alerta');

// === CAMBIO DE PESTAÑAS ===
if (loginTab && registerTab && loginForm && registerForm) {
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('btn-warning', 'text-dark');
    loginTab.classList.remove('btn-outline-warning');
    registerTab.classList.remove('btn-warning', 'text-dark');
    registerTab.classList.add('btn-outline-warning');

    loginForm.classList.remove('d-none');
    registerForm.classList.add('d-none');
  });

  registerTab.addEventListener('click', () => {
    registerTab.classList.add('btn-warning', 'text-dark');
    registerTab.classList.remove('btn-outline-warning');
    loginTab.classList.remove('btn-warning', 'text-dark');
    loginTab.classList.add('btn-outline-warning');

    registerForm.classList.remove('d-none');
    loginForm.classList.add('d-none');
  });
}

// === ALERTAS VISUALES ===
function mostrarAlerta(mensaje, tipo = 'exito') {
  if (!alerta) return;
  alerta.textContent = mensaje;
  alerta.className = `alert alert-${tipo === 'exito' ? 'success' : 'danger'}`;
  alerta.classList.remove('d-none');

  setTimeout(() => {
    alerta.classList.add('d-none');
  }, 3000);
}

// === REGISTRO DE USUARIO ===
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, clave })
      });

      if (res.ok) {
        mostrarAlerta('Usuario registrado con éxito', 'exito');
        registerForm.reset();
        loginTab.click();
      } else {
        mostrarAlerta('Error al registrar usuario', 'error');
      }
    } catch (error) {
      mostrarAlerta('Error de conexión', 'error');
    }
  });
}

// === LOGIN DE USUARIO ===
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = document.getElementById('correo-login').value.trim().toLowerCase();
    const clave = document.getElementById('clave-login').value.trim();

    try {
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) throw new Error();
      const usuarios = await res.json();

      const usuario = usuarios.find(
        (u) => u.correo === correo && u.clave === clave
      );

      if (usuario) {
        localStorage.setItem('user', JSON.stringify(usuario));
        mostrarAlerta('Login exitoso', 'exito');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        mostrarAlerta('Correo o contraseña incorrectos', 'error');
      }
    } catch (error) {
      mostrarAlerta('Error en la conexión', 'error');
    }
  });
}

// === DASHBOARD ===
const formProducto = document.getElementById('form-producto');
const tablaProductos = document.querySelector('#tabla-productos');
let editandoId = null;

// === CARGAR PRODUCTOS ===
async function cargarProductos() {
  if (!tablaProductos) return;
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Error al obtener productos');
    const productos = await res.json();

    tablaProductos.innerHTML = '';
    productos.forEach(prod => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td>$${prod.precio.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-warning text-dark" onclick="editarProducto('${prod._id}')">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${prod._id}')">Eliminar</button>
        </td>
      `;
      tablaProductos.appendChild(fila);
    });
  } catch (error) {
    mostrarAlerta('Error al cargar productos', 'error');
  }
}

// === GUARDAR / ACTUALIZAR PRODUCTO ===
if (formProducto && tablaProductos) {
  formProducto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre-producto').value;
    const descripcion = document.getElementById('descripcion-producto').value;
    const precio = parseFloat(document.getElementById('precio-producto').value);

    const producto = { nombre, descripcion, precio };

    try {
      const url = editandoId ? `${API_URL}/products/${editandoId}` : `${API_URL}/products`;
      const method = editandoId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });

      if (res.ok) {
        mostrarAlerta(editandoId ? 'Producto actualizado' : 'Producto agregado', 'exito');
        formProducto.reset();
        editandoId = null;
        cargarProductos();
      } else {
        mostrarAlerta('Error al guardar producto', 'error');
      }
    } catch (error) {
      mostrarAlerta('Error en la conexión', 'error');
    }
  });

  cargarProductos();
}

// === EDITAR PRODUCTO ===
window.editarProducto = async function (id) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error('No encontrado');
    const producto = await res.json();

    document.getElementById('nombre-producto').value = producto.nombre;
    document.getElementById('descripcion-producto').value = producto.descripcion;
    document.getElementById('precio-producto').value = producto.precio;
    editandoId = id;
  } catch (err) {
    mostrarAlerta('No se pudo cargar el producto', 'error');
  }
};

// === ELIMINAR PRODUCTO ===
window.eliminarProducto = async function (id) {
  if (!confirm('¿Estás seguro de eliminar este producto?')) return;

  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      mostrarAlerta('Producto eliminado', 'exito');
      cargarProductos();
    } else {
      mostrarAlerta('Error al eliminar producto', 'error');
    }
  } catch (err) {
    mostrarAlerta('Error al eliminar producto', 'error');
  }
};

// === LOGOUT ===
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.setItem('logout', 'true');
    window.location.replace('index.html');
  });
}
