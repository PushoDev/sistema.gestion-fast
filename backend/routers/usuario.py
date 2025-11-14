# backend/routers/usuarios.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import SessionLocal
from models.usuario import Usuario as UsuarioModel
from schemas.usuario import Usuario
from utils.oauth2 import get_current_user

router = APIRouter(
    prefix="/usuarios",
    tags=["usuarios"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/me", response_model=Usuario)
def get_current_user_info(current_user: UsuarioModel = Depends(get_current_user)):
    return current_user

@router.get("/{usuario_id}", response_model=Usuario)
def get_usuario(usuario_id: int, current_user: UsuarioModel = Depends(get_current_user), db: Session = Depends(get_db)):
    usuario = db.query(UsuarioModel).filter(UsuarioModel.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario