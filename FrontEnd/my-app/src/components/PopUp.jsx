import React from "react";
import styled from "styled-components";

const PopUp = ({ children, estado, cambiarEstado }) => {
  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal>
            <BotonCerrar onClick={() => cambiarEstado(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </BotonCerrar>
            {children}
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default PopUp;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(34, 34, 34, 0.3);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ContenedorModal = styled.div`
  width: 500px !important;
  min-height: 100px !important;
  background: #fff !important;
  position: relative !important;
  border-radius: 5px !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
  padding: 20px !important;
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1766dc;
  &:hover {
    background: #f2f2f2;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
