# backend/main.py
from fastapi import FastAPI
from routers import tarea, usuario
from config.database import engine, Base
from routers import auth

# Crear las tablas en la base de datos si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API de Gestión de Tareas")

app.include_router(auth.router)
app.include_router(usuario.router)
app.include_router(tarea.router)

@app.get("/")
def read_root():
    return {"message": "API de Gestión de Tareas está corriendo!"}