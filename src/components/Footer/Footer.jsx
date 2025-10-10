import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Footer() {
	useEffect(() => {
		AOS.init({
			duration: 500,
			easing: "ease-in-out",
			once: true,
		});
	}, []);

	const [openMenu, setOpenMenu] = useState(null);

	const toggleMenu = (menu) => {
		setOpenMenu(openMenu === menu ? null : menu);
	};

	const promOptions = [
		{ label: "2025 Collection", value: "/prom/2025" },
		{ label: "2026 Collection", value: "/prom/2026" },
	];

	// Helper function to apply the transition classes
	const getDropdownClasses = (menuName) => {
		// Base classes for transition and hidden content
		const baseClasses =
			"ml-4 mt-2 flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out";

		// Determine the max-height based on the open state
		// A reasonable max-height is needed for the slide effect
		const isOpen = openMenu === menuName;
		const heightClass = isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0";

		return `${baseClasses} ${heightClass}`;
	};

	return (
		<div className="w-full bg-[#8a459f] overflow-x-hidden py-10 border-b">
			<div className="w-full md:px-10 px-6 lg:px-16 grid lg:grid-cols-4 md:grid-cols-2 gap-5 ">
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

				{/* Store Links Section */}
				<div
					data-aos="fade-left"
					className="text-white font-Jost-Regular md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
					<h2 className="font-lora mb-2 font-medium text-[20px]">
						Store Links
					</h2>
					<p className="font-poppins">
						<Link
							to="/"
							className="block py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-2">
							Home
						</Link>
					</p>

					{/* Prom Dropdown */}
					<div className="font-poppins">
						<button
							onClick={() => toggleMenu("prom")}
							className="flex justify-between items-center w-full py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-2">
							Prom{" "}
							<span>
								{openMenu === "prom" ? (
									<Icon icon="ep:arrow-up" width="20" height="20" />
								) : (
									<Icon icon="ep:arrow-down" width="20" height="20" />
								)}
							</span>
						</button>
						{/* --- Changed Section for Transition --- */}
						<div className={getDropdownClasses("prom")}>
							{promOptions.map((item) => (
								<Link
									key={item.value}
									to={item.value}
									className="py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-3">
									{item.label}
								</Link>
							))}
						</div>
						{/* --- End Changed Section --- */}
					</div>
				</div>

				{/* Contact Section */}
				<div
					data-aos="fade-left"
					className="text-white font-Jost-Regular md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
					<h2 className="font-lora mb-2 font-medium text-[20px]">
						Contact Links
					</h2>
					<p className="font-poppins">
						<Link
							to="/about"
							className="block py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-2">
							About Us
						</Link>
					</p>
					<p className="font-poppins">
						<Link
							to="/contact"
							className="block py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-2">
							Contact Us
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
						Risky@gmail.com
					</p>
					<p className="font-poppins hover:bg-white hover:bg-opacity-25 py-1 px-2 rounded transition-all duration-300 cursor-default">
						+11 1234 5678
					</p>
				</div>
			</div>
		</div>
	);
}
