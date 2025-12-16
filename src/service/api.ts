import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7262",
  withCredentials: true,
});

export interface LoginResponse {
  mensaje: string;
  objetoRespuesta: {
    idUsuario: number;
    apellido: string;
    nombre: string;
    fechaNacimiento: string;
    rol: string;
    estado: string;
    user: string;
    contrasenia: string;
    avatar: string;
  };
  estado: boolean;
}

export interface PreguntaFrecuente {
  idPreguntaFrecuente: number;
  descripcion: string;
  estado: string;
  orden: number;
}

export interface MetricaResponse {
  consultasTotales?: number;
  regPorDia?: any[];
  regPorMes?: any[];
}
export interface RespuestaGenerica<T> {
  mensaje: string;
  estado: boolean;
  objetoRespuesta: T;
}

export interface MetricaItem {
  fecha: string;
  totalConversaciones: number;
}

export interface ActividadDTO {
  idActividad: number;
  fecha: string;
  accion: string;
  adminNombre: string;
}

export interface ConfiguracionChatbot {
  idConfig: number;
  mensajeBienvenida: string;
  mensajeFueraHorario: string;
  mensajeMantenimiento: string;
  horaInicio: string;
  horaFin: string;
  habilitarFueraHorario: boolean;
  maxMensajes: number;
  timeoutSegundos: number;
  activo: boolean;
  fechaActualizacion: string;
}

export const loginAdmin = async (
  usuario: string,
  contrasenia: string
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    "/Dialogix/Administrador/login",
    null,
    {
      params: { usuario, contrasenia },
    }
  );
  return data;
};

export const listarPreguntas = async (): Promise<PreguntaFrecuente[]> => {
  const { data } = await api.get("/Dialogix/PreguntasFrecuentes/listar");
  return data.objetoRespuesta;
};

export const registrarPregunta = (
  descripcion: string,
  estado: string,
  orden: number
) =>
  api.post("/Dialogix/PreguntasFrecuentes/registrar", null, {
    params: { descripcion, estado, orden },
  });

export const actualizarPregunta = (
  idPreguntaFrecuente: number,
  descripcion: string,
  estado: string,
  orden: number
) =>
  api.put("/Dialogix/PreguntasFrecuentes/actualizar", null, {
    params: { idPreguntaFrecuente, descripcion, estado, orden },
  });

export const eliminarPregunta = (id: number) =>
  api.delete(`/Dialogix/PreguntasFrecuentes/eliminar/${id}`);

export const enviarMensaje = async (mensaje: string) => {
  const { data } = await api.get("/Dialogix/Paciente/Hablar", {
    params: { mensaje },
    withCredentials: true,
  });
  return data.respuesta;
};

export const resetConversacion = async () => {
  const { data } = await api.post("/Dialogix/Paciente/ResetSession");
  return data;
};

export const reporteMetrica = async (
  FechaInicio: string,
  FechaFin: string
): Promise<RespuestaGenerica<number>> => {
  const { data } = await api.get("/filtrarMetricaUso", {
    params: { FechaInicio, FechaFin },
  });
  return data;
};

export const reporteMetricaDia = async (
  FechaInicio: string,
  FechaFin: string
): Promise<RespuestaGenerica<MetricaItem[]>> => {
  const { data } = await api.get("/filtrarMetricaUsoDia", {
    params: { FechaInicio, FechaFin },
  });
  return data;
};

export const reporteMetricaMes = async (
  FechaInicio: string,
  FechaFin: string
): Promise<RespuestaGenerica<MetricaItem[]>> => {
  const { data } = await api.get("/filtrarMetricaUsoMes", {
    params: { FechaInicio, FechaFin },
  });
  return data;
};

export const metricasHoy = async () => {
  const { data } = await api.get("/metricas/hoy");
  return data;
};

export const totalCitas = async () => {
  const { data } = await api.get("/metricas/citas-total");
  return data;
};

export const subirAvatar = async (idUsuario: number, file: File) => {
  const formData = new FormData();
  formData.append("IdUsuario", idUsuario.toString());
  formData.append("Avatar", file);

  const { data } = await api.post("/Dialogix/Administrador/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const actualizarDatosUsuario = async (
  idUsuario: number,
  nombre: string,
  apellido: string
): Promise<RespuestaGenerica<any>> => {
  const { data } = await api.put(
    "/Dialogix/Administrador/actualizar-datos",
    null,
    {
      params: { idUsuario, nombre, apellido },
    }
  );
  return data;
};

export const totalCitasAtendidas = async () => {
  const { data } = await api.get("/citas-atendidas-total");
  return data;
};

export const citasPorEspecialidadTotales = async () => {
  const { data } = await api.get("/citas-por-especialidad-totales");
  return data;
};

export const listarActividadesRecientes = async (top: number = 10) => {
  const { data } = await api.get("/Dialogix/ActividadesAdmin/ultimas", {
    params: { top },
  });
  return data;
};

export const obtenerConfiguracionChatbot = async (): Promise<
  RespuestaGenerica<ConfiguracionChatbot>
> => {
  const { data } = await api.get("/Dialogix/ConfiguracionChatbot/obtener");
  return data;
};

export const actualizarConfiguracionChatbot = async (
  config: ConfiguracionChatbot
): Promise<RespuestaGenerica<boolean>> => {
  const { data } = await api.put(
    "/Dialogix/ConfiguracionChatbot/actualizar",
    config
  );
  return data;
};
