import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";

import "aos/dist/aos.css";
import "./collection.css";

export default function Collections({ data }) {
	const scrollContainerRef = useRef(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		AOS.init({
			duration: 600,
			easing: "ease-in-out-cubic",
			once: true,
			offset: 50,
		});
	}, []);

	// 🔹 Check arrow visibility based on scroll position
	const updateArrowVisibility = () => {
		const container = scrollContainerRef.current;
		if (container) {
			const { scrollLeft, scrollWidth, clientWidth } = container;
			setShowLeftArrow(scrollLeft > 10);
			setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	// 🔹 Handle scroll direction
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

	// 🔹 Add scroll listener
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener("scroll", updateArrowVisibility);
			updateArrowVisibility(); // initial check
		}
		return () => {
			if (container) {
				container.removeEventListener("scroll", updateArrowVisibility);
			}
		};
	}, []);

	// 🔹 Recheck after images load (important!)
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (container) {
			const handleLoad = () => updateArrowVisibility();
			const images = container.querySelectorAll("img");
			images.forEach((img) => img.addEventListener("load", handleLoad));
			updateArrowVisibility();
			return () => {
				images.forEach((img) => img.removeEventListener("load", handleLoad));
			};
		}
	}, [data]);

	// Show more items so scrolling actually happens
	const collections = Array.isArray(data)
		? data
				// 1. FILTER: Keep only items where viewInfront is true
				.filter((item) => item.viewInfront === true)
				// 2. RANDOMIZE: Shuffle the filtered results
				.sort(() => 0.5 - Math.random())
				// 3. LIMIT: Take only the first 3 (or fewer if fewer are featured)
				.slice(0, 5)
		: [];

	return (
		<div className="mb-28 px-4 md:px-12 lg:px-20">
			{/* Section Header */}
			<div className="text-center mb-16" data-aos="fade-up">
				<h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
					Signature Collections
				</h2>
				<div className="w-24 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
			</div>

			{/* Main Layout */}
			<div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
				{/* Left Content */}
				<div
					className="lg:w-2/5 w-full"
					data-aos="fade-right"
					data-aos-delay="100">
					<div className="sticky top-8 space-y-8">
						<div>
							<h3 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
								Premiere Gowns Collection
							</h3>
							<p className="font-sans text-lg text-gray-600 leading-relaxed mb-6">
								Experience unparalleled elegance with our 2026 Premiere
								Collection. Each gown is meticulously crafted with premium
								fabrics and attention to detail, designed for those who
								appreciate timeless sophistication.
							</p>
							<div className="space-y-3 mb-8">
								{["Premium silk & satin fabrics", "Hand-finished details"].map(
									(feature, index) => (
										<div key={index} className="flex items-center space-x-3">
											<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
											<span className="font-sans text-gray-700">{feature}</span>
										</div>
									)
								)}
							</div>
						</div>

						<button
							onClick={() => navigate("/Gowns")}
							className="group relative inline-flex items-center px-8 py-4 bg-[#8a459f] text-white font-sans font-medium text-lg rounded-lg hover:bg-[#7a3b8d] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
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

				{/* Right Content - Scrollable Collection */}
				<div className="lg:w-3/5 w-full relative">
					<div className="relative">
						<div
							ref={scrollContainerRef}
							className="flex gap-6 lg:gap-8 overflow-x-auto scroll-smooth no-scrollbar pb-6"
							onScroll={updateArrowVisibility}>
							{collections.map((collection, index) => (
								<Link
									to={`/Gowns/2026`}
									state={{
										product: collection,
									}}
									key={collection.id || index}
									className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[380px]
									group cursor-pointer"
									data-aos="fade-left"
									data-aos-delay={index * 100}>
									{/* Image */}
									<div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 bg-gray-100">
										<img
											src={"https://admin.monsinidress.com/" + collection.images?.[0]}
											alt={collection.style}
											className="w-full h-[400px] lg:h-[480px] object-cover transition-all object-top  duration-700 group-hover:scale-105"
										/>

										{/* Overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
											<h4 className="font-serif text-2xl text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
												{collection.style}
											</h4>
											<p className="font-sans text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
												{collection.description || "Elegance redefined."}
											</p>
											<Link to={"/"}>
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
											</Link>
										</div>
									</div>
									{/* Info */}
									<div className="text-center px-2">
										<h4 className="font-serif text-xl text-gray-900 mb-2">
											{collection.name}
										</h4>
										<p className="font-sans text-gray-600 text-sm">
											{collection.description}
										</p>
									</div>
								</Link>
							))}
						</div>

						{/* Left Arrow */}
						{showLeftArrow && (
							<button
								onClick={() => scroll(-1)}
								className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center w-12 h-12">
								<Icon
									icon="heroicons:chevron-left-20-solid"
									width="1.25rem"
									height="1.25rem"
								/>
							</button>
						)}

						{/* Right Arrow */}
						{showRightArrow && (
							<button
								onClick={() => scroll(1)}
								className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center w-12 h-12">
								<Icon
									icon="heroicons:chevron-right-20-solid"
									width="1.25rem"
									height="1.25rem"
								/>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
