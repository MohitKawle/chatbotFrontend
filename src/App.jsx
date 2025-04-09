import { useEffect } from "react";
import MainRoutes from "./routes/Routes";
import { useDispatch } from "react-redux";
import { setToken } from "./store/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, []);

  return <MainRoutes />;
}

export default App;
