import styled from "styled-components"

export const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .5rem;
  align-items: center;
  background: #444444;
  position: fixed;
  top: 0vh;
  right: ${props => (props.open ? "0" : "-100%")};
  width: 100%;
  height: 100vh;
  z-index: 9999;
  transition: right 0.3s linear;

  a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    font-size: .9rem;
    color: #e6e6e6 !important;
    background-color: #444444 !important;
    clip-path: polygon(0% 0%,3% 95%,90% 90%,98% 94%,96% 3%) !important;
    transition: all 0.5s !important;
  }

  a:hover {
    clip-path: polygon(0% 0%,0% 100%,90% 92%,98% 94%,98% 0%) !important;
    color: #deb400 !important;
  }

  button {
    border: none;
    background: transparent;
  }

  .logged-in-menu {
    display: flex;
  }

  @media only screen and (min-width: 992px) {
    flex-direction: row;
    position: initial;
    height: auto;
    justify-content: center;
    background: transparent;
  }
  a {
    padding: 1rem;
    text-decoration: none;
  }
` 