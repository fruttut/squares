import React, {useCallback, useState} from 'react';
import {MuiThemeProvider,} from "@material-ui/core";
import {theme} from "./theme/theme";
import {GlobalStyles} from "./theme/GlobalStyles";
import {ERetryOptions, IGame, IGameResult} from "./types";
import {Wizard} from "./wizard/Wizard";
import {WizardContextProvider} from "./wizard/WizardContextProvider";
import {ArenaContextProvider} from "./arena/ArenaContextProvider";
import {Arena} from "./arena/Arena";
import {WinnerScreen} from "./WinnerScreen";

const App: React.FC = () => {
  const [game, setGame] = useState<IGame | null>(null);
  const [result, setResult] = useState<IGameResult | null>(null);

  const handleWizardSubmit = useCallback((game: IGame) => {
    setGame(game);
  }, []);

  const handleGameEnd = useCallback((result: IGameResult) => {
    setResult(result);
  }, []);

  const handleRetry = (retry: ERetryOptions) => {
    setResult(null);
    if (retry === ERetryOptions.WIZARD) {
      setGame(null);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles />
      {!!game && !!result && (
        <WinnerScreen result={result} onRetry={handleRetry} />
      )}
      {!!game && !result && (
        <ArenaContextProvider game={game}>
          <Arena onEnd={handleGameEnd} />
        </ArenaContextProvider>
      )}
      {!game && (
        <WizardContextProvider>
          <Wizard onSubmit={handleWizardSubmit} />
        </WizardContextProvider>
      )}
    </MuiThemeProvider>
  );
}

export default App;
