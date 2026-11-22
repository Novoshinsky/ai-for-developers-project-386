import { Navigate, Route, Routes } from "react-router";
import BookingPage from "./pages/booking-page";
import HomePage from "./pages/home-page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
