import axios  from "axios";
import {ip} from './Task';

export const enviocorreo= async (data)=>
    await axios.post(`${ip}/api/enviar/correo`,data);