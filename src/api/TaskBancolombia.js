import axios  from "axios";
import {ip} from './Task';



export const createTransacionBancolombia= async (data)=>
    await axios.post(`${ip}/api/bancolombia`,data);
