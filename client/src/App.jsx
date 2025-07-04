import About from "./pages/About";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Committee from "./pages/Committee";
import Notices from "./pages/Notices";
import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import UploadNotice from "./components/UploadNotice";
import UploadGallery from "./components/UploadGallery";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenderList from "./pages/TenderList";
import UploadTender from "./components/UploadTender";
import SubmitTender from "./pages/SubmitTender";
import TenderSubmissions from "./pages/TenderSubmissions";

function ProtectedRoute({ children, adminOnly }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <AppNavbar />
          <main className="flex-grow-1">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/committee" element={<Committee />} />
              <Route exact path="/notices" element={<Notices />} />
              <Route exact path="/gallery" element={<Gallery />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route exact path="/tenders" element={<TenderList />} />
              <Route exact path="/uploadTender" element={
                <ProtectedRoute adminOnly={true}>
                  <UploadTender />
                </ProtectedRoute>
              } />
              <Route exact path="/submitTender/:tenderId" element={
                <ProtectedRoute adminOnly={false}>
                  <SubmitTender />
                </ProtectedRoute>
              } />
              <Route exact path="/tenderSubmissions/:tenderId" element={
                <ProtectedRoute adminOnly={true}>
                  <TenderSubmissions />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
