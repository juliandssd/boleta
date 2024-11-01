import axios  from "axios";
import {ip} from './Task';

export const InsertarImgeventosT= async (data)=>
    await axios.post(`${ip}/api/evento/guardar/imagenes`,data);

export const planoinsertarimagenes= async (data)=>
    await axios.post(`${ip}/api/plano/insertar`,data);


export const eventoeditarubicacion= async (data)=>
    await axios.put(`${ip}/api/evento/editar/ubicacion`,data);

export const eventoeditaredades = async (data)=>
    await axios.put(`${ip}/api/evento/editar/edades`,data);

export const eventomostrarPorUser= async (id)=>
    await axios.get(`${ip}/api/evento/mostrar/porUser/${id}`);

export const infoevento__editarresponsabilidades = async (data)=>
    await axios.put(`${ip}/api/infoevento/editar/responsabilidades`,data);


export const eventsMostrarIdEvents= async (id)=>
    await axios.get(`${ip}/api/infoevento/mostrar/poridvento/${id}`);

export const planomostrarporid_evento= async (id)=>
    await axios.get(`${ip}/api/plano/mostrar/porid_evento/${id}`);


export const eventopublicarpublicidadprincipal= async ()=>
    await axios.get(`${ip}/api/evento/publicar/publicidad`);



export const infoeventoinsertarpordefault= async (data)=>
    await axios.post(`${ip}/api/infodefault/insertar`,data);



