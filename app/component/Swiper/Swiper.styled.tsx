import styled from "styled-components"
import { Swiper } from "swiper/react"

export const SwiperStyled = styled(Swiper)`
  width: 100%;
  height: 100%;
  .swiper-pagination {
    bottom: 20px;
  }

  .swiper-pagination-bullet {
    background: #CBD5E0;
    opacity: 0.6;
    width: 10px;
    height: 10px;
  }

  .swiper-pagination-bullet-active {
    background: #F2B024;
    opacity: 1;
    transform: scale(1.2);
  }
`

export const Group = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 40px 20px;
  background: #FFFFFF;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
`

export const ContentImg = styled.img`
  width: 80%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;

  @media (max-width: 768px) {
    max-width: 300px;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const ContentTxt = styled.h2`
  margin-top: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #2C3E50;
  line-height: 1.4;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards 0.2s;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

export const ContentSubtitle = styled.p`
  margin-top: 5px;
  text-align: center;
  font-size: 18px;
  font-weight: normal;
  color: #34495E;
  line-height: 1.4;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards 0.3s;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

export const SwiperContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  height: 80vh;
  margin: 0 auto;

  @media (max-width: 768px) {
    height: 80vh;
  }

  @media (max-width: 480px) {
    height: 90vh;
  }
`

export const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`

