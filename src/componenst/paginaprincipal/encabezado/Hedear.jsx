import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useStore, useStoreEncryp } from '../../../useUserStore';
import { detalleeliminardefult, detalletotalapagar } from '../../../api/Taskdetalle';
import ConfirmModal from '../../Messagedeconfirmacion/ConfirmModal';
import { enviocorreo } from '../../../api/Taskenviocorreo';

// Animations
const slideInTop = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Styled Components
const HeaderContainer = styled.header`
  background: ${({ $scrolled }) => 
    $scrolled 
      ? 'rgba(17, 25, 40, 0.95)' 
      : 'rgba(17, 25, 40, 0.75)'
  };
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: ${({ $scrolled }) => ($scrolled ? '0.75rem 4rem' : '1rem 4rem')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideInTop} 0.6s ease-out;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: ${({ $scrolled }) => ($scrolled ? '0.75rem 1.5rem' : '1rem 1.5rem')};
  }
`;

const LogoContainer = styled.div`
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #e63946, #ff758c);
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const Logo = styled.img`
  height: ${({ $scrolled }) => ($scrolled ? '38px' : '45px')};
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #e63946, #ff758c);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #ff758c;
    
    &:before {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const CartContainer = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #e63946, #ff758c);
  color: white;
  font-size: 11px;
  font-weight: 600;
  height: 20px;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0 6px;
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
  animation: ${pulse} 1s ease infinite;
`;

const AuthButton = styled.button`
  background: linear-gradient(135deg, #e63946, #ff758c);
  color: white;
  padding: 0.85rem 1.75rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(230, 57, 70, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: ${shimmer} 1.5s infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(230, 57, 70, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MobileControls = styled.div`
  display: none;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 20px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: white;
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:nth-child(1) {
      top: ${({ $isOpen }) => ($isOpen ? '9px' : '0px')};
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      top: 9px;
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
      transform: translateX(${({ $isOpen }) => ($isOpen ? '-100%' : '0')});
    }

    &:nth-child(3) {
      top: ${({ $isOpen }) => ($isOpen ? '9px' : '18px')};
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, 
    rgba(17, 25, 40, 0.97),
    rgba(17, 25, 40, 0.95)
  );
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  padding: 2rem;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 998;

  ${NavLink} {
    font-size: 1.5rem;
    transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '20px')});
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: ${({ $index }) => `${$index * 0.1}s`};
  }

  ${AuthButton} {
    margin-top: 1rem;
    transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '20px')});
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0.3s;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const encryptedId = useStoreEncryp((state) => state.encryptedId);
  const setEncryptedId = useStoreEncryp((state) => state.setEncryptedId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { count, setCount } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (encryptedId) {
      fetchCount();
    }
  }, [encryptedId]);

  const handleLoginClick = () => {
    if (encryptedId) {
      setIsModalOpen(true);
    } else {
      window.scrollTo(0, 0);
      navigate('/login');
    }
  };

  const handleConfirm = async () => {
    setEncryptedId('');
    setCount(0); 
    navigate('/', { replace: true });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchCount = async () => {
    try {
      const info = { id: encryptedId };
      const respo = detalleeliminardefult(info);
      const response = await detalletotalapagar(info);
      setCount(response.data.count);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const handleCartClick = () => {
    if (location.pathname !== '/detalle/pago' && encryptedId) {
      window.scrollTo(0, 0);
      navigate('/detalle/pago');
    }
  };
const bntensallar=async ()=>{
  const info ={
    nombre:'julian',
    email:'crowloquendo@gmail.com'

  }
const response = await enviocorreo(info);
console.log(response.data);
}
  return (
    <HeaderContainer $scrolled={scrolled}>
      <LogoContainer onClick={() => navigate('/', { replace: true })}>
        <Logo
          $scrolled={scrolled}
          src="https://i.ibb.co/sVngX3v/logo-de-eventos.png"
          alt="Logo"
        />
      </LogoContainer>

      <Nav>
        <NavLink onClick={bntensallar}>Eventos</NavLink>
        <NavLink href="#">Contáctanos</NavLink>
        <NavLink onClick={() => navigate('/register')}>Registrarse</NavLink>
        {count > 0 && (
          <CartContainer onClick={handleCartClick}>
            <FaShoppingCart size={22} />
            <CartBadge>{count}</CartBadge>
          </CartContainer>
        )}
        <AuthButton onClick={handleLoginClick}>
          <FaUserCircle size={18} />
          {encryptedId ? 'Cerrar sesión' : 'Iniciar sesión'}
        </AuthButton>
      </Nav>

      <MobileControls>
        {count > 0 && (
          <CartContainer onClick={handleCartClick}>
            <FaShoppingCart size={22} />
            <CartBadge>{count}</CartBadge>
          </CartContainer>
        )}
        <MenuButton onClick={toggleMenu}>
          <MenuIcon $isOpen={isMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </MenuIcon>
        </MenuButton>
      </MobileControls>

      <MobileMenu $isOpen={isMenuOpen}>
        <NavLink href="#" onClick={toggleMenu}>Eventos</NavLink>
        <NavLink href="#" onClick={toggleMenu}>Contáctanos</NavLink>
        <NavLink onClick={() => {navigate('/register'); 
          toggleMenu(); 
        }}>
          Registrarse
        </NavLink>
        <AuthButton onClick={() => { 
          handleLoginClick(); 
          toggleMenu(); 
        }}>
          <FaUserCircle size={18} />
          {encryptedId ? 'Cerrar sesión' : 'Iniciar sesión'}
        </AuthButton>
      </MobileMenu>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="¿Cerrar sesión?"
        successMessage="Cerrando sesión.."
        message="¿Estás seguro de que quieres cerrar sesión? Tendrás que iniciar sesión de nuevo para continuar."
      />
    </HeaderContainer>
  );
};

export default Header;