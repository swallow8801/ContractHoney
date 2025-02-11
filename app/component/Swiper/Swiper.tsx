import { SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import {
  SwiperStyled,
  Group,
  ContentTxt,
  ContentImg,
  ContentSubtitle,
  SwiperContainer,
  SlideContent,
} from "./Swiper.styled"

const SwiperGroup = () => {
  return (
    <SwiperContainer>
      <SwiperStyled
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        speed={1500}
      >
        <SwiperSlide>
          <Group>
            <SlideContent>
              <ContentImg src="/images/위법조항.png" alt="위법조항" style={{height:"43%"}}/>
              <ContentTxt>위법조항</ContentTxt>
              <ContentSubtitle
              style={{marginBottom: "20px"}}>
                위법조항은 법률을 위반한 조항을 말해요</ContentSubtitle>
              <ContentImg src="/images/독소조항.png" alt="독소조항" style={{height:"36%"}}/>
              <ContentTxt>독소조항</ContentTxt>
              <ContentSubtitle>독소조항은 계약자에게 불리한 영향을 미치는 조항을 말해요.</ContentSubtitle>
            </SlideContent>
          </Group>
        </SwiperSlide>
        <SwiperSlide>
          <Group>
            <SlideContent>
              <ContentImg src="/images/결과창.png" alt="결과창" style={{height:"70%"}}/>
              <ContentTxt>한눈에 보는 계약서 분석</ContentTxt>
              <ContentSubtitle>
                계약서 요약부터 위법조항, 독소조항까지 각 조항별로 상세하게 분석해 드려요.
              </ContentSubtitle>
            </SlideContent>
          </Group>
        </SwiperSlide>
        <SwiperSlide>
          <Group>
            <SlideContent>
              <ContentImg src="/images/버전비교.png" alt="버전비교" />
              <ContentTxt>버전 비교 기능</ContentTxt>
              <ContentSubtitle>
                이전 버전들과 현재 버전을 한 페이지에서 비교하여 달라진 내용을 쉽게 확인할 수 있어요.
              </ContentSubtitle>
            </SlideContent>
          </Group>
        </SwiperSlide>
      </SwiperStyled>
    </SwiperContainer>
  )
}

export default SwiperGroup

