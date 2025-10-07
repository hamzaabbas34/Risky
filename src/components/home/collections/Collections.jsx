// import React, { useEffect } from "react";
// import AOS from "aos";
// import { Icon } from "@iconify/react";

// import "aos/dist/aos.css";
// import "./collection.css";

// export default function Collections() {
// 	useEffect(() => {
// 		AOS.init({
// 			duration: 500,
// 			easing: "ease-in-out",
// 			once: true,
// 		});
// 	}, []);

// 	return (
// 		<div className="mb-20 px-4 md:px-10 ">
// 			{/* Section Title */}
// 			<div className="text-center font-lora font-semibold text-3xl md:text-5xl mb-20">
// 				<h3>Our Popular Collections</h3>
// 			</div>

// 			{/* Flex Layout */}
// 			<div className="w-full flex flex-col md:flex-row items-start gap-10 ">
// 				{/* Left Section */}
// 				<div
// 					className="md:w-1/3 w-full  lg:min-h-[400px] h-auto   flex   justify-center items-center rounded-xl"
// 					data-aos="fade-right">
// 					<div className="space-y-6  h-fit">
// 						<h2 className="font-lora text-2xl md:text-3xl font-bold">
// 							Latest Prom Dresses
// 						</h2>
// 						<p className="font-poppins text-gray-600 text-base md:text-lg">
// 							Go to Prom in Style with our latest 2025 Prom Dresses featuring
// 							dazzling dress designs.
// 						</p>
// 						<button className="px-6 py-3 font-lora  bg-[#8a459f]  text-white text-base md:text-lg font-semibold rounded-full hover:bg-gray-900 transition">
// 							Explore Collection
// 						</button>
// 					</div>
// 				</div>

// 				{/* Right Section with Scroll */}
// 				<div className="md:w-2/3 w-full relative">
// 					<div
// 						id="scrollContainer"
// 						className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar">
// 						{[1, 2, 3, 4, 5, 6].map((i) => (
// 							<div
// 								key={i}
// 								className="relative group flex-shrink-0 w-[250px] sm:w-[300px] md:w-[350px] h-[400px] sm:h-[400px] md:h-[450px]">
// 								<img
// 									src="https://www.amarra.com/cdn/shop/files/89004Nude_Multi_a_1200x.jpg?v=1748346103"
// 									alt={`Dress ${i}`}
// 									className="w-full h-full object-cover rounded-xl shadow-md"
// 								/>

// 								{/* Name appears only on hover */}
// 								<p className=" flex justify-center items-center font-poppins text-[22px] absolute bottom-4 right-2  text-white text-sm md:text-base px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500">
// 									Dress {i}
// 									<span>
// 										<Icon
// 											icon="flowbite:arrow-right-outline"
// 											width="1.5rem"
// 											height="1.5rem"
// 											style={{ color: "white" }}
// 											className="ms-5 lg:block md:block hidden"
// 										/>
// 									</span>
// 								</p>
// 							</div>
// 						))}
// 					</div>

// 					{/* Left Arrow */}
// 					<button
// 						onClick={() => {
// 							document
// 								.getElementById("scrollContainer")
// 								.scrollBy({ left: -300, behavior: "smooth" });
// 						}}
// 						className="absolute left-0 top-1/2 -translate-y-1/2  bg-[#8a459f]  text-white p-3 rounded-full shadow hover:bg-gray-800 hidden sm:flex">
// 						&#8592;
// 					</button>

// 					{/* Right Arrow */}
// 					<button
// 						onClick={() => {
// 							document
// 								.getElementById("scrollContainer")
// 								.scrollBy({ left: 300, behavior: "smooth" });
// 						}}
// 						className="absolute right-0 top-1/2 -translate-y-1/2  bg-[#8a459f]  text-white p-3 rounded-full shadow hover:bg-gray-800 hidden sm:flex">
// 						&#8594;
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }



import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import { Icon } from "@iconify/react";

import "aos/dist/aos.css";
import "./collection.css";

export default function Collections() {
	const scrollContainerRef = useRef(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(true);

	useEffect(() => {
		AOS.init({
			duration: 600,
			easing: "ease-in-out-cubic",
			once: true,
			offset: 50,
		});
	}, []);

	const updateArrowVisibility = () => {
		const container = scrollContainerRef.current;
		if (container) {
			const { scrollLeft, scrollWidth, clientWidth } = container;
			setShowLeftArrow(scrollLeft > 0);
			setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	const scroll = (direction) => {
		const container = scrollContainerRef.current;
		if (container) {
			const scrollAmount = 350;
			container.scrollBy({
				left: direction * scrollAmount,
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener("scroll", updateArrowVisibility);
			updateArrowVisibility(); // Initial check
		}
		return () => {
			if (container) {
				container.removeEventListener("scroll", updateArrowVisibility);
			}
		};
	}, []);

	const collections = [
		{
			id: 1,
			name: "Elegant Evening Gowns",
			description: "Timeless sophistication for formal occasions",
			image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
		},
		{
			id: 2,
			name: "Cocktail Dresses",
			description: "Perfect for semi-formal gatherings and events",
			image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop",
		},
		{
			id: 3,
			name: "Bridal Collection",
			description: "Dream dresses for your special day",
			image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=500&h=600&fit=crop",
		},
		{
			id: 4,
			name: "Summer Collection",
			description: "Light and airy designs for warm weather",
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
		},
		{
			id: 5,
			name: "Designer Series",
			description: "Exclusive pieces from renowned designers",
			image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop",
		},
		{
			id: 6,
			name: "Vintage Inspired",
			description: "Classic styles with modern elegance",
			image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=600&fit=crop",
		},
	];

	return (
		<div className="mb-28 px-4 md:px-12 lg:px-20">
			{/* Section Header */}
			<div className="text-center mb-16" data-aos="fade-up">
				<div className="inline-block mb-4">
					<span className="text-sm font-poppins font-medium text-gray-500 uppercase tracking-wider">
						Curated Selection
					</span>
				</div>
				<h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
					Signature Collections
				</h2>
				<div className="w-24 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
			</div>

			{/* Main Content */}
			<div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
				{/* Left Content - Featured Collection */}
				<div
					className="lg:w-2/5 w-full"
					data-aos="fade-right"
					data-aos-delay="100">
					<div className="sticky top-8 space-y-8">
						<div>
							<h3 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
								Premiere Evening Collection
							</h3>
							<p className="font-sans text-lg text-gray-600 leading-relaxed mb-6">
								Experience unparalleled elegance with our 2025 Premiere 
								Collection. Each piece is meticulously crafted with premium 
								fabrics and attention to detail, designed for those who 
								appreciate timeless sophistication.
							</p>
							<div className="space-y-3 mb-8">
								{["Premium silk & satin fabrics", "Hand-finished details", "Custom tailoring available", "Sustainable materials"].map((feature, index) => (
									<div key={index} className="flex items-center space-x-3">
										<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
										<span className="font-sans text-gray-700">{feature}</span>
									</div>
								))}
							</div>
						</div>
						<button className="group relative inline-flex items-center px-8 py-4 bg-[#8a459f] text-white font-sans font-medium text-lg rounded-lg hover:bg-[#8a459f]transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
							Explore Collection
							<Icon
								icon="heroicons:arrow-long-right-20-solid"
								className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
								width="1.25rem"
								height="1.25rem"
							/>
							<div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-lg transition-all duration-300"></div>
						</button>
					</div>
				</div>

				{/* Right Content - Scrollable Collections */}
				<div className="lg:w-3/5 w-full relative">
					<div className="relative">
						<div
							ref={scrollContainerRef}
							className="flex gap-6 lg:gap-8 overflow-x-auto scroll-smooth no-scrollbar pb-6"
							onScroll={updateArrowVisibility}>
							{collections.map((collection, index) => (
								<div
									key={collection.id}
									className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[380px] group cursor-pointer"
									data-aos="fade-left"
									data-aos-delay={index * 100}>
									{/* Image Container */}
									<div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 bg-gray-100">
										<img
											src={collection.image}
											alt={collection.name}
											className="w-full h-[400px] lg:h-[480px] object-cover transition-all duration-700 group-hover:scale-105"
										/>
										
										{/* Overlay on Hover */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
											<h4 className="font-serif text-2xl text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
												{collection.name}
											</h4>
											<p className="font-sans text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
												{collection.description}
											</p>
											<div className="flex items-center justify-between mt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
												<span className="font-sans text-white/90 text-lg font-medium">
													View Details
												</span>
												<Icon
													icon="heroicons:arrow-up-right-20-solid"
													className="text-white"
													width="1.5rem"
													height="1.5rem"
												/>
											</div>
										</div>

										{/* Collection Badge */}
										<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
											<span className="font-sans text-xs font-medium text-gray-900 uppercase tracking-wide">
												Collection
											</span>
										</div>
									</div>

									{/* Collection Info */}
									<div className="text-center px-2">
										<h4 className="font-serif text-xl text-gray-900 mb-2">
											{collection.name}
										</h4>
										<p className="font-sans text-gray-600 text-sm">
											{collection.description}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Navigation Arrows */}
						{showLeftArrow && (
							<button
								onClick={() => scroll(-1)}
								className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 hidden lg:flex items-center justify-center w-12 h-12">
								<Icon icon="heroicons:chevron-left-20-solid" width="1.25rem" height="1.25rem" />
							</button>
						)}

						{showRightArrow && (
							<button
								onClick={() => scroll(1)}
								className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 hidden lg:flex items-center justify-center w-12 h-12">
								<Icon icon="heroicons:chevron-right-20-solid" width="1.25rem" height="1.25rem" />
							</button>
						)}
					</div>

					{/* Scroll Indicator */}
				
				</div>
			</div>
		</div>
	);
}