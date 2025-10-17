import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import sizeChart from "../../assets/images/rs5-1-AR01zQ0x8Gc92gEv.avif"; // ✅ update this path as per your project

export default function Footer() {
	useEffect(() => {
		AOS.init({
			duration: 500,
			easing: "ease-in-out",
			once: true,
		});
	}, []);

	// Dropdown state
	const [openDropdown, setOpenDropdown] = useState(null);
	const [showSizeChart, setShowSizeChart] = useState(false);
	const [zoomed, setZoomed] = useState(false);
	const [isZoomActive, setIsZoomActive] = useState(false);
	const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

	const imageRef = useRef(null);

	// Toggle dropdown open/close
	const toggleDropdown = (menu) => {
		setOpenDropdown(openDropdown === menu ? null : menu);
	};

	// Handle zoom interactions
	const handleMouseMove = (e) => {
		if (!zoomed) {
			const rect = e.target.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;
			setZoomPosition({ x, y });
		}
	};

	const handleMouseEnter = () => setIsZoomActive(true);
	const handleMouseLeave = () => setIsZoomActive(false);

	const gownsOptions = [
		{ label: "2026 Collection", value: "/Gowns/2026" },
		// { label: "2025 Collection", value: "/Gowns/2025" },
		// { label: "Size Chart", value: "sizeChart" },
	];

	return (
		<>
			{/* ✅ FOOTER SECTION */}
			<div className="w-full bg-[#8a459f] overflow-x-hidden py-10 border-b">
				<div className="w-full md:px-10 px-6 lg:px-16 grid lg:grid-cols-4 md:grid-cols-2 gap-5">
					{/* Newsletter Section */}
					<div
						className="flex justify-center items-start text-white flex-col lg:px-10 md:px-4 md:py-2 lg:py-6"
						data-aos="fade-left">
						<h2 className="text-3xl font-lora my-4">Let's get in Touch</h2>
						<p className="font-poppins text-[14px]">
							Sign up for our newsletter and get news about latest products and
							discounts
						</p>
						<input
							type="text"
							placeholder="Enter Your Email Address..."
							className="text-white placeholder:text-white font-poppins px-3 w-full outline-none border-2 bg-inherit text-[16px] py-2 rounded-lg my-5 border-white hover:bg-white hover:bg-opacity-25 transition-all duration-300 focus:bg-white focus:bg-opacity-25"
						/>
					</div>

					{/* Website Links Section */}
					<div
						data-aos="fade-left"
						className="text-white font-Jost-Regular md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
						<h2 className="font-lora mb-2 font-medium text-[20px]">
							Website Links
						</h2>

						<Link
							to="/"
							className="block py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25">
							Home
						</Link>

						{/* Gowns Dropdown */}
						<div className="w-full">
							<button
								onClick={() => toggleDropdown("Gowns")}
								className="flex items-center justify-between w-full py-2 px-3 rounded hover:bg-white hover:bg-opacity-25 transition-all duration-300">
								<span className="font-poppins text-[15px]">Gowns</span>
								<Icon
									icon={
										openDropdown === "Gowns"
											? "akar-icons:chevron-up"
											: "akar-icons:chevron-down"
									}
									className="text-white"
								/>
							</button>

							{/* Dropdown Options */}
							{openDropdown === "Gowns" && (
								<ul className="ml-3 mt-2 flex flex-col gap-2">
									{gownsOptions.map((item, index) => (
										<li key={index}>
											{item.label === "Size Chart" ? (
												<button
													onClick={() => setShowSizeChart(true)}
													className="text-white text-[14px] hover:text-gray-300 transition-all">
													{item.label}
												</button>
											) : (
												<Link
													to={item.value}
													className="text-white text-[14px] hover:text-gray-300 transition-all">
													{item.label}
												</Link>
											)}
										</li>
									))}
								</ul>
							)}
						</div>
					</div>

					{/* Contact Links Section */}
					<div
						data-aos="fade-left"
						className="text-white font-Jost-Regular md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
						<h2 className="font-lora mb-2 font-medium text-[20px]">
							Contact Links
						</h2>
						<Link
							to="/about"
							className="block py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25">
							About Us
						</Link>
						<Link
							to="/contact"
							className="block py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25">
							Contact Us
						</Link>
						<p className="border-[1px] border-white w-fit p-2 rounded-md">
							<Link
								to="https://market.riskydress.com/"
								className="flex items-center gap-1 text-white hover:text-gray-300 transition">
								<Icon icon="qlementine-icons:user-16" width="20" height="20" />
								<span className="text-sm font-medium">RETAILER LOGIN</span>
							</Link>
						</p>
					</div>

					{/* Social Section */}
					<div
						data-aos="fade-left"
						className="text-white md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
						<h2 className="font-lora mb-2 font-medium text-[20px]">
							Social Links
						</h2>
						<p className="font-poppins hover:bg-white hover:bg-opacity-25 py-1 px-2 rounded transition-all duration-300 cursor-default">
							Info@RiskyDress.com
						</p>
						<p className="font-poppins hover:bg-white hover:bg-opacity-25 py-1 px-2 rounded transition-all duration-300 cursor-default">
							450-818-7078
						</p>
					</div>
				</div>
			</div>

			{/* ✅ SIZE CHART MODAL */}
			{showSizeChart && (
				<div className="fixed inset-0 h-screen bg-black bg-opacity-70 flex items-center justify-center z-[10000] p-4">
					<div className="absolute top-4 right-4  gap-3 z-10 flex justify-between items-center">
						{/* Zoom Button */}
						<button
							onClick={() => setZoomed((prev) => !prev)}
							className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition">
							<Icon
								icon={
									zoomed
										? "mdi:magnify-minus-outline"
										: "mdi:magnify-plus-outline"
								}
								className="w-7 h-7"
							/>
						</button>

						{/* Close Button */}
						<button
							onClick={() => {
								setShowSizeChart("");
								setZoomed(false);
								setIsZoomActive(false);
							}}
							className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition">
							<Icon icon="heroicons:x-mark-20-solid" className="w-7 h-7" />
						</button>
					</div>
					<div className="w-full bg-transparent  flex flex-col justify-center items-center gap-5 relative">
						{/* Top Buttons */}

						{/* Image Container */}
						<div
							className={`w-[100%] h-full max-h-[90vh] overflow-x-auto overflow-y-hidden flex justify-center ${
								zoomed ? "cursor-grab" : ""
							}`}>
							{/* Zoomable Image */}
							<div
								ref={imageRef}
								className="w-[70%]  max-h-[600px]  relative overflow-hidden rounded-2xl bg-gray-50"
								style={{}}
								onMouseMove={handleMouseMove}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}>
								{/* Main Image */}
								<img
									src="https://azuredress.com/static/media/sizechart.ea2456da397131b84a82.jpeg"
									alt={`${showSizeChart} Size Chart`}
									className={`transition-transform duration-300 w-full h-full object-contain px-5 ${
										zoomed ? "scale-110" : "scale-100"
									}`}
									style={{
										transformOrigin: "center center",
										minWidth: zoomed ? "130%" : "auto",
									}}
								/>

								{/* Zoom Overlay */}
								<div
									className="absolute inset-0 transition-opacity duration-300"
									style={{
										opacity: isZoomActive && !zoomed ? 1 : 0,
										backgroundImage: `url(https://azuredress.com/static/media/sizechart.ea2456da397131b84a82.jpeg)`,
										backgroundSize: "200%",
										backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
										pointerEvents: "none",
									}}
								/>
								<div
									className={`absolute bottom-4 right-4 bg-blue-600 text-white w-[50px] flex items-center justify-center px-0 py-[14px] rounded-full text-sm transition-all duration-300 ${
										isZoomActive && !zoomed ? "opacity-100" : "opacity-0"
									}`}>
									<Icon icon="iconamoon:zoom-in-light" width="20" height="20" />
								</div>
							</div>

							{/* Zoom Icon */}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
