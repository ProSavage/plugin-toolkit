import styled from "styled-components";
import { useEffect, useState } from "react";
import ConverterContainer from "../../context/ConverterContext";
import { convertPlayers, convertFactions } from "../../util/converter/FactionsUUIDConverter";
import ConvertedCard from "./ConvertedCard";

export default function ResultsSection(props) {
  const converterContext = ConverterContainer.useContainer();
  const [run, setRun] = useState(false);
  const [players, setPlayers] = useState(undefined);
  const [factions, setFactions] = useState(undefined);

  useEffect(() => {
    if (!converterContext.started) return;
    setRun(true);
    // convert players...
    convertPlayers(converterContext.converterFiles.Fplayers.file).then(
      (data) => {
         convertFactions(data.data.fplayers, converterContext.converterFiles.Factions.file).then(data => setFactions(data))
        setPlayers(data);
      }
    );
  }, [converterContext]);

  return (
    <Wrapper>
        <h2>FactionsX Data</h2>
      <CardContainer>
      {players && (
        <ConvertedCard
          title={"Converted Players"}
          time={players.time}
          found={`${Object.keys(players.data.fplayers).length} players found`}
        />
      )}
      {factions && (
        <ConvertedCard
          title={"Converted Factions"}
          time={factions.time}
          found={`${Object.keys(factions.data.factions).length} factions found`}
        />
      )}
      </CardContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
`;

const CardContainer = styled.div`
padding-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`
