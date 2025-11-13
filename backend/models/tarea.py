# backend/models/tarea.py
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship # <-- Importar relationship aquí
from config.database import Base
from datetime import datetime

class Tarea(Base):
    __tablename__ = "tareas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(200), nullable=False)
    descripcion = Column(Text)
    estado = Column(String(50), default='pendiente')
    prioridad = Column(String(50), default='media')
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    fecha_vencimiento = Column(DateTime)

    # Relación con el modelo Usuario
    usuario = relationship("Usuario", back_populates="tareas")