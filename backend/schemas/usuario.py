# backend/schemas/usuario.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UsuarioBase(BaseModel):
    email: str
    nombre: str
    rol: Optional[str] = 'usuario'

class UsuarioCreate(UsuarioBase):
    password: str

class Usuario(UsuarioBase):
    id: int
    activo: bool
    fecha_creacion: datetime

    class Config:
        from_attributes = True