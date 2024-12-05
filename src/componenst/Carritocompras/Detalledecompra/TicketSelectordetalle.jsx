import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palcoprecio } from '../../../api/Taskpalco';
import { useSelectedIdStore, useStore, useStoreEncryp } from '../../../useUserStore';
import { useNavigate,useLocation } from 'react-router-dom';
import { usuariobloqueadoactualizarbloqueo, usuariobloqueadoMostrarminutos, usuariobloqueadosinsertar, usuariovalidaridsiexiste } from '../../../api/Taskusuario';
import { detalleinsertar } from '../../../api/Taskdetalle';
import { createCartAnimation } from './createCartAnimation';
import { createBlockedAnimation } from './createBlockedAnimation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px;
  background: #2d2f3a;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
    width: 90%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #3b3d4a;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    font-size: 16px;
  }
`;

const SectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color || 'transparent'};
  border-radius: 50%;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 10px;
    width: 100%;
    justify-content: space-between;
  }
`;

const TicketIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: #d3d3d3;
  margin-right: 10px;
`;

const TicketSVG = () => (
  <TicketIcon viewBox="0 0 24 24">
    <path d="M6 2c0 .6-.4 1-1 1-.8 0-1.5.7-1.5 1.5S4.2 6 5 6c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1-.8 0-1.5.7-1.5 1.5S4.2 21 5 21c.6 0 1 .4 1 1h12c0-.6.4-1 1-1 .8 0 1.5-.7 1.5-1.5S19.8 18 19 18c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1 .8 0 1.5-.7 1.5-1.5S19.8 3 19 3c-.6 0-1-.4-1-1H6z" />
  </TicketIcon>
);

const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #ffd700;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    margin-top: 10px;
    gap: 5px; /* Reduce el espacio entre los elementos en pantallas móviles */
  }
`;

const QuantityButton = styled.button`
  background: #ff4b4b;
  border: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background 0.2s ease;

  &:hover {
    background: #e63939;
  }

  &:active {
    background: #cc3333;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
  font-size: 16px;
  border: none;
  color: #ffffff;
  background: #333;
  border-radius: 5px;
  padding: 5px;
  outline: none;
`;

const TicketStyleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #3b3d4a;
  color: #ffffff;
  border-radius: 10px;
  margin-top: 10px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 10px;
  }
`;
const NameContainer = styled.div`
  /* Estilo normal */
  display: flex;
  
  @media (max-width: 768px) {
    /* Cuando esté en dispositivos móviles */
    justify-content: center;
    width: 100%; /* Asegura que ocupe todo el ancho para centrado */
    text-align: center;
  }
`;
const Button = styled.button`
 background: linear-gradient(45deg, #ff4b4b, #ff6b6b);
 color: white;
 padding: 12px 25px;
 border: none;
 border-radius: 10px;
 font-weight: bold;
 font-size: 16px;
 cursor: pointer;
 width: 100%;
 position: relative;
 overflow: hidden;
 transition: all 0.3s ease;
 
 &:disabled {
   opacity: 0.7;
   cursor: not-allowed;
 }

 &::before {
   content: '';
   position: absolute;
   top: 0;
   left: -100%;
   width: 100%;
   height: 100%;
   background: linear-gradient(
     120deg,
     transparent,
     rgba(255, 255, 255, 0.3),
     transparent
   );
   animation: shine 1.5s infinite linear;
 }

 &:hover:not(:disabled) {
   transform: translateY(-2px);
   box-shadow: 0 7px 14px rgba(255, 75, 75, 0.3);
 }

 &:active:not(:disabled) {
   transform: translateY(1px);
 }

 @keyframes shine {
   100% {
     left: 200%;
   }
 }

 @media (min-width: 768px) {
   width: auto;
   min-width: 200px;
 }
`;

const TicketSelector = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { fetchCount } = useStore();  
  const [data, setData] = useState(null);
  const location = useLocation();
  const selectedId = useSelectedIdStore((state) => state.selectedId);
  const setSelectedId = useSelectedIdStore((state) => state.setSelectedId);
  const encryptedId = useStoreEncryp((state) => state.encryptedId);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!selectedId) return;

    const fetchData = async () => {
      try {
        const response = await palcoprecio(selectedId);
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [selectedId]);

  const maxQuantity = data ? data.cantidad : 0;
  const formattedPrice = data ? `COP ${new Intl.NumberFormat('es-CO').format(data.precio * quantity)}` : '0.00';

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };
  useEffect(() => {
    const resetSelectedId = () => {
      setSelectedId(0);
      setData(null);
      setQuantity(1);
    };

    // Reset on mount
    resetSelectedId();

    // Reset on location change (navigation)
    const handleNavigation = () => {
      resetSelectedId();
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleNavigation);
    
    // Reset on component unmount
    return () => {
      resetSelectedId();
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [location.pathname, setSelectedId]);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  
  const Confirmar = async (event) => {
    event.preventDefault();
    
    if (isLoading) return; // Previene múltiples clics
    setIsLoading(true);
  
    try {
      if (selectedId && encryptedId) {
        const info = { id: encryptedId };
        const response = await usuariovalidaridsiexiste(info);
        
        if (response.data.message === "correctamente") {
          const respondata = await usuariobloqueadoactualizarbloqueo({id: encryptedId});
          const respon = await usuariobloqueadosinsertar({id: encryptedId});
          
          if (respon.data.message === 'correctamente') {
            await insertar(event);
          }
        }
      } else {
        setSelectedId(0);
        window.scrollTo(0, 0);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setData(null);
    setQuantity(1);
  };


const insertar = async (event)=>{
  try {
    const info  ={
      id_palco:selectedId,
      id_usuario:encryptedId,
      cant:quantity
    }
    const respon=await usuariobloqueadoactualizarbloqueo({id:encryptedId});
    if (respon.data.message==='correctamente') {
    const response =await usuariobloqueadoMostrarminutos({id:encryptedId});
    const data =response.data.message.estado;
    if (data ==='BLOQUEADO') {
      createBlockedAnimation(event,response.data.message.Faltante);
    }else{
      const response= await detalleinsertar(info);
      if (response.data.message !=='INGRESADO') {
        createCartAnimation(event);   
        resetForm();
        await fetchCount(encryptedId);
      }
    }
    }
  
  } catch (error) {
console.log(error);
  }
}
  return (
    <Container>
      <Header>
        <SectionInfo>
          <Dot color={data ? data.color : 'transparent'} />
          <div>{data ? data.categoria : ""}</div>
        </SectionInfo>
        <NameContainer>{data ? data.nombre : ""}{data ? data.Xpersona : ""}</NameContainer>
        <PriceContainer>
          <QuantityControl>
            <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
            <QuantityInput type="text" value={quantity} readOnly />
            <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
          </QuantityControl>
          <Price>{formattedPrice}</Price>
        </PriceContainer>
      </Header>
      <TicketStyleContainer>
        <div style={{marginBottom:'10px'}}>
          <TicketSVG /> {/* Icono del ticket */}
          Ubicaciones agregadas a la cesta
        </div>
        <Button
  onClick={(e) => Confirmar(e)}
  disabled={isLoading}
>
  {isLoading ? (
    <span>Procesando...</span>
  ) : (
    <span>AÑADIR A LA CESTA</span>
  )}
</Button>
      </TicketStyleContainer>
    </Container>
  );
};

export default TicketSelector;
