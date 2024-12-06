import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const gradientFloat = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const FooterWrapper = styled.footer`
  background: transparent;
  position: relative;
  padding: 4rem 6rem 2rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
    backdrop-filter: blur(20px);
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem 1.5rem;
  }
`;

const HoverGlow = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 0;
  opacity: 0;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

const MainContent = styled.div`
  display: flex;
  gap: 8rem;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  max-width: 400px;

  @media (max-width: 1024px) {
    max-width: 100%;
    text-align: center;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2.5rem;
  position: relative;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(120deg, #fff, #aaa);
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #fff, transparent);
    animation: ${shimmer} 3s infinite linear;
  }
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const CompanyInfo = styled.div`
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    line-height: 2;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    transition: all 0.3s ease;
    cursor: default;

    &:hover {
      color: #fff;
      transform: translateX(10px);
    }
  }
`;

const AppStoreButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const StoreButton = styled.a`
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.2);
  }

  img {
    height: 32px;
    filter: brightness(1.2);
  }
`;

const RightSection = styled.div`
  flex: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -4rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }

  @media (max-width: 1024px) {
    width: 100%;
    &::before {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const LinkGroup = styled.div`
  position: relative;

  h4 {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 2rem;
    position: relative;
    display: inline-block;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #fff, transparent);
      animation: ${gradientFloat} 3s infinite;
      background-size: 200% 100%;
    }
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin: 0.75rem 0;
  position: relative;

  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    padding: 0.5rem 0;
    display: inline-block;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 1px;
      background: #fff;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #fff;
      transform: translateX(10px);
      
      &::before {
        width: 100%;
      }
    }
  }
`;

const BottomBar = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const VersionBadge = styled.span`
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transform: translateY(-2px);
  }
`;

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const glow = document.querySelector('.hover-glow');
    if (glow) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 100;
      const y = e.clientY - rect.top - 100;
      setMousePosition({ x, y });
      glow.style.opacity = '1';
      glow.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseLeave = () => {
    const glow = document.querySelector('.hover-glow');
    if (glow) {
      glow.style.opacity = '0';
    }
  };

  return (
    <FooterWrapper>
      <Container onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} >
        <HoverGlow  className="hover-glow" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }} />
        
        <MainContent>
          <LeftSection>            
            <InfoCard>
              <CompanyInfo>
                <p>EventosLive</p>
                <p>Nit 1007.676.147-1</p>
                <p>Call Center: (60-1) 593-6300</p>
              </CompanyInfo>

              <AppStoreButtons>
                <StoreButton href="#" aria-label="Download on App Store">
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="App Store" 
                  />
                </StoreButton>
                <StoreButton href="#" aria-label="Get it on Google Play">
                  <img 
                    src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" 
                    alt="Google Play" 
                  />
                </StoreButton>
              </AppStoreButtons>
            </InfoCard>
          </LeftSection>

          <RightSection>
            <LinkGroup>
              <h4>Categorías</h4>
              <LinkList>
                <LinkItem><a href="#">Conciertos</a></LinkItem>
                <LinkItem><a href="#">Teatro</a></LinkItem>
                <LinkItem><a href="#">Deportes</a></LinkItem>
                <LinkItem><a href="#">Festivales</a></LinkItem>
                <LinkItem><a href="#">Foros</a></LinkItem>
                <LinkItem><a href="#">Experiencias</a></LinkItem>
              </LinkList>
            </LinkGroup>

            <LinkGroup>
              <h4>Ayuda</h4>
              <LinkList>
                <LinkItem><a href="#">Contáctanos - PQRS</a></LinkItem>
                <LinkItem><a href="#">TiketApp</a></LinkItem>
                <LinkItem><a href="#">Puntos de venta</a></LinkItem>
              </LinkList>
            </LinkGroup>

            <LinkGroup>
              <h4>Legal</h4>
              <LinkList>
                <LinkItem><a href="#">Política de privacidad</a></LinkItem>
                <LinkItem><a href="#">Términos de uso</a></LinkItem>
                <LinkItem><a href="#">SAGRILAFT y PTEE</a></LinkItem>
              </LinkList>
            </LinkGroup>
          </RightSection>
        </MainContent>

        <BottomBar>
          <Copyright>
            © 2023 Tiketplus. Reservados todos los derechos.
          </Copyright>
          <VersionBadge>
            Versión 7.23.01.A317
          </VersionBadge>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;