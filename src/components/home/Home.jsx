import Navbar from "../navbar/Navbar";
import "./Home.css"; // Ensure you create and import the CSS file for styles
import Collections from "./collections/Collections";
import Features from "./Feature/Features";
import Shapingd from "./shaping/ Shapingd";
import Footer from "../Footer/Footer";
import ExploreCollection from "./exploreCollection/ExploreCollection";
import { useEffect, useState } from "react";
import HeroSection from "./herosection/HeroSection";

// here

const dummy = [
	{
		_id: "69087073c80632982d5fd502",
		brand: "Monsini",
		year: 2025,
		versionName: "SP25",
		availability: "No",
		category: "Prom 2025",
		style: "40057",
		price: 285,
		colors: ["Red", "Blue"],
		size: "0-24",
		viewInfront: true,
		images: ["image1.jpg", "image2.jpg"],
		createdAt: "2025-11-03T09:05:55.379+00:00",
		__v: 0,
	},
	{
		_id: "69087073c80632982d5fd503",
		brand: "Monsini",
		year: 2025,
		versionName: "SP26",
		availability: "Yes",
		category: "Prom 2025",
		style: "40058",
		price: 295,
		colors: ["Black", "White"],
		size: "0-24",
		viewInfront: true,
		images: ["image3.jpg", "image4.jpg"],
		createdAt: "2025-11-04T10:15:22.123+00:00",
		__v: 0,
	},
	{
		_id: "69087073c80632982d5fd504",
		brand: "Monsini",
		year: 2025,
		versionName: "SP27",
		availability: "No",
		category: "Prom 2025",
		style: "40059",
		price: 275,
		colors: ["Green", "Yellow"],
		size: "0-24",
		viewInfront: true,
		images: ["image5.jpg", "image6.jpg"],
		createdAt: "2025-11-05T11:20:33.456+00:00",
		__v: 0,
	},
	{
		_id: "69087073c80632982d5fd505",
		brand: "Monsini",
		year: 2025,
		versionName: "SP28",
		availability: "Yes",
		category: "Prom 2025",
		style: "40060",
		price: 310,
		colors: ["Purple", "Pink"],
		size: "0-24",
		viewInfront: true,
		images: ["image7.jpg", "image8.jpg"],
		createdAt: "2025-11-06T12:25:44.789+00:00",
		__v: 0,
	},
	{
		_id: "69087073c80632982d5fd506",
		brand: "Monsini",
		year: 2025,
		versionName: "SP29",
		availability: "No",
		category: "Prom 2025",
		style: "40061",
		price: 265,
		colors: ["Orange", "Brown"],
		size: "0-24",
		viewInfront: true,
		images: ["image9.jpg", "image10.jpg"],
		createdAt: "2025-11-07T13:30:55.111+00:00",
		__v: 0,
	},
	{
		_id: "69087073c80632982d5fd507",
		brand: "Monsini",
		year: 2025,
		versionName: "SP30",
		availability: "Yes",
		category: "Prom 2025",
		style: "40062",
		price: 320,
		colors: ["Gray", "Silver"],
		size: "0-24",
		viewInfront: true,
		images: ["image11.jpg", "image12.jpg"],
		createdAt: "2025-11-08T14:35:66.222+00:00",
		__v: 0,
	},
	{
		_id: "69087073c80632982d5fd508",
		brand: "Monsini",
		year: 2025,
		versionName: "SP31",
		availability: "No",
		category: "Prom 2025",
		style: "40063",
		price: 280,
		colors: ["Gold", "Beige"],
		size: "0-24",
		viewInfront: true,
		images: ["image13.jpg", "image14.jpg"],
		createdAt: "2025-11-09T15:40:77.333+00:00",
		__v: 0,
	},
	{
		_id: "69087073c80632982d5fd509",
		brand: "Monsini",
		year: 2025,
		versionName: "SP32",
		availability: "Yes",
		category: "Prom 2025",
		style: "40064",
		price: 300,
		colors: ["Navy", "Maroon"],
		size: "0-24",
		viewInfront: true,
		images: ["image15.jpg", "image16.jpg"],
		createdAt: "2025-11-10T16:45:88.444+00:00",
		__v: 0,
	},
];
export default function Home() {
	const [data, setdata] = useState(dummy);
	const [year, setYear] = useState([2026]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl = `https://admin.monsinidress.com/api/products/brand`;
				console.log("Fetching from:", apiUrl);

				const response = await fetch(apiUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ brand: "Risky" }),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				console.log("API Response:", data);
				if (data.data && data.data.products) {
					setdata(data.data.products);
					const yearData = data.data.year;
					if (Array.isArray(yearData)) {
						setYear(yearData);
					} else {
						setYear([yearData || new Date().getFullYear()]);
					}
				} else {
					setdata(dummy);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const latestYear =
		Array.isArray(year) && year.length > 0
			? Math.max(...year)
			: year || new Date().getFullYear();
	console.log("Latest Year:", latestYear);
	return (
		<div className="relative overflow-hidden">
			<Navbar data={data} />
			<HeroSection />
			<ExploreCollection data={data} latestYear={latestYear} />
			<Collections data={data} latestYear={latestYear} />
			<Features data={data} latestYear={latestYear} />
			<Shapingd />
			<Footer />
		</div>
	);
}
