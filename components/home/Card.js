import styled from "styled-components";
import Link from "next/link";

export default function Card(props) {
  return (
    <Link href={props.to}>
      <Wrapper>
        <Header>{props.header}</Header>
        {props.children}
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  margin-right: 40px;
  padding: 15px 25px;
  border-radius: 5px;
  border: 2px solid #eaeaea;
  text-align: left;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 250px;
  max-width: 15rem;

  cursor: pointer;
`;

const Header = styled.p`
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
`;
