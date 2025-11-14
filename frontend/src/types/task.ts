export interface Task {
  id?: number;
  titulo: string;
  descripcion?: string;
  estado: string;
  prioridad: string;
  usuario_id?: number;
  fecha_creacion?: string;
  fecha_vencimiento?: string;
}
