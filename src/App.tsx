import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Home from "./pages/Home";
import ExcelReady from "./pages/ExcelReady";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./components/ScrollToTop";

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 ">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/excel-ready"
              element={
                <PageTransition>
                  <ExcelReady />
                </PageTransition>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
