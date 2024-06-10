import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setWindowSize } from "../app/windowSlice";
import KurvaKot from "./KurvaKot";
import { onKeyDownSubscribe } from "../app/controlSlice";
import { pauseGame, resumeGame } from "../app/gameSlice";
import { store } from "../app/store";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const deltaTime = 1 / 60;

export default function Window() {
  const [backgroundShift, setBackgroundShift] = useState(0);

  const dispatch = useAppDispatch();

  const windowSize = useAppSelector((state) => state.window.windowSize);

  async function Update() {
    while (true) {
      setBackgroundShift((prevShift) => (prevShift >= 100 ? 0 : prevShift + 1));

      await delay(deltaTime);
    }
  }

  useEffect(() => {
    dispatch(setWindowSize([window.innerWidth, window.innerHeight]));
    // dispatch(setWindowSize([1000, 500]));
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

    Update();
  }, []);

  return (
    <div
      className="relative border-2 border-red-500"
      style={{ width: windowSize[0], height: windowSize[1] }}
    >
      <div
        className="absolute w-[200%] h-full bg-background bg-contain bg-repeat-x -z-10"
        style={{
          left: `${-backgroundShift}px`,
          imageRendering: "pixelated",
        }}
      ></div>
      <KurvaKot />
    </div>
  );
}
