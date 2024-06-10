import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setWindowSize } from "../app/windowSlice";
import KurvaKot from "./KurvaKot";
import { onKeyDownSubscribe } from "../app/controlSlice";
import { pauseGame, resumeGame } from "../app/gameSlice";
import { store } from "../app/store";

export default function Window() {
  const dispatch = useAppDispatch();

  const windowSize = useAppSelector((state) => state.window.windowSize);

  useEffect(() => {
    dispatch(setWindowSize([window.innerWidth, window.innerHeight]));
    dispatch(
      onKeyDownSubscribe((e: KeyboardEvent) => {
        const currentWindowSize = store.getState().window.windowSize;

        if (e.key === "Escape")
          dispatch(
            store.getState().game.gamePaused ? resumeGame() : pauseGame()
          );
        else if (e.key === "-")
          dispatch(
            setWindowSize([
              currentWindowSize[0] - 50,
              currentWindowSize[1] - 50,
            ])
          );
        else if (e.key === "=")
          dispatch(
            setWindowSize([
              currentWindowSize[0] + 50,
              currentWindowSize[1] + 50,
            ])
          );
      })
    );
  }, []);

  return (
    <div
      className="relative border-2 border-red-500"
      style={{ width: windowSize[0], height: windowSize[1] }}
    >
      <KurvaKot />
    </div>
  );
}
