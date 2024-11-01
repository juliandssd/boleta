import React from 'react';
import styled from 'styled-components';

// Contenedor principal para la tabla
const TableContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #2c3e50;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  margin-top: 20px;
  overflow-x: auto; /* Para que se pueda hacer scroll horizontal en pantallas pequeñas */
`;

// Estilo para la tabla
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden; /* Redondea las esquinas */
`;

// Estilo para las celdas del encabezado
const Th = styled.th`
  padding: 12px;
  background-color: #34495e;
  color: white;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
`;

// Estilo para las celdas del cuerpo de la tabla
const Td = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: #2c3e50;
  font-size: 14px;
`;

// Fila alternada para el cuerpo de la tabla
const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #dfe6e9;
    cursor: pointer;
  }
`;

// Título estilizado para la lista
const Title = styled.h1`
  font-size: 24px;
  color: white;
  text-align: center;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TablaLista = ({ data }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Categoría</Th>
            <Th>Cantidad</Th>
            <Th>Plan Separe</Th>
            <Th>Mínimo</Th>
            <Th>Nombre</Th>
            <Th>Precio</Th>
            <Th>Total</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.categoria}</Td>
              <Td>{item.cantidad}</Td>
              <Td>{item.plansepare}</Td>
              <Td>{item.minimo}</Td>
              <Td>{item.nombre}</Td>
              <Td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.precio)}</Td>
              <Td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.Total)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

// Datos de ejemplo para la tabla (similares a los que enviaste)
const data = [
  { categoria: 'General Derecha', cantidad: 200, plansepare: 'no', minimo: 0, nombre: 'General derecha', precio: 190000, Total: 38000000 },
  { categoria: 'Vip Silla', cantidad: 100, plansepare: 'no', minimo: 0, nombre: 'Vip Sillas', precio: 100000, Total: 10000000 },
  { categoria: 'Referencia', cantidad: 3000, plansepare: 'no', minimo: 0, nombre: 'Referencia', precio: 35000, Total: 105000000 },
  { categoria: 'general', cantidad: 50, plansepare: 'no', minimo: 0, nombre: 'Vip Sillas', precio: 20000, Total: 1000000 },
  { categoria: 'preferencia', cantidad: 300, plansepare: 'no', minimo: 0, nombre: 'Referencia', precio: 90000, Total: 27000000 },
  { categoria: 'general', cantidad: 8000, plansepare: 'no', minimo: 0, nombre: 'General Izquierda', precio: 5000, Total: 40000000 },
];

// Renderizar la tabla con los datos
const App = () => (
  <div>
    <Title>Lista de Palcos</Title>
    <TablaLista data={data} />
  </div>
);

export default App;
