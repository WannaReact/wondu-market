import styled from 'styled-components';

interface FlexTh {
  flex: number;
}

interface ProfileCheck {
  profile?: number;
  flex: number;
}
export const TbodyTest = styled.tbody`
  background-color: #ccc;
  & .test:not(:first-of-type) {
    margin-top: 1px;
  }
`;

export const Tr = styled.tr`
  display: flex;
  align-items: center;
  background-color: white;
`;

export const Headtd = styled.th<FlexTh>`
  flex: 1 1 ${(props) => props.flex}%;
  font-size: 1.8rem;
  padding: 18px 0px;
`;

export const Bodytd = styled.td<ProfileCheck>`
  flex: 1 1 ${(props) => props.flex}%;
  display: ${(props) => (props.profile ? 'flex' : null)};
  font-size: 1.8rem;
  padding: 16px 0;
  text-align: center;
  padding-left: ${(props) => (props.profile ? '30px' : null)};
  & span {
    flex-shrink: 0;
  }
`;

export const ProductText = styled.div`
  display: flex;
  margin-left: 30px;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
  & h4 {
    font-size: 1.8rem;
  }
  & p {
    font-size: 1.6rem;
    color: #767676;
  }
`;
