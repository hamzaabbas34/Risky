import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function Footer() {
	useEffect(() => {
		AOS.init({
			duration: 500, // Animation duration in milliseconds
			easing: "ease-in-out", // Easing function for smoothness
			once: true, // Animations will only happen once as you scroll down
		});
	}, []);

	return (
		<div className="w-100  bg-[#8a459f]  overflow-x-hidden">
			<div className="w-100 md:px-10 px-6 lg:px-16 grid lg:grid-cols-4 md:grid-cols-2 gap-5 grid-cols-1 border-b  ">
				<div
					className=" flex justify-center items-start text-white flex-col lg:px-10 md:px-4  md:py-2 lg:py-6"
					data-aos="fade-left">
					<h2 className="text-3xl font-lora  my-4">Let's get in Touch </h2>
					<p className="font-poppins text-[14px]  ">
						Sign up for our newsletter and get news about latest products and
						discounts
					</p>

					
				</div>
				<div
					data-aos="fade-left"
					className="  text-white font-Jost-Regular md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
					<h2 className="font-lora mb-2  font-medium text-[20px] ">
						Store links
					</h2>
					<p className="font-poppins ">
						<Link to="/">Home</Link>
					</p>
					<p className="font-poppins ">
						<Link to="/product">Prom</Link>
					</p>
					<p className="font-poppins ">
						<Link to="/product">Enchanted Bridal</Link>
					</p>
					<p className="font-poppins ">
						<Link to="/product">Enchanted Evening</Link>
					</p>
					<p className="font-poppins ">
						<Link to="/about">About Us</Link>
					</p>
					<p className="font-poppins ">
						<Link to="/contact</p>">Contact Us</Link>
					</p>
				</div>
				<div
					data-aos="fade-left"
					className=" text-white font-Jost-Regular md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
					<h2 className="font-lora mb-2  font-medium text-[20px] ">
						Other Brands
					</h2>
					<p className="font-poppins ">demo 1 </p>
					<p className="font-poppins ">demo 2</p>
					<p className="font-poppins ">demo 3</p>
				</div>
				<div
					data-aos="fade-left "
					className=" text-white  md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
					<h2 className="font-lora mb-2  font-medium text-[20px] ">
						Contact Us{" "}
					</h2>
					<p className="font-poppins ">Monisi@gmail.com</p>
					<p className="font-poppins ">+11 1234 5678 </p>
				</div>
			</div>
		</div>
	);
}
