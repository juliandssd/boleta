import axios  from "axios";
import {ip} from './Task';

export const detalleinsertar= async (data)=>
    await axios.post(`${ip}/api/detalle/insertar`,data);

export const detalleeliminar= async (data)=>
    await axios.post(`${ip}/api/detalle/eliminar`,data);




export const detalleMostrarInfo= async (data)=>
    await axios.post(`${ip}/api/detalle/mostrar`,data);


export const detalletotalapagar= async (data)=>
    await axios.post(`${ip}/api/detalle/total/apagar`,data);

export const detallemostrarid_detalleAocupar= async (data)=>
    await axios.post(`${ip}/api/detalle/mostrar/id_detalle/ocupar`,data);

export const detalleEditarEstadoComprado= async (data)=>
    await axios.post(`${ip}/api/detalle/estado/cambiar/estado/comprado`,data);

export const detalleeliminardefult= async (data)=>
    await axios.post(`${ip}/api/detalle/eliminar/default`,data);



export const detalleverificarpalcodisponibilidadalpagar= async (data)=>
    await axios.post(`${ip}/api/detalle/verificar/disponibilidad/alpagar`,data);

export const detalleporconfirmarpedido= async (data)=>
    await axios.post(`${ip}/api/detalle/por/confirmar`,data);

export const detallesumporconfirmar= async (data)=>
    await axios.post(`${ip}/api/detalle/sum/porconfirmar`,data);

export const detalleconfirmarpedido = async (data) =>
    await axios.post(`${ip}/api/detalle/confirmar/estado`, data);

export const detallepse = async (data) =>
    await axios.post(`${ip}/api/detalle/pse`, data);

export const detallesumpse = async (data) =>
    await axios.post(`${ip}/api/detalle/sum/pse`, data);

export const detalleeditarpedidosbancolombia = async (data) =>
    await axios.post(`${ip}/api/detalle/editar/bancolombia`, data);

export const detallesumbancolombia = async (data) =>
    await axios.post(`${ip}/api/detalle/sum/bancolombia`, data);

export const detalleverificarprocesodepago = async (data) =>
    await axios.post(`${ip}/api/detalle/verificar/pago`, data);





