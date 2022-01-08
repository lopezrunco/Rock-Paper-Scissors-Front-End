import styled from "styled-components"

export const HeaderWrapper = styled.header`
  height: 8vh;
  display: flex;
  justify-content: space-between;
  background-color: #444444;
  align-items: center;
  color: #ececec;
  z-index: 9999;
  position: fixed;
  width: 100%;
  
  @media only screen and (min-width: 992px) {
    background-color: transparent;
  }
` 