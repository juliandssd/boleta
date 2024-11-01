import axios  from "axios";
export const ip=
//"http://192.168.1.104:3000";
"https://boleta-juliandssds-projects.vercel.app";
export const Insertarsvg= async (data)=>
    await axios.post(`${ip}/api/archivos`,data);
