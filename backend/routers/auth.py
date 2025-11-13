# backend/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from config.database import SessionLocal
from models.usuario import Usuario
from schemas.usuario import UsuarioCreate, Usuario
from utils.hashing import hash, verify
from utils.oauth2 import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from jose import jwt, JWTError

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=Usuario)
def register(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.email == usuario.email).first()
    if db_usuario:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = hash(usuario.password)
    db_usuario = Usuario(
        email=usuario.email,
        nombre=usuario.nombre,
        rol=usuario.rol,
        hashed_password=hashed_password
    )
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

@router.post("/login")
def login(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.email == usuario.email).first()
    if not db_usuario or not verify(usuario.password, db_usuario.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_usuario.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user_id": db_usuario.id}