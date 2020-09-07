import styled from "styled-components";
import { useEffect, useState } from "react";
import ConverterContainer from "../../context/ConverterContext";
import {
  convertPlayers,
  convertFactions,
  convertBoard,
} from "../../util/converter/FactionsUUIDConverter";
import ConvertedCard from "./ConvertedCard";

export default function ResultsSection(props) {
  const converterContext = ConverterContainer.useContainer();
  const [run, setRun] = useState(false);
  const [players, setPlayers] = useState(undefined);
  const [grid, setGrid] = useState(undefined);
  const [factions, setFactions] = useState(undefined);

  useEffect(() => {
    if (!converterContext.started || !converterContext.getSelectedPlugin()) return;
    setRun(true);
    // convert players...
    convertPlayers(converterContext.converterFiles.Fplayers.file).then(
      (playerData) => {
        setPlayers(playerData);
        let roleTag;
        const selectedPlugin = converterContext.getSelectedPlugin();
        if (selectedPlugin === "FactionsUUID") {
          roleTag = "ADMIN"
        } else if (selectedPlugin === "SavageFactions" ||  selectedPlugin === "SaberFactions") {
          roleTag = "LEADER"
        }
        convertBoard(converterContext.converterFiles.Board.file).then(
          (gridData) => {
            setGrid(gridData);
            console.log(playerData.data)
            convertFactions(
              playerData.data.fplayers,
              gridData.data.claimGrid,
              converterContext.converterFiles.Factions.file,
              selectedPlugin
            ).then((data) => setFactions(data));
          }
        );
      }
    );
  }, [converterContext]);

  return (
    <Wrapper>
      {run && <h2>FactionsX Data</h2>}
      <CardContainer>
        {players && (
          <ConvertedCard
            name={"players"}
            data={players.data}
            title={"Converted Players"}
            time={players.time}
            found={`${Object.keys(players.data.fplayers).length} players found`}
          />
        )}
        {grid && (
          <ConvertedCard
            name={"grid"}
            data={grid.data}
            title={"Converted Grid"}
            time={grid.time}
            found={`${Object.keys(grid.data.claimGrid).length} claims found`}
          />
        )}
        {factions && (
          <ConvertedCard
            name={"factions"}
            data={factions.data}
            title={"Converted Factions"}
            time={factions.time}
            found={`${
              Object.keys(factions.data.factions).length
            } factions found`}
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
`;
