import axios  from "axios";
export const ip=
//"http://192.168.1.104:3001";
"https://boleta.vercel.app";

export const Insertarsvg= async (data)=>
    await axios.post(`${ip}/api/archivos`,data);