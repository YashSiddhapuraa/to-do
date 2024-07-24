import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./Routes";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} gutter={8} />
    </>
  );
}

export default App;
