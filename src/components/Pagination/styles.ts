import styled from 'styled-components'

export const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const PaginationContent = styled.div`
  display: flex;

  gap: 0.5rem;
  padding: 2rem;
  button {
    background: transparent;
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme.white};
    border-radius: 5px;
  }
`
