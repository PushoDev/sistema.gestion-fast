# Sistema de Gestión de Tareas

Sistema completo de gestión de tareas con autenticación JWT, construido con FastAPI y React + TypeScript.

## 🚀 Tecnologías

### Backend
- **FastAPI** - Framework web moderno para Python
- **SQLAlchemy** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación con tokens
- **Bcrypt** - Hash de contraseñas

### Frontend
- **React 18** - Librería UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **TailwindCSS** - Framework CSS
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **React Hook Form + Zod** - Validación de formularios
- **React Hot Toast** - Notificaciones

## 📋 Prerrequisitos

- Python 3.9+
- Node.js 18+
- Docker y Docker Compose
- Git

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd sistema.gestion-fast
```

### 2. Configurar Base de Datos

Iniciar PostgreSQL con Docker:

```bash
docker-compose up -d
```

Esto creará:
- Base de datos PostgreSQL en puerto 5432
- Usuario admin con contraseña admin123
- Tablas y datos de ejemplo

### 3. Configurar Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual (Windows)
venv\Scripts\activate

# Activar entorno virtual (Linux/Mac)
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# El archivo .env ya está configurado con valores por defecto
```

### 4. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install
```

## 🏃 Ejecución

### Iniciar Backend

```bash
cd backend
venv\Scripts\activate  # Windows
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El backend estará disponible en: `http://localhost:8000`
Documentación API: `http://localhost:8000/docs`

### Iniciar Frontend

```bash
cd frontend
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 👤 Usuarios de Prueba

El sistema incluye usuarios de prueba:

```
Email: admin@system.com
Password: admin123
Rol: admin

Email: usuario@test.com
Password: admin123
Rol: usuario
```

## 📚 API Endpoints

### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión

### Usuarios
- `GET /usuarios/me` - Obtener usuario actual
- `GET /usuarios/{id}` - Obtener usuario por ID

### Tareas
- `GET /tareas` - Listar tareas del usuario
- `GET /tareas/{id}` - Obtener tarea específica
- `POST /tareas` - Crear nueva tarea
- `PUT /tareas/{id}` - Actualizar tarea
- `DELETE /tareas/{id}` - Eliminar tarea

## 🗂️ Estructura del Proyecto

```
sistema.gestion-fast/
├── backend/
│   ├── config/
│   │   └── database.py          # Configuración de BD
│   ├── models/
│   │   ├── usuario.py           # Modelo Usuario
│   │   └── tarea.py             # Modelo Tarea
│   ├── routers/
│   │   ├── auth.py              # Rutas de autenticación
│   │   ├── usuario.py           # Rutas de usuarios
│   │   └── tarea.py             # Rutas de tareas
│   ├── schemas/
│   │   ├── usuario.py           # Schemas Pydantic Usuario
│   │   └── tarea.py             # Schemas Pydantic Tarea
│   ├── utils/
│   │   ├── hashing.py           # Hash de contraseñas
│   │   └── oauth2.py            # JWT y autenticación
│   ├── .env                     # Variables de entorno
│   ├── main.py                  # Aplicación principal
│   ├── init.sql                 # Script de inicialización
│   └── requirements.txt         # Dependencias Python
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── context/             # Context API
│   │   ├── hooks/               # Custom hooks
│   │   ├── pages/               # Páginas
│   │   ├── services/            # Servicios API
│   │   ├── types/               # Tipos TypeScript
│   │   ├── App.tsx              # Componente principal
│   │   └── main.tsx             # Punto de entrada
│   ├── package.json             # Dependencias Node
│   ├── vite.config.ts           # Configuración Vite
│   └── tailwind.config.js       # Configuración Tailwind
├── docker-compose.yml           # Configuración Docker
└── README.md                    # Este archivo
```

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación JWT con tokens de 30 minutos
- CORS configurado para desarrollo
- Validación de datos con Pydantic y Zod
- Variables de entorno para secretos

## 🐛 Solución de Problemas

### Error de conexión a la base de datos

Verificar que Docker esté corriendo:
```bash
docker ps
```

Reiniciar contenedor:
```bash
docker-compose down
docker-compose up -d
```

### Error de módulos en Frontend

Limpiar caché y reinstalar:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Error de importación en Backend

Verificar entorno virtual activado:
```bash
cd backend
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

## 📝 Licencia

Este proyecto es de código abierto.

## 👨‍💻 Desarrollo

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -am 'Agregar funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## 📧 Contacto

Para preguntas o soporte, contactar al desarrollador.
