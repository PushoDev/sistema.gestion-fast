@echo off
echo ====================================
echo Iniciando Sistema Completo
echo ====================================
echo.
echo Este script iniciara:
echo 1. Base de datos PostgreSQL (Docker)
echo 2. Backend FastAPI (Puerto 8000)
echo 3. Frontend React (Puerto 5173)
echo.
echo NOTA: Se abriran 2 ventanas adicionales.
echo       NO cierres ninguna ventana hasta terminar de usar la aplicacion.
echo.
pause

echo Iniciando Backend...
start "Backend - FastAPI" cmd /k "%~dp0start-backend.bat"

timeout /t 10 /nobreak >nul

echo Iniciando Frontend...
start "Frontend - React" cmd /k "%~dp0start-frontend.bat"

echo.
echo ====================================
echo Sistema iniciado correctamente!
echo ====================================
echo.
echo Accede a la aplicacion en:
echo http://localhost:5173
echo.
echo Usuarios de prueba:
echo - Email: admin@system.com
echo - Password: admin123
echo.
echo Presiona cualquier tecla para cerrar esta ventana.
pause >nul
