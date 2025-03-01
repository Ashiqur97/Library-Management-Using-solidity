import Footer from "./components/Footer"
import Header from "./components/Header"
import Mainsection from "./components/Mainsection"
import Navigation from "./components/Navigation"
import '../src/components/componentStyle.css';
import { useState } from "react";

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  return (
   <div className="container">
    <Header />
    <Navigation setCurrentSection={setCurrentSection} />
    <div className="main-footer">
      <Mainsection currentSection={currentSection} />
      <Footer />
    </div>
   </div>
  )
}

export default App
