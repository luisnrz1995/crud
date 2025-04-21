# 🧾 Sistema de Inventario - FullStack con Node.js, MongoDB y Bootstrap (Estilo Gruvbox)

Este proyecto es una **aplicación web fullstack** para gestionar un inventario de productos. Incluye **autenticación**, **registro**, **CRUD de productos**, y un **diseño moderno oscuro** inspirado en el tema **Gruvbox**.

## 🚀 Tecnologías utilizadas

- **Backend**: Node.js + Express.js
- **Base de datos**: MongoDB + Mongoose
- **Frontend**: HTML, CSS (Gruvbox), JavaScript y Bootstrap 5.3.5
- **Diseño**: Tipografía monoespaciada + Paleta Gruvbox
- **Cliente API**: Thunder Client (o Postman para pruebas)

---

## 📂 Estructura del proyecto

```
crud/
├── api/
│   ├── controllers/
│   │   ├── productController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   ├── config/
│   │   └── db.js
│   └── main.js
│
├── public/
│   ├── css/
│   │   ├── styles.css
│   │   └── dashboard.css
│   ├── js/
│   │   └── script.js
│   ├── index.html
│   └── dashboard.html
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/luisnrz1995/crud.git
cd crud
```

2. Instala los módulos del backend:

```bash
npm install
```

3. Configura el archivo `.env` en la raíz:

```
MONGO_URI=mongodb://localhost:27017/inventario
PORT=4000
```

4. Inicia el servidor y el frontend al mismo tiempo:

```bash
npm start
```

- Backend: `http://localhost:4000/api`
- Frontend: `http://localhost:3000`

---

## 🧠 Características clave

- 📝 Registro e inicio de sesión
- 🔒 Bloqueo de acceso al dashboard si no hay sesión activa
- ✨ Interfaz responsive con Bootstrap 5 + paleta Gruvbox
- 🔁 Pestañas dinámicas para login/registro
- ✅ Validación, alertas visuales, limpieza automática de campos
- 📦 CRUD completo de productos con tabla y botones estilizados
- 🚪 Cierre de sesión limpio con protección contra retroceso

---

## 📸 Vista previa

- Pantalla de login / registro con pestañas
- Dashboard completo y responsivo
- Tabla oscura con acciones editables
- Alertas Gruvbox en color rojo o verde

---

## 📄 Licencia

MIT © 2025 – Proyecto académico
