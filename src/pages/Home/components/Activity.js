import styled from "styled-components";
import React from "react";
import { ReactComponent as ArrowBtn } from "@/assets/icons/arrow_forward_black_24dp 1.svg";
import { media } from "@/components/styleMediaQuery";
import { useNavigate } from "react-router";

const ActivityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding: 72px 12px 96px 12px;
  background: linear-gradient(
    108.02deg,
    rgba(183, 225, 207, 0.2) 37.72%,
    rgba(129, 176, 225, 0.2) 90.39%
  );
  ${media.md`
    padding: 72px 36px 96px 36px;
    gap: 80px;
  `}
  ${media.lg`
    padding: 120px 0px;
    gap: 80px;
  `}
`;
const CardWrapper = styled.div`
  width: 100%;
  height: 80vh;
  border-radius: 20px;
  background: url(${(props) => props.imgUrl});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: end;
  ${media.lg`
    width:60vmax;
    height: 55vh;
    flex-direction:row;
    &:nth-child(odd) {
    margin-right: 15%;
  }
  
  &:nth-child(even) {
    margin-left: 15%;
    justify-content: flex-end;
  }
  `}
  ${media.xl`
    width:55vmax;
    height: 55vh;
    flex-direction:row;
  `}
`;
const CardContent = styled.div`
  background: rgba(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 20px;
  border-radius: 0px 0px 20px 20px;
  border: 1px solid #d9d9d9;

  ${media.lg`
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(2px);
    padding: 60px;
    border-radius: 0px 20px 20px 0px;
  `}
  div:nth-child(1) {
    color: #00a886;
    font-weight: bolder;
  }
  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const NavBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  max-width: 200px;
  font-size: 16px;
  max-width: 100%;
  svg path {
    fill: white;
  }
  ${media.xxl`
    max-width: 70%;
  `}
`;

const MoreBtn = styled.button`
  width:100%;
  ${media.lg`
    width: auto;
  `}
`;

function Activity(props) {
  const navigate = useNavigate();
  const {dataArr} = props;

  function handleNavToActivity(){
    navigate("/activity");
  }

  return (
    <ActivityWrapper>
      {dataArr.length >= 4 &&
        dataArr.slice(-4).map((item) => {
          const { _id, title, content, img } = item;
          return (
            <CardWrapper key={_id} imgUrl={img}>
              <CardContent>
                <div className="fs-6">{title}</div>
                <h3>{content}</h3>
                <NavBtn
                  type="button "
                  className="btn btn-customBtn1"
                  onClick={handleNavToActivity}
                >
                  <span>詳細內容</span> <ArrowBtn />
                </NavBtn>
              </CardContent>
            </CardWrapper>
          );
        })}
      <MoreBtn
        onClick={handleNavToActivity}
        type="button"
        className="btn btn-outline-customBtn1"
      >
        查看更多
      </MoreBtn>
    </ActivityWrapper>
  );
}
export default Activity;