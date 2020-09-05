import styled, { css } from "styled-components";

export default function FileInput(props) {
  return (
    <Wrapper validated={props.valid}>
      <label htmlFor={props.name}>{props.children}</label>
      <StyledInput onChange={props.onChange} type={"file"} id={props.name} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  border: 2px dashed #eaeaea;
  border-radius: 5px;
  transition: 250ms ease-in-out;
  &:hover {
    border: 2px solid black;
    ${(props) =>
    props.validated === 1 &&
    css`
      border: 2px solid #06d6a0;
    `}
  ${(props) =>
    props.validated === -1 &&
    css`
      border: 2px solid #ef476f;
    `}
  }

  ${(props) =>
    props.validated === 1 &&
    css`
      border: 2px dashed #06d6a0;
    `}
  ${(props) =>
    props.validated === -1 &&
    css`
      border: 2px dashed #ef476f;
    `}
`;

const StyledInput = styled.input`
  display: none;
`;
