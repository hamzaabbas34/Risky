import React from "react";
import { Link } from "react-router-dom";

export default function ExploreCollection({ data }) {
	return (
		<div className="flex flex-col justify-center items-center py-20 px-4 bg-white">
			{/* Heading */}
			<div className="text-center mb-12">
				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-lora font-semibold text-gray-800">
					Match your needs with the best
				</h2>
				<p className="text-gray-500 mt-3 text-base sm:text-lg">
					Explore our exclusive collection
				</p>
			</div>

			{/* Image Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full  max-w-[1400px] md:px-8 px-0 ">
				{data.slice(0, 4).map((item, index) => (
					<Link
						to={`/product/id/${item.style}`}
						state={{
							product: item,
							url: `https://demo.riskydress.com/images/${item.year}/Risky/`,
						}}
						key={index}
						className="relative group overflow-hidden  shadow-md cursor-pointer ">
						<img
							src={
								"https://demo.riskydress.com/images/2026/Risky/" +
								item.images[0]
							}
							alt={item.style}
							className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110 object-center  "
						/>
						<div className="absolute inset-0 bg-[#8a459f]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center">
							<span className="text-white text-xl font-semibold font-poppins tracking-wide">
								{item.style}
							</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
