import styled from "styled-components"
import { Swiper } from "swiper/react"

export const SwiperStyled = styled(Swiper)`
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
    padding: 40px;
    background: #FFFFFF;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
`

export const ContentImg = styled.img`
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 2;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards;

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const ContentTxt = styled.h2`
    margin-top: 30px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: #2C3E50;
    line-height: 1.6;
    z-index: 2;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards 0.2s;

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const ContentSubtitle = styled.p`
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: normal;
    color: #34495E;
    line-height: 1.5;
    z-index: 2;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards 0.3s;
`

export const SwiperContainer = styled.div`
    background-color: #FFFFFF;
    border-radius: 20px;
    overflow: hidden;
    padding-right: 20px;
`

