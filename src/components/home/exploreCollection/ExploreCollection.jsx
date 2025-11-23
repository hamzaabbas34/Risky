import React from "react";
import { Link } from "react-router-dom";

export default function ExploreCollection({ data }) {

	const filteredData = Array.isArray(data)
		? data
				// 1. FILTER: Keep only items where viewInfront is true
				.filter((item) => item.viewInfront === true)
				// 2. RANDOMIZE: Shuffle the filtered results
				.sort(() => 0.5 - Math.random())
				// 3. LIMIT: Take only the first 3 (or fewer if fewer are featured)
				.slice(0, 4)
		: [];
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
				{filteredData.map((item, index) => (
					<Link
						to={`/Gowns/id/${item.style}`}
						state={{
							product: item,
						}}
						key={index}
						className="relative group overflow-hidden  shadow-md cursor-pointer ">
						<img
							src={"https://admin.monsinidress.com/" + item.images[0]}
							alt={item.style}
							className="w-full h-[500px] object-cover  object-top transition-transform duration-500 group-hover:scale-110   "
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
