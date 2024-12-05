import { useState } from "react";
import { usuariomostrarporid } from "../../../api/Taskusuario";
import { pagostarjeta } from "../../../api/TaskWompi";
import {detalleconfirmarpedido} from '../../../api/Taskdetalle';


const fetdata=async(id_)=>{
  try {
    const response =await usuariomostrarporid({id:id_});
    return response.data;
  } catch (error) {
    
  }
}
const detalleconfirmado=async(id_usuario)=>{
  try {
    const response = await detalleconfirmarpedido({id:id_usuario});
    return response.data.message;
  } catch (error) {
    
  }
}


export const handleTokenizeCard = async (formData, setError, setLoading,id) => {
    try {
      setError('');
      setLoading(true);
      const { cardNumber, cvc, expiryDate, firstName, lastName } = formData;
      const respon = await fetdata(id);

      // Validar y formatear número de tarjeta
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cleanCardNumber)) {
        throw new Error('El número de tarjeta debe tener 16 dígitos');
      }
      
      // Validar y formatear fecha de expiración
      const [month, year] = expiryDate.split('/');
      if (!month || !year) {
        throw new Error('Fecha de expiración inválida');
      }

      const monthNum = month.padStart(2, '0');
      const yearNum = parseInt(year);
      const fullYear = 2000 + yearNum;
      
      // Validar mes
      if (parseInt(monthNum) < 1 || parseInt(monthNum) > 12) {
        throw new Error('El mes debe estar entre 01 y 12');
      }

      // Validar año
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      
      if (fullYear < currentYear || (fullYear === currentYear && parseInt(monthNum) < currentMonth)) {
        throw new Error('La tarjeta ha expirado');
      }
      
      const requestData = {
        number: cleanCardNumber,
        cvc: cvc.toString(),
        exp_month: monthNum,
        exp_year: yearNum.toString(), // Wompi espera solo los últimos 2 dígitos del año
        card_holder: `${respon.data.nombre} ${respon.data.apellido}`.trim().toUpperCase()
      };
      const response = await fetch('https://production.wompi.co/v1/tokens/cards', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer pub_prod_FaLihNh1nEhHrIRMqz9yXz8zEzJDGITk',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.error && data.error.messages) {
          const errorMessages = Object.values(data.error.messages)
            .flat()
            .join('. ');
          throw new Error(errorMessages);
        }
        throw new Error(data.error?.reason || 'Error al procesar la tarjeta');
      }
        const respo = await pagostarjeta({cardToken:data.data.id,id_usuario:id,correo:respon.data.correo});
        const datainfo =respo.data;
        if (datainfo.message==='Correcto') {
          if (datainfo.transactionStatus.status==='APPROVED') {
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }

    //  return true;
    } catch (error) {
      console.log(error);
      return false;
      setError('Lo sentimos, no pudimos procesar tu pago en este momento.');
    } finally {
      setLoading(false);
    }
  };