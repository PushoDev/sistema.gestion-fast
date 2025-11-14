@echo off
echo ====================================
echo Iniciando Sistema de Gestion de Tareas
echo ====================================
echo.

echo [1/4] Verificando Docker...
docker ps >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no esta corriendo. Por favor, inicia Docker Desktop.
    pause
    exit /b 1
)

echo [2/4] Iniciando base de datos PostgreSQL...
cd /d "%~dp0"
docker-compose up -d
if errorlevel 1 (
    echo ERROR: No se pudo iniciar PostgreSQL.
    pause
    exit /b 1
)

echo Esperando a que PostgreSQL este listo...
timeout /t 5 /nobreak >nul

echo [3/4] Configurando Backend...
cd backend
if not exist venv (
    echo Creando entorno virtual...
    python -m venv venv
)

echo Activando entorno virtual...
call venv\Scripts\activate.bat

echo Instalando dependencias de Python...
pip install -q -r requirements.txt

echo [4/4] Iniciando servidor Backend...
echo.
echo ====================================
echo Backend corriendo en http://localhost:8000
echo Documentacion API en http://localhost:8000/docs
echo ====================================
echo.
echo Para detener el servidor, presiona Ctrl+C
echo.

uvicorn main:app --reload --host 0.0.0.0 --port 8000
