import axios  from "axios";
import {ip} from './Task';


export const bloqueoinsertar= async (data)=>
    await axios.post(`${ip}/api/bloqueo/insertar`,data);




