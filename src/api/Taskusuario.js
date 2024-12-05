import axios  from "axios";
import {ip} from './Task';

export const usuariovalidar= async (data)=>
    await axios.post(`${ip}/api/usuario/validar`,data);


export const usuariovalidaridsiexiste= async (data)=>
    await axios.post(`${ip}/api/usuario/validar/id`,data);

export const usuariobloqueadosinsertar= async (data)=>
    await axios.post(`${ip}/api/usuariobloqueado/insertar`,data);

export const usuariobloqueadoMostrarminutos= async (data)=>
    await axios.post(`${ip}/api/usuariobloqueado/mostrar/minutos`,data);

export const usuariobloqueadoactualizarbloqueo= async (data)=>
    await axios.post(`${ip}/api/usuariobloqueado/actualizar`,data);

export const usuarioinsertar= async (data)=>
    await axios.post(`${ip}/api/usuario/insertar`,data);

export const usuarioverificarcodigo= async (data)=>
    await axios.post(`${ip}/api/usuario/verificar/codigo`,data);


export const usuarioverificar= async (data)=>
    await axios.post(`${ip}/api/usuario/verificar`,data);


export const usuariomostrarporid= async (data)=>
    await axios.post(`${ip}/api/usuario/mostrar/usuario/por/id`,data);

export const usuariobloqueadoBloquear= async (data)=>
    await axios.post(`${ip}/api/usuariobloqueado/bloquear`,data);









