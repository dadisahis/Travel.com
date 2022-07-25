import Home from "./screens/home/Home";
import List from "./screens/list/List";
import Login from "./screens/login/Login";
import NewPage from "./screens/new/NewPage";
import NewRoom from "./screens/newRoom/NewRoom";
import NewHotel from "./screens/newHotel/NewHotel";
import Single from "./screens/single/Single";
import {
  userInputs,
  productInputs,
  hotelInputs,
  roomInputs,
} from "./formSource";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { userColumns, hotelColumns, roomColumns } from "./datatablesource";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className={darkMode ? "App dark" : "App"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List dataColumns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewPage inputs={userInputs} title="Add new user" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route index element={<List dataColumns={hotelColumns} />} />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel inputs={hotelInputs} title="Add new Hotel" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route index element={<List dataColumns={roomColumns} />} />
              <Route
                path=":roomId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom inputs={roomInputs} title="Add New Room" />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
