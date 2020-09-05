import styled, { css } from "styled-components";

export default function Button(props) {
  return (
    <Container>
      <StyledButton
        secondary={props.secondary}
        type={props.type}
        onClick={props.onClick}
      > 
        {props.children}
      </StyledButton>
    </Container>    
  );
}

const StyledButton = styled.button`
  font-weight: medium;
  font-size: 17px;
  text-align: center;
  background: black;
  box-sizing: border-box;
  border-radius: 8px;
  color: white;
  border-radius: 4px;
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover,
  &:focus {
    outline: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.secondary &&
    css`
      color: black;
      background: white;
      border: 2px solid #eaeaea;

      &:hover {
          color: black;
          border: 2px solid black;
      }
    `}
    
  
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  cursor: pointer;
`;