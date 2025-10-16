import React, { useEffect } from "react";
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

	// Helper function to apply the transition classes

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
						Website Links
					</h2>
					<p className="font-poppins">
						<Link
							to="/"
							className="block py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-2">
							Home
						</Link>
					</p>

					{/* Prom Dropdown */}
					<p className="font-poppins">
						<Link
							to="/"
							className="block py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-2">
							Gowns
						</Link>
					</p>
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
					<p className=" border-[1px] border-white w-fit p-2 rounded-md">
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
	);
}
