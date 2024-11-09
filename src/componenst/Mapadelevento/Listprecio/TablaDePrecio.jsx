import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palcoinfomostrargeneral } from '../../../api/Taskpalco';
import { useConciertoStore } from '../../../useUserStore';

// Styled components
const TableContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #1e272e;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  color: #ecf0f1;
`;

const TableTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #00a8ff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #00a8ff;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #2f3640;
  }

  &:hover {
    background-color: #353b48;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  color: #dcdde1;
  border-bottom: 1px solid #353b48;
  font-size: 0.9rem;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color || '#dcdde1'};
  border-radius: 4px;
  margin: 0 auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
`;

// Componente principal
const TablaDePrecio = () => {
  const [items, setItems] = useState([]);
  const { conciertoId } = useConciertoStore();
  // Función para obtener los datos de la API
  const infogeneral = async () => {
    try {
      const response = await palcoinfomostrargeneral(conciertoId);
      console.log(response.data); // Muestra los datos en la consola para verificar
      setItems(response.data); // Guarda los datos en el estado
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  useEffect(() => {
    infogeneral(); // Llama a la función al montar el componente
  }, []);

  return (
    <TableContainer>
      <TableTitle>Tabla de Precio</TableTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Color</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Categoría</TableHeader>
            <TableHeader>Cantidad</TableHeader>
            <TableHeader>Ocupado</TableHeader>
            <TableHeader>Plan Separe</TableHeader>
            <TableHeader>Mínimo</TableHeader>
            <TableHeader>Precio</TableHeader>
            <TableHeader>Total</TableHeader>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell><ColorBox color={item.color} /></TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.categoria}</TableCell>
              <TableCell>{item.cantidad}</TableCell>
              <TableCell>{item.cantidadocupado}</TableCell>
              <TableCell>{item.plansepare}</TableCell>
              <TableCell>${item.minimo.toLocaleString()}</TableCell>
              <TableCell>${item.precio.toLocaleString()}</TableCell>
              <TableCell>${item.Total.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TablaDePrecio;
