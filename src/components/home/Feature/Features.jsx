import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Featurelist from "./FeatureProductlist/Featurelist";
import { Link } from "react-router-dom";

export default function Features({data}) {
	// Number of items initially visible
	
	useEffect(() => {
		AOS.init({
			duration: 500, // Duration of the animation in milliseconds
			easing: "ease-in-out", // Easing function
			once: true, // Whether animation should happen only once - while scrolling down
		});
	}, []);

	return (
		<div className="overflow-x-hidden ">
			<div className="text-center  mb-10 overflow-hidden" data-aos="fade-left">
				<h1 className="text-5xl font-semibold font-lora">Featured Products</h1>
			</div>
			<ul
				data-aos="fade-right"
				data-aos-duration="300"
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-20 mb-16 px-4 lg:ps-16 lg:pe-16 md:ps-10 md:pe-10 overflow-x-hidden ">
				{data.map((item) => (
					<Featurelist key={item.style} data={item} />
				))}
			</ul>

			<div className="text-center  mb-10">
				<Link className="px-10 py-4 text-[20px]  text-white font-lora border-0  rounded-2 hover:bg-opacity-80  bg-[#8a459f]  hover:text-white rounded">
					Show More
				</Link>
			</div>
		</div>
	);
}
