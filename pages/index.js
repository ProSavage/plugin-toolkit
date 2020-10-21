import Head from "next/head";
import styled from "styled-components";
import Card from "./../components/home/Card";
import React from "react";

export default function Home() {
  return (
    <PageWrapper>
      <Head>
        <title>plugin-toolkit</title>
      </Head>
      <Header>
        <CodeContainer>
          <Code>plugin-toolkit 🛠</Code>
        </CodeContainer>
      </Header>
      <SubHeader>A series of useful tools for SavageLabs Plugins</SubHeader>
      <CardContainer>
        <Card header={"FactionsX Converter"} to="/tools/factionsx-converter">
          <CardContentContainer>
            <CardText>
              Convert Data From:
            </CardText>
            <CardSubText>SaberFactions</CardSubText>
            <CardSubText>SavageFactions</CardSubText>
            <CardSubText>FactionsUUID</CardSubText>
          </CardContentContainer>
        </Card>
        <Card header={"XMaterial Reference"} to="/tools/xmaterial">
          <CardContentContainer>
            <CardLightText>
              Interactive GUI for material parameters.
            </CardLightText>
            <CardLightText>
              Works for all plugins using the XMaterial library.
            </CardLightText>
          </CardContentContainer>
        </Card
        ><Card header={"JSON Validator"} to="/tools/jsonvalidator">
          <CardContentContainer>
            <CardLightText>
              Easily check your JSON configuration files.
            </CardLightText>
            <CardLightText>
              Works for any JSON data or configuration file.
            </CardLightText>
          </CardContentContainer>
        </Card>
      </CardContainer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-top: 60px;
`;

const Code = styled.code`
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  letter-spacing: -0.025em;
`;

const CodeContainer = styled.div`
  background: #eaeaea;
  border-radius: 5px;
  padding: 10px;
`;

const SubHeader = styled.h2`
  font-weight: normal;
  padding-top: 25px;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.025em;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 4rem 4em 0;
`;

const CardContentContainer = styled.div`
  padding-top: 10px;
`;

const CardText = styled.h5`
  padding-top: 15px;
  font-weight: 400;
`;

const CardLightText = styled.h5`
  padding-top: 15px;
  font-weight: normal;
`;

const CardSubText = styled.h5`
  padding-left: 5px;
  font-weight: normal;
`