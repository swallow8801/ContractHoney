import React from "react";
import { SwiperSlide } from "swiper/react";
import { Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperStyled, Group, ContentTxt, ContentImg } from "./Swiper.styled";

const SwiperGroup = () => {
  return (
    <SwiperStyled
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      speed={1500}
      style={{width: "65%"}}
    >
      <SwiperSlide>
        <Group>
            <div style={{width: "70%", display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                <ContentImg src="/images/위법조항.png" alt="위법조항"  style={{width: "100%"}}/>
                <ContentTxt style={{marginTop: "10px", fontSize: "28px"}}>위법조항이란?</ContentTxt>
                <ContentTxt style={{marginTop: "5px", fontSize: "24px"}}>
                법률에 명백하게 위배된 조항을 말해요.
                </ContentTxt>
            </div>
            <div style={{margin: "40px"}}></div>
            <div style={{width: "70%", display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                <ContentImg src="/images/독소조항.png" alt="독소조항" style={{width: "100%"}}/>
                <ContentTxt style={{marginTop: "10px", fontSize: "28px"}}>독소조항이란?</ContentTxt>
                <ContentTxt style={{marginTop: "5px", fontSize: "24px", textAlign: "right"}}>
                위법이 아닌 경우라도 나중에 해석이나 상황에 따라 불리하게 작용할 가능성이 있는 조항을 말해요.
                </ContentTxt>
            </div>
        </Group>
      </SwiperSlide>
      <SwiperSlide>
        <Group>
            <ContentImg src="/images/결과창.png" alt="결과창"/>
            <ContentTxt>
            계약서 요약부터 위법조항, 독소조항까지 한 눈에<br />
            각 조항별로 계약서 요약과 조항들에 대해 볼 수 있어요.
            </ContentTxt>
        </Group>
      </SwiperSlide>
      <SwiperSlide>
        <Group>
            <ContentImg src="/images/버전비교.png" alt="버전비교"/>
            <ContentTxt>
            이전 버전들을 한 페이지에서 비교하여 달라진 내용을 확인할 수 있어요.
            </ContentTxt>
        </Group>
      </SwiperSlide>
    </SwiperStyled>
  );
};

export default SwiperGroup;
