import React, { useEffect } from 'react';
import styled from 'styled-components';

interface ModalType {
  isModal: boolean;
  setIsModal: Function;
  children: React.ReactNode;
}

interface ModalCss {
  isModal: boolean;
}

function EditorModal({ isModal, setIsModal, children }: ModalType) {
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModal]);
  return (
    <ModalContainer>
      <ModalBack isModal={isModal} onClick={() => setIsModal(false)} />
      <ModalBox isModal={isModal}> {children} </ModalBox>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: relative;
  z-index: 10;
`;

const ModalBack = styled.div<ModalCss>`
  display: ${(props) => (props.isModal ? 'block' : 'none')};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0.4;
  background-color: #eee;
`;

const ModalBox = styled.div<ModalCss>`
  display: ${(props) => (props.isModal ? 'block' : 'none')};
  position: fixed;
  left: 50%;
  top: 50%;
  opacity: 1;
  background-color: pink;
  border: 1px solid black;
  transform: translate(-50%);
  width: 100px;
  height: 100px;
`;

export default EditorModal;
