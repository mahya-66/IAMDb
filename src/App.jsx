import { Outlet } from "react-router";
import "./assets/styles/index.css";

const App = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default App;
