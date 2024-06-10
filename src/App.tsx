import { useEffect } from "react";
import Window from "./components/Window";
import { useAppSelector } from "./app/hooks";

function App() {
  const onKeyDownFunctions = useAppSelector(
    (state) => state.control.onKeyDownFunctions
  );

  useEffect(() => {
    document.onkeydown = (e) => onKeyDownFunctions.forEach((func) => func(e));
  }, [onKeyDownFunctions]);

  return <Window />;
}

export default App;
