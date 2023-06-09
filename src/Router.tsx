import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./assets/components/Auth/AppAuth";
import Profile from "./assets/components/Profile/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MessagePage from "./assets/components/Message/MessagePage";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GoogleOAuthProvider
              clientId={
                "940265733927-02dd7samee814s895af2sg5rmngf8rc5.apps.googleusercontent.com"
              }
            >
              <App />
            </GoogleOAuthProvider>
          }
        />
        <Route
          path="/profile"
          element={
            <GoogleOAuthProvider clientId="940265733927-02dd7samee814s895af2sg5rmngf8rc5.apps.googleusercontent.com">
              <Profile />
            </GoogleOAuthProvider>
          }
        />
        <Route path="profile/:id" element={<MessagePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
