@echo off
echo ====================================
echo Iniciando Frontend
echo ====================================
echo.

cd /d "%~dp0frontend"

if not exist node_modules (
    echo [1/2] Instalando dependencias de Node.js...
    call npm install
    if errorlevel 1 (
        echo ERROR: No se pudieron instalar las dependencias.
        pause
        exit /b 1
    )
) else (
    echo [1/2] Dependencias ya instaladas.
)

echo [2/2] Iniciando servidor de desarrollo...
echo.
echo ====================================
echo Frontend corriendo en http://localhost:5173
echo ====================================
echo.
echo Para detener el servidor, presiona Ctrl+C
echo.

call npm run dev
