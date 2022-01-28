import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`
const FadeIn = ({
    duration = 500,
    delay = 0,
    children,
    ...delegated
}) => {
    return (
      // Se aplica la animacion al elemento padre que lo heredara a sus hijos
      // en este caso, los hijos son cualquier elemento que envolvamos en el componente
        <Wrapper {...delegated}
            style={{
                ...(delegated.style || {}),
                animationDuration: duration + 'ms',
                animationDelay: delay + 'ms',
            }}>
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
  }
`

export default FadeIn