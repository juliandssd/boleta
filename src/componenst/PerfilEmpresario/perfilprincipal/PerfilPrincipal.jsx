import React,{useState} from 'react';
import styled from 'styled-components';
import CreateEvent from './createevent';
import {useUserStore}  from '../../../useUserStore';
import CategoryList from './imgverticalmente'; // Importa el nuevo componente
import ModernEventComponent from '../InfoPersonalArtitas/CabezeradelArtista';


const PerfilContainer = styled.div`
  display: flex;
  gap: 20px;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  color: white;
  width: 100%;
  box-sizing: border-box; /* Asegura que el padding se incluya en el ancho total */
  align-items: flex-start; /* Alinea el contenido en la parte superior */
`;
const Sidebar = styled.div`
  width: 200px; /* Ancho fijo para el sidebar */
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  align-items: flex-start; /* Asegura que el contenido del sidebar se alinee en la parte superior */
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Mantén esto para que los elementos se ubiquen en la parte superior */
  width: 100%;
  margin: 0;
  padding: 0;
`;
const AgregarGrupoButton = styled.button`
  background-color: #4b4b4b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Reducir el tamaño del texto */
  margin-bottom: 10px;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #676767;
  }
`;
const SearchBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px; /* Reducir el espacio inferior */
`;

const SearchInput = styled.input`
  width: 85%;
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  padding: 5px;

  &::placeholder {
    color: #aaa;
  }
`;
const ContentArea = styled.div`
  flex: 1; /* Toma todo el espacio restante */
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const SearchIcon = styled.span`
  color: white;
  font-size: 16px;
  cursor: pointer;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow-x: hidden;
`;
const ModalContent = styled.div`
  background-color: #2c3e50;
  padding: 20px;
  border-radius: 8px;
  max-width: ${(props) => props.maxWidth || '300px'};
  width: 100%;
  max-height: ${(props) => props.maxHeight || '200px'};
  overflow-y: auto; 
  overflow-x: hidden;
  position: relative;
  z-index: 1000;
`;
// Otros estilos...

const PerfilEmpresario = () => {
  const [createeventsModals,setcreateeventsModals]=useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const id_usuario =useUserStore((state) => state.userId);
const handleAgregar= ()=>{
  setcreateeventsModals(true);
}
const handleFalsee=()=>{
  setcreateeventsModals(false);
}
const handleAddEvent = (newEvent) => {
  setEvents((prevEvents) => [...prevEvents, newEvent]); // Agrega el nuevo evento
};
const handleEventClick = (event) => {
  setSelectedEvent(event); // Establece el evento seleccionado
};
  return (
    <PageContainer>
    <PerfilContainer>
    <Sidebar>
      <AgregarGrupoButton onClick={handleAgregar}>+ Agregar Evento</AgregarGrupoButton>
      
      <SearchBar>
        <SearchInput type="text" placeholder="Buscar..." />
        <SearchIcon>🔍</SearchIcon>
      </SearchBar>
      <CategoryList id_imgusuario={id_usuario} events={events} setEvents={setEvents}    onEventClick={handleEventClick}/>
      {createeventsModals && (
        <ModalOverlay>
          <ModalContent style={{ maxHeight: '500px', maxWidth: '400px' }}>
            <CreateEvent onclose={handleFalsee} onAddEvent={handleAddEvent} id_usuariocreate={id_usuario}/>
          </ModalContent>
        </ModalOverlay>
      )}
      </Sidebar>
      <ContentArea>
        {selectedEvent ? (
          <ModernEventComponent event={selectedEvent} />
        ) : (
          <p>Selecciona un evento para verlo aquí.</p>
        )}
      </ContentArea>
    </PerfilContainer>
    </PageContainer>
  );
};

export default PerfilEmpresario;
