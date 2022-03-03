import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import * as Styled from './styled';
import profileImg from '../../public/images/seller-productIMG.png';

interface ProfileCheck {
  profile?: number;
  flex: number;
  isText?: boolean;
  isAlign?: boolean;
}

const CommentTr = styled.tr`
  display: flex;
  background-color: white;
  align-items: center;
`;

const CommentTd = styled.td<ProfileCheck>`
  flex: 1 1 ${(props) => props.flex}%;
  border-top: ${(props) => (props.isText ? '1px solid #ccc' : null)};
  font-size: 1.8rem;
  padding: 20px 0px;
  text-align: ${(props) => (props.isAlign ? 'center' : null)};
  & strong {
    font-size: 1.4rem;
    margin-right: 1rem;
    color: #666;
  }
  & em {
    font-size: 1.2rem;
    color: #666;
  }
  & p {
    margin-top: 10px;
  }
`;

function QuestionTr() {
  const [showComment, setShowComment] = useState(false);

  const answer = () => {
    setShowComment(!showComment);
  };

  return (
    <>
      <Styled.Tr onClick={answer} className="test">
        <Styled.Bodytd profile={1} flex={30}>
          <Image src={profileImg} width={120} height={120} />
          <Styled.ProductText>
            <h4>
              안녕 상품정보를 너무 많이 넣으면 코로나 걸려버려 그러고 열 40도
              즉사 ㅂㅇ 그리고 여긴 상품 타이틀이야 길게 적을 필요없어
            </h4>
            <p>안녕</p>
          </Styled.ProductText>
        </Styled.Bodytd>
        <Styled.Bodytd flex={10}>jma1020</Styled.Bodytd>
        <Styled.Bodytd flex={40}>
          대충문의 호로록 대충문의 대충문의 호로록 대충문의 대충문의 호로록
          대충문의 대충문의 호로록 대충문의 대충문의 호로록 대충문의
        </Styled.Bodytd>
        <Styled.Bodytd flex={10}>답변완료</Styled.Bodytd>
        <Styled.Bodytd flex={10}>버튼 </Styled.Bodytd>
      </Styled.Tr>

      {showComment ? (
        <CommentTr>
          <CommentTd flex={30}> </CommentTd>
          <CommentTd flex={60} isText>
            <strong>박아무개</strong>
            <em>2022.02.15</em>
            <p>
              저는 정민입니다 대충 문의 답변 드릴게요?? 그냥 써주세요. 저는
              정민입니다 대충 문의 답변 드릴게요?? 그냥 써주세요. 저는
              정민입니다 대충 문의 답변 드릴게요?? 그냥 써주세요. 저는
              정민입니다 대충 문의 답변 드릴게요?? 그냥 써주세요
            </p>
          </CommentTd>
          <CommentTd flex={10} isAlign>
            삭제
          </CommentTd>
        </CommentTr>
      ) : null}
    </>
  );
}

export default QuestionTr;
