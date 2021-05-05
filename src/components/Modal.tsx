import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import ReactDOM from "react-dom"
// import PageLink from "./PageLink"
//import Container, { Col } from "./Container"

type Props = {
  className?: string
  close: any
}

const Modal: React.FC<Props> = ({ className, children, close }) => {
  return ReactDOM.createPortal(
    <StyledModal className={`container ${className}`}>
      <div className="modal-inner">
        {children}
        <span className="modal-close" onClick={close}>
          &times;
        </span>
      </div>
    </StyledModal>,
    document.body
  )
}

const StyledModal = styled.div`
  ${tw`fixed inset-0 z-10 flex justify-center items-center`}
  background-color: rgba(28, 30, 40, 0.8);
  .modal-inner {
    ${tw`text-white relative pt-6 sm:pb-6 sm:pt-10 px-6 sm:px-12 bg-gray-800 rounded`}
  }
  .modal-close {
    ${tw`absolute top-0 right-0 mt-8 mr-10 text-3xl text-gray-300`}
    &:hover {
      cursor: pointer;
    }
  }
  .modal-button {
    transition: all 0.2s ease-in-out;
    ${tw`rounded text-sm bg-gray-700 py-2 px-3 mr-3`}
    &:hover {
      cursor: pointer;
      ${tw`bg-gray-500`}
    }
  }
`
export default Modal
