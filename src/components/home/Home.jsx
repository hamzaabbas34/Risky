import Navbar from "../navbar/Navbar";
import "./Home.css"; // Ensure you create and import the CSS file for styles
import Collections from "./collections/Collections";
import Features from "./Feature/Features";
import Shapingd from "./shaping/ Shapingd";
import Footer from "../Footer/Footer";
import ExploreCollection from "./exploreCollection/ExploreCollection";
import { useEffect, useState } from "react";
import video1 from "../../assets/video/WhatsApp Video 2025-10-10 at 17.06.49.mp4";
import video2 from "../../assets/video/WhatsApp Video 2025-10-10 at 17.06.51.mp4";
// here
export default function Home() {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("/risky.json") // 👈 fetches from public folder
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => setData(data.products))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	console.log(data);
	return (
		<div className="relative overflow-hidden">
			<Navbar data={data} />

			<div className="flex flex-col-reverse md:flex-row w-full mt-[150px]  md:h-auto">
				{/* Image Section */}
				<div className="w-full md:w-[85%] grid grid-cols-1 md:grid-cols-3 gap-2">
					<img
						src="https://demo.riskydress.com/images/2026/Risky/RS4%20%281%29.jpg"
						className="w-full sm-h-[700px] h-[600px] md:h-[800px] object-cover object-top"
						alt=""
					/>
					<video
						src={video1}
						autoPlay
						loop
						muted
						playsInline
						className="w-full sm-h-[700px] h-[600px] md:h-[800px] object-cover object-top "></video>

					<video
						src={video2}
						autoPlay
						loop
						muted
						playsInline
						className="w-full sm-h-[700px] h-[600px] md:h-[800px] object-cover object-top"></video>
				</div>

				{/* Text Section */}
				<div className="w-full md:w-[15%] flex justify-start md:justify-center items-center bg-white md:h-[800px] h-auto py-5  md:py-0 text-start">
					{/* Mobile (two lines, not rotated) */}
					<span className="block md:hidden  text-[50px] font-lora font-extrabold text-[#8a459f] tracking-wide leading-[45px] tr ">
						NEW <br /> ARRIVAL
					</span>

					{/* Desktop (one line, rotated) */}
					<span
						className="
        hidden md:block
        text-[70px] lg:text-[80px]
        font-lora font-extrabold text-[#8a459f]
        leading-[80px]
        tracking-widest
        whitespace-nowrap
        rotate-[-270deg]
		md:leading-1

      ">
						NEW ARRIVAL
					</span>
				</div>
			</div>

			<ExploreCollection data={data} />
			<Collections data={data} />
			<Features data={data} />
			<Shapingd />
			<Footer />
		</div>
	);
}
