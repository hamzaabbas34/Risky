import React from "react";
import image1 from '../../../assets/images/red.avif'
import image2 from '../../../assets/images/rs5-1-AR01zQ0x8Gc92gEv.avif'
import image3 from '../../../assets/images/store_01K3FA2E68RAQDA3S6QTV0HEKF_assets_010b68ae-d7ec-4f7d-8b32-aba4553196b1.avif'
import image4 from '../../../assets/images/store_01K3FA2E68RAQDA3S6QTV0HEKF_assets_d9ec3ca3-f92b-40eb-8d82-877136f329b5.avif'

export default function ExploreCollection() {
	const collections = [
		{
			img: image1,
			title: "Red Dress",
		},
		{
			img: image2,
			title: "Black Dress",
		},
		{
			img: image3,
			title: "Evening Gown",
		},
		{
			img: image4,
			title: "Blue Gown",
		},
	];

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
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full  max-w-[1400px] px-8">
				{collections.map((item, index) => (
					<div
						key={index}
						className="relative group overflow-hidden  shadow-md cursor-pointer ">
						<img
							src={item.img}
							alt={item.title}
							className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-110 object-top"
						/>
						<div className="absolute inset-0 bg-[#8a459f]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center">
							<span className="text-white text-xl font-semibold font-poppins tracking-wide">
								{item.title}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
