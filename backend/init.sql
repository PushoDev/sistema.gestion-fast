-- Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tablas iniciales
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'usuario',
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente',
    prioridad VARCHAR(50) DEFAULT 'media',
    usuario_id INTEGER REFERENCES usuarios(id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento TIMESTAMP
);

-- Insertar datos de ejemplo (contraseña: admin123)
INSERT INTO usuarios (email, nombre, hashed_password, rol) VALUES
('admin@system.com', 'Administrador', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'admin'),
('usuario@test.com', 'Usuario Demo', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'usuario')
ON CONFLICT (email) DO NOTHING;

-- Insertar tareas de ejemplo
INSERT INTO tareas (titulo, descripcion, estado, prioridad, usuario_id) VALUES
('Configurar proyecto', 'Configurar Docker y PostgreSQL para el sistema de gestión', 'completada', 'alta', 1),
('Desarrollar API Backend', 'Crear endpoints con FastAPI y autenticación JWT', 'en_progreso', 'alta', 1),
('Diseñar interfaz dashboard', 'Crear componentes Vue/Nuxt con TailwindCSS', 'pendiente', 'media', 2),
('Implementar autenticación', 'Sistema de login/registro con JWT tokens', 'pendiente', 'alta', 1),
('Crear CRUD de tareas', 'Funcionalidad completa para gestionar tareas', 'pendiente', 'media', 2)
ON CONFLICT DO NOTHING;

-- Verificar inserciones
SELECT 'Usuarios insertados: ' || COUNT(*) FROM usuarios;
SELECT 'Tareas insertadas: ' || COUNT(*) FROM tareas;