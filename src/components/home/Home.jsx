import Navbar from "../navbar/Navbar";
import "./Home.css"; // Ensure you create and import the CSS file for styles
import Collections from "./collections/Collections";
import Features from "./Feature/Features";
import Shapingd from "./shaping/ Shapingd";
import Footer from "../Footer/Footer";
import ExploreCollection from "./exploreCollection/ExploreCollection";

export default function Home() {
	return (
		<div className="relative overflow-hidden">
			<Navbar />

			<div className="flex flex-col-reverse md:flex-row w-full mt-[135px] min-h-[500px] md:h-[800px]">
				{/* Image Section */}
				<div className="w-full md:w-[85%] ">
					<img
						src="https://cro-theme-elemento-terra.myshopify.com/cdn/shop/files/GENERA_1.jpg?v=1742458897&width=2560"
						alt="New Arrival"
						className="w-full  h-[400px] md:h-[800px] object-cover object-top"
					/>
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

			<ExploreCollection />
			<Collections />
			<Features />
			<Shapingd />
			<Footer />
		</div>
	);
}
