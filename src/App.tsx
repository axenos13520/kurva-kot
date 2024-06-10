import { useEffect } from "react";
import Window from "./components/Window";
import { useAppSelector } from "./app/hooks";

function App() {
  const onKeyDownFunctions = useAppSelector(
    (state) => state.control.onKeyDownFunctions
  );
  const onClickFunctions = useAppSelector(
    (state) => state.control.onClickFunctions
  );

  useEffect(() => {
    document.onkeydown = (e) => onKeyDownFunctions.forEach((func) => func(e));
    document.onclick = (e) => onClickFunctions.forEach((func) => func(e));
  }, [onKeyDownFunctions, onClickFunctions]);

  return <Window />;
}

export default App;
