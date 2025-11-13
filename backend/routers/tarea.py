# backend/routers/tareas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import SessionLocal
from models.tarea import Tarea as TareaModel
from models.usuario import Usuario as UsuarioModel
from schemas.tarea import Tarea, TareaCreate
from utils.oauth2 import get_current_user

router = APIRouter(
    prefix="/tareas",
    tags=["tareas"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[Tarea])
def get_tareas(current_user: UsuarioModel = Depends(get_current_user), db: Session = Depends(get_db)):
    tareas = db.query(TareaModel).filter(TareaModel.usuario_id == current_user.id).all()
    return tareas

@router.post("/", response_model=Tarea)
def create_tarea(tarea: TareaCreate, current_user: UsuarioModel = Depends(get_current_user), db: Session = Depends(get_db)):
    data = tarea.model_dump()
    # Fuerza la tarea a pertenecer al usuario autenticado
    data["usuario_id"] = current_user.id
    db_tarea = TareaModel(**data)
    db.add(db_tarea)
    db.commit()
    db.refresh(db_tarea)
    return db_tarea