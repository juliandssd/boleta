import axios  from "axios";
import {ip} from './Task';


export const posicionesinsertar= async (data)=>
    await axios.post(`${ip}/api/posiciones/insertar`,data);

export const posicionesmostrar= async (id)=>
    await axios.get(`${ip}/api/posiciones/mostrar/${id}`);

export const posicionesmostrarporcliente= async (id)=>
    await axios.get(`${ip}/api/posiciones/mostrar/por/id/evento/cliente/${id}`);

export const posicioneseliminar= async (data)=>
    await axios.post(`${ip}/api/posiciones/delete`,data);






