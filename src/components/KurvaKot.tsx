import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { onClickSubscribe, onKeyDownSubscribe } from "../app/controlSlice";
import { store } from "../app/store";
import { pauseGame } from "../app/gameSlice";

const deltaTime = 1 / 60;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let deltaY = 0;
let gamePaused: boolean = false;

export default function KurvaKot() {
  const [additionalStyles, setAdditionalStyles] = useState({});
  const [position, setPosition] = useState([5, 0]);

  const sizeDivider = 3000;

  const dispatch = useAppDispatch();
  const windowSize = useAppSelector((state) => state.window.windowSize);
  const gamePausedSelected = useAppSelector((state) => state.game.gamePaused);

  useEffect(() => {
    gamePaused = gamePausedSelected;
  }, [gamePausedSelected]);

  const catSize = useMemo(() => {
    return [
      (570 * windowSize[1]) / sizeDivider,
      (345 * windowSize[1]) / sizeDivider,
    ];
  }, [windowSize]);

  const jumpStrength = 0.6;

  async function Update() {
    while (true) {
      if (!gamePaused) {
        setPosition((prevPosition) => [
          prevPosition[0],
          prevPosition[1] + deltaY,
        ]);

        deltaY += 0.3 * deltaTime;
      }

      await delay(deltaTime);
    }
  }

  useEffect(() => {
    dispatch(
      onKeyDownSubscribe((e: KeyboardEvent) => {
        if (
          !store.getState().game.gamePaused &&
          (e.key === " " || e.key === "ArrowUp")
        )
          deltaY = -jumpStrength;
        else if (e.key === "5") {
          dispatch(pauseGame());
          setAdditionalStyles({
            transitionTimingFunction: "easeIn",
            transitionDuration: "150ms",
            transform: "translateX(-300%) scale(30)",
          });
        }
      })
    );

    dispatch(
      onClickSubscribe((e: MouseEvent) => {
        if (e.button === 0 && !store.getState().game.gamePaused)
          deltaY = -jumpStrength;
      })
    );

    Update();
  }, []);

  return (
    <div
      className="transition-transform duration-75 absolute bg-kurva-kot bg-cover"
      style={{
        width: catSize[0],
        height: catSize[1],
        left: `${position[0]}%`,
        top: `${position[1]}%`,
        transform: `rotate(${deltaY * 70}deg)`,
        ...additionalStyles,
      }}
    ></div>
  );
}
