import axios  from "axios";
import {ip} from './Task';

export const empresariovalidarLogin= async (user,pass)=>
    await axios.get(`${ip}/api/empresario/inicio/login/${user}/${pass}`);
