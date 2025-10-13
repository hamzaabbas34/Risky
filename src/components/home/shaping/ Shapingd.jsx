import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Icon } from "@iconify/react/dist/iconify.js";
function Shapingd() {
	useEffect(() => {
		AOS.init({
			duration: 500, // Duration of the animation in milliseconds
			easing: "ease-in-out", // Easing function
			once: true, // Whether animation should happen only once - while scrolling down
		});
	}, []);
	return (
		<div className="grid grid-cols-1 px-16 gap-2 my-10  md:grid-cols-2  lg:grid-cols-2 md:gap-10  overflow-x-hidden">
			<div className="text-center " data-aos="fade-left">
				<div className="flex justify-center items-center my-4">
					<Icon icon="grommet-icons:status-good" width="45" height="45" />
				</div>
				<h1 className="font-Jost-Medium text-2xl my-1 ">Top Quality</h1>
				<p className="font-Jost-Regular  opacity-60 ">
					"Wrap Yourself in Luxury - Our Commitment to the Best Quality Fabric."
				</p>
			</div>
			<div className="text-center " data-aos="fade-left">
				<div className="flex justify-center items-center my-4">
					<Icon icon="healthicons:money-bag" width="45" height="45" />
				</div>
				<h1 className="font-Jost-Medium  text-2xl my-1">Best Offers</h1>
				<p className="font-Jost-Regular  opacity-60 ">
					"Unbeatable Deals Await - Discover Our Best Price Offers Today!"
				</p>
			</div>
		</div>
	);
}

export default Shapingd;
