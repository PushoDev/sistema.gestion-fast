# backend/models/__init__.py
from .usuario import Usuario
from .tarea import Tarea

Usuario.tareas = relationship("Tarea", order_by=Tarea.id, back_populates="usuario")