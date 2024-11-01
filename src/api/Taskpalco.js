import axios  from "axios";
import {ip} from './Task';


export const palcoinsertar= async (data)=>
    await axios.post(`${ip}/api/palco/insertar`,data);
export const MostrarPosicionesporidposiciones= async (id)=>
    await axios.get(`${ip}/api/palcoMostrarPorIdposicion/${id}`);

export const PalcoMostrarAeditarPorIdPosiciones= async (id)=>
    await axios.get(`${ip}/api/Palco/mostrar/editar/id_posiciones/${id}`);

export const palcomostrarPorCategoriayidevento= async (id)=>
    await axios.get(`${ip}/api/palco/mostrar/por/category/${id}`);

export const palcomostrartablaCategory= async (id)=>
    await axios.get(`${ip}/api/palco/mostrar/tabla/category/${id}`);

export const palcoeditarbasededatos= async (data)=>
    await axios.put(`${ip}/api/palco/editar`,data);


export const palcoinfomostrargeneral= async (id)=>
    await axios.get(`${ip}/api/palco/mostrar/info/general/${id}`);

export const palcoprecio= async (id)=>
    await axios.get(`${ip}/api/palco/precio/${id}`);

export const palcomostrarcliente= async (id)=>
    await axios.get(`${ip}/api/palco/mostrar/cliente/${id}`);


export const palcoeditarocupadoTask= async (data)=>
    await axios.post(`${ip}/api/palco/editar/ocupado`,data);
