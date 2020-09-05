import styled from "styled-components";
import Link from "next/link";

export default function Navbar() {
  const items = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Store",
      link: "https://store.savagelabs.net",
    },
  ];

  return (
    <Container>
      <Link href="/">
        <CodeContainer>
            <Code>plugin-toolkit 🛠</Code>
        </CodeContainer>
      </Link>
      {items.map((item) => (
        <Item key={item.text}>
          <Link href={item.link}>
            <a>{item.text}</a>
          </Link>
        </Item>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  background: #ffffff;
  padding: 25px;
`;

const Code = styled.code`
  font-size: 20px;
  text-align: center;
  letter-spacing: -0.025em;
`;

const CodeContainer = styled.div`
  background: #eaeaea;
  border-radius: 5px;
  padding: 10px;
`;

const Logo = styled.img`
  width: 175px;
  cursor: pointer;
`;

const Item = styled.div`
  padding-left: 50px;
  /* Looks weird without this since logo and text centered looks off.
  padding-top: 5px; */

  /* Have to do this, bc a styled a component breaks nextjs [Link] */
  a {
    color: black;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.025em;

    cursor: pointer;
    transition: 250ms ease-in-out;

    &:hover {
      color: orange;
    }
  }
`;

const Text = styled.a``;
