import { useEffect, useState } from "react";
import AuthModule from "./components/auth/AuthModule";
import MainModule from "./components/main/MainModule";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  return (
    <div className="h-screen w-screen font-pops overflow-hidden flex justify-center items-center">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthModule setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            }
          />
          <Route
            path="/main"
            element={
              <MainModule
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
