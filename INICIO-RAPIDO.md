# Inicio Rápido - Sistema de Gestión de Tareas

## Opción 1: Inicio Automático (Recomendado)

Simplemente ejecuta el archivo `start.bat` en la raíz del proyecto:

```
start.bat
```

Esto iniciará automáticamente:
- ✅ Base de datos PostgreSQL
- ✅ Backend (Puerto 8000)
- ✅ Frontend (Puerto 5173)

## Opción 2: Inicio Manual

### 1. Iniciar Base de Datos

```bash
docker-compose up -d
```

### 2. Iniciar Backend

Ejecuta `start-backend.bat` o manualmente:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Iniciar Frontend

Ejecuta `start-frontend.bat` o manualmente:

```bash
cd frontend
npm install
npm run dev
```

## Acceso a la Aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

## Usuarios de Prueba

```
Email: admin@system.com
Password: admin123
Rol: admin

Email: usuario@test.com
Password: admin123
Rol: usuario
```

## Problemas Comunes

### Error: Docker no está corriendo
- Solución: Inicia Docker Desktop

### Error: Puerto 5173 ocupado
- Solución: Cierra otras aplicaciones Vite o cambia el puerto en `vite.config.ts`

### Error: Puerto 8000 ocupado
- Solución: Detén otros servicios en el puerto 8000 o cambia el puerto en `start-backend.bat`

### Error: Base de datos no conecta
```bash
docker-compose down
docker-compose up -d
```

## Ver logs de la Base de Datos

```bash
docker logs gestion_postgres
```

## Detener todos los servicios

```bash
# Detener Backend y Frontend
Ctrl + C en cada ventana

# Detener Base de Datos
docker-compose down
```

## Reiniciar desde cero

```bash
# Eliminar base de datos y volúmenes
docker-compose down -v

# Reiniciar
docker-compose up -d
```

Para más información, consulta el `README.md` completo.
