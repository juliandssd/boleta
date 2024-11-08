import axios  from "axios";
import {ip} from './Task';


export const categoydemapamostrarporid= async (id,category)=>
    await axios.get(`${ip}/api/category/mostrar/porusuario/${id}/${category}`);