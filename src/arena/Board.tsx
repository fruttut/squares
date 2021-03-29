import React, {useRef} from "react";
import {Box} from "@material-ui/core";
import {BoardCell} from "../shared/BoardCell";
import {useArena} from "./ArenaContext";
import {EArenaActionTypes} from "./actions";

export const Board: React.FC = () => {
  const [{ dim, cells, board, groups, players, turns, currentTurnIndex }, dispatch] = useArena();
  const nextGroupId = useRef(1);

  const handleCellClick = (id: string) => {
    if (cells.groups[id] == null) {
      dispatch({
        type: EArenaActionTypes.PAINT_CELL,
        cellId: id,
        playerId: turns[currentTurnIndex],
        groupId: String(nextGroupId.current++),
      });
      dispatch({
        type: EArenaActionTypes.PASS_MOVE,
      });
    }
  };
  return (
    <Box display="grid" flexGrow={1} gridTemplateRows={`repeat(${dim}, 1fr)`} gridTemplateColumns={`repeat(${dim}, 1fr)`}>
      {board.cells.map((row, i) => row.map((id, j) => (
        <BoardCell
          key={id}
          id={id}
          lastRow={i === dim - 1}
          lastCol={j === dim - 1}
          color={cells.groups[id] && players.colors[groups.players[cells.groups[id]!]]}
          onClick={handleCellClick}
        />
      )))}
    </Box>
  );
};