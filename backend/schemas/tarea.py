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
    usuario_id: int

class Tarea(TareaBase):
    id: int
    usuario_id: int
    fecha_creacion: datetime
    usuario: Optional[Usuario] = None

    class Config:
        from_attributes = True