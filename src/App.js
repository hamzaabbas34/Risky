import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import Gowns from "./components/pages/Gowns.jsx";
import ViewProduct from "./components/pages/ViewProduct";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/about" element={<About />} />
				<Route path="/Gowns" element={<Gowns />} />
				<Route path="/product/id/:style" element={<ViewProduct />} />
			</Routes>
		</Router>
	);
}

export default App;
