# backend/routers/tareas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import SessionLocal
from models.tarea import Tarea as TareaModel
from models.usuario import Usuario as UsuarioModel
from schemas.tarea import Tarea, TareaCreate, TareaUpdate
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

@router.get("/{id}", response_model=Tarea)
def get_tarea(id: int, current_user: UsuarioModel = Depends(get_current_user), db: Session = Depends(get_db)):
    tarea = db.query(TareaModel).filter(TareaModel.id == id, TareaModel.usuario_id == current_user.id).first()
    if not tarea:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return tarea

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

@router.put("/{id}", response_model=Tarea)
def update_tarea(id: int, tarea: TareaUpdate, current_user: UsuarioModel = Depends(get_current_user), db: Session = Depends(get_db)):
    db_tarea = db.query(TareaModel).filter(TareaModel.id == id, TareaModel.usuario_id == current_user.id).first()
    if not db_tarea:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    
    data = tarea.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(db_tarea, key, value)
    
    db.commit()
    db.refresh(db_tarea)
    return db_tarea

@router.delete("/{id}")
def delete_tarea(id: int, current_user: UsuarioModel = Depends(get_current_user), db: Session = Depends(get_db)):
    db_tarea = db.query(TareaModel).filter(TareaModel.id == id, TareaModel.usuario_id == current_user.id).first()
    if not db_tarea:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    
    db.delete(db_tarea)
    db.commit()
    return {"message": "Tarea eliminada exitosamente"}