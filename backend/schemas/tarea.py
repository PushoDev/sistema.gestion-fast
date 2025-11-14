# backend/schemas/tarea.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from .usuario import Usuario

class TareaBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    estado: Optional[str] = 'pendiente'
    prioridad: Optional[str] = 'media'
    fecha_vencimiento: Optional[datetime] = None

class TareaCreate(TareaBase):
    pass

class TareaUpdate(BaseModel):
    titulo: Optional[str] = None
    descripcion: Optional[str] = None
    estado: Optional[str] = None
    prioridad: Optional[str] = None
    fecha_vencimiento: Optional[datetime] = None

class Tarea(TareaBase):
    id: int
    usuario_id: int
    fecha_creacion: datetime
    usuario: Optional[Usuario] = None

    class Config:
        from_attributes = True