import axios  from "axios";
import {ip} from './Task';

export const pagostarjeta= async (data)=>
    await axios.post(`${ip}/create-transaction`,data);


