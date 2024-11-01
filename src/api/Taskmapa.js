import axios  from "axios";
import {ip} from './Task';


export const categoydemapamostrarporid= async (id)=>
    await axios.get(`${ip}/api/category/mostrar/porusuario/${id}`);