import styled from "styled-components";
import Button from "../ui/Button";
import ConverterContainer from "./../../context/ConverterContext";

export default function PluginSelectionSection(props) {
  const converterContext = ConverterContainer.useContainer();

  const renderSelector = () => {
    const plugin = converterContext.getSelectedPlugin();

    if (!plugin) {
      return (
        <ButtonContainer>
          <ButtonItem>
            <Button
              secondary
              onClick={() =>
                converterContext.setSelectedPlugin("SavageFactions")
              }
            >
              SavageFactions
            </Button>
          </ButtonItem>
          <ButtonItem>
            <Button
              secondary
              onClick={() =>
                converterContext.setSelectedPlugin("SaberFactions")
              }
            >
              SaberFactions
            </Button>
          </ButtonItem>
          <ButtonItem>
            <Button
              secondary
              onClick={() => converterContext.setSelectedPlugin("FactionsUUID")}
            >
              FactionsUUID
            </Button>
          </ButtonItem>
        </ButtonContainer>
      );
    } else {
      return (
        <ButtonContainer>
          <SelectedText>Migrating from {plugin}.</SelectedText>
        </ButtonContainer>
      );
    }
  };

  return (
    <Wrapper>
      <Header>Plugin To Migrate From</Header>
      {renderSelector()}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Header = styled.h2`
  font-weight: normal;
  font-size: 20px;
`;

const SelectedText = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.025em;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 15px;
`;

const ButtonItem = styled.div`
  padding: 0 5px;
`;
