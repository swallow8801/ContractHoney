import styled from "styled-components"
import { Swiper} from "swiper/react";

export const SwiperStyled = styled(Swiper)`
  .swiper-pagination {
    bottom: 30px;
  }

  .swiper-pagination-bullet {
    background: gray;
    opacity: 0.6;
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
    height: calc(100vh - 90px);
    padding: 20px;
    background: #DDD;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
`

export const ContentImg =  styled.img`
    width: 80%;
    border-radius: 10px;
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

export const ContentTxt = styled.h1`
    margin-top: 50px;
    text-align: start;
    font-size: 28px;
    font-weight: bold;
    color: #151515;
    line-height: 1.7;
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