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








