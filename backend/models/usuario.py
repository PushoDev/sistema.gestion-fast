# backend/models/usuario.py
from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.orm import relationship # <-- Importar relationship aquí
from config.database import Base
from datetime import datetime

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    nombre = Column(String(100), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    rol = Column(String(50), default='usuario')
    activo = Column(Boolean, default=True)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)

    # Definir la relación aquí
    tareas = relationship("Tarea", order_by="Tarea.id", back_populates="usuario") # Usar string para evitar import cíclico