import axios  from "axios";
import {ip} from './Task';


export const bancodisponible= async ()=>
    await axios.get(`${ip}/financialinstitutions`);

export const createtransaction= async (data)=>
    await axios.post(`${ip}/createtransaction`,data);

