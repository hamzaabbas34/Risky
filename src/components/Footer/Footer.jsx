import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { X, ChevronUp, ChevronDown, ZoomIn, ZoomOut, Mail } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { Icon } from "@iconify/react";

export default function Footer() {
	const [openMenu, setOpenMenu] = useState(null);
	const [showSizeChart, setShowSizeChart] = useState("");
	const [zoomed, setZoomed] = useState(false);
	const [footerData, setFooterData] = useState({});
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [subscribeMessage, setSubscribeMessage] = useState(null);
	const [capVal, setCapVal] = useState(null);
	const [status, setStatus] = useState(null);
	const [showRecaptcha, setShowRecaptcha] = useState(false);

	const imageRef = useRef(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`https://admin.monsinidress.com/api/products/navbar`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ brand: "Risky" }),
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}
				const productsData = await response.json();

				const rawData = productsData.data || {};
				const formattedData = {};
				Object.keys(rawData).forEach((category) => {
					const categoryData = rawData[category];
					const years = categoryData?.years || [];
					const sizeChartImage = categoryData?.sizeChartImage || null;
					const sortedYears = [...years].sort((a, b) => b - a);
					formattedData[category] = {
						years: sortedYears,
						sizeChartImage: sizeChartImage,
					};
				});

				setFooterData(formattedData);
			} catch (err) {
				console.error("Error fetching footer data:", err);
				setFooterData({});
			}
		};

		fetchProducts();
	}, []);

	const toggleMenu = (menu) => {
		setOpenMenu(openMenu === menu ? null : menu);
	};

	const handleSizeChart = (category) => setShowSizeChart(category);

	const getSizeChartImage = (category) => {
		if (!footerData[category]) {
			// Fallback to static image if no data
			return "https://azuredress.com/static/media/sizechart.ea2456da397131b84a82.jpeg";
		}

		const sizeChartImage = footerData[category].sizeChartImage;

		// If API returns a valid size chart image, use it
		if (sizeChartImage) {
			return `https://admin.monsinidress.com/${sizeChartImage}`;
		}

		// Fallback to static image
		return "https://azuredress.com/static/media/sizechart.ea2456da397131b84a82.jpeg";
	};

	const getDropdownClasses = (menuName) => {
		const baseClasses =
			"ml-4 mt-2 flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out";
		const isOpen = openMenu === menuName;
		const heightClass = isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0";
		return `${baseClasses} ${heightClass}`;
	};

	// Helper function to generate route path
	const getCategoryRoute = (categoryName, year) => {
		const routeMap = {
			Gowns: "gowns",
			Prom: "prom",
			Bridal: "bridal",
			Evening: "evening",
		};

		const baseRoute = routeMap[categoryName] || categoryName.toLowerCase();
		return `/${baseRoute}/${year}`;
	};

	const handleSubscribe = async () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		setEmailError("");
		setSubscribeMessage(null);
		setStatus(null);

		if (!email) {
			setEmailError("Email is required");
			return;
		} else if (!emailRegex.test(email)) {
			setEmailError("Please enter a valid email address");
			return;
		}

		if (!showRecaptcha) {
			setShowRecaptcha(true);
			return;
		}

		if (!capVal) {
			setStatus("recaptcha-error");
			return;
		}

		try {
			const payload = {
				brandName: "Risky",
				email: email,
			};

			const response = await fetch(
				`https://admin.monsinidress.com/api/subscriber`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				}
			);

			if (!response.ok) {
				console.log(response);
				const errorData = await response
					.json()
					.catch(() => ({ message: "Subscription failed." }));
				throw new Error(
					errorData.message || "Subscription failed. Please try again."
				);
			}

			setEmailError("");
			setSubscribeMessage("Thank you for subscribing! Check your inbox.");
			setEmail("");
			setCapVal(null);
			setShowRecaptcha(false);
			setStatus(null);
			setTimeout(() => setSubscribeMessage(null), 4000);
		} catch (error) {
			console.error("Subscription API Error:", error);
			setSubscribeMessage(
				error.message || "An unknown error occurred during subscription."
			);
			setTimeout(() => setSubscribeMessage(null), 5000);
		}
	};

	// Zoom handlers for size chart
	const handleMouseMove = (e) => {
		if (!imageRef.current || !zoomed) return;
	};

	const handleMouseEnter = () => {};
	const handleMouseLeave = () => {};

	return (
		<>
			{/* 🧭 SIZE CHART MODAL */}
			{showSizeChart && (
				<div className="fixed inset-0 h-screen bg-black bg-opacity-70 flex items-center justify-center z-[1200] p-4">
					<div className="absolute top-3 right-3 z-[1201]">
						<button
							onClick={() => setShowSizeChart("")}
							className="text-gray-200 hover:text-pink-500 transition">
							<X className="w-7 h-7" />
						</button>
					</div>
					<div className="absolute top-3 left-3 z-[1201]">
						<button
							onClick={() => setZoomed((prev) => !prev)}
							className="text-gray-200 hover:text-pink-500 transition">
							{zoomed ? (
								<ZoomOut className="w-7 h-7" />
							) : (
								<ZoomIn className="w-7 h-7" />
							)}
						</button>
					</div>

					<div className="bg-transparent w-full flex flex-col justify-center items-center gap-5 relative">
						<div
							className={`w-full h-full max-h-[90vh] overflow-hidden flex justify-center ${
								zoomed ? "cursor-grab" : ""
							}`}>
							<div
								ref={imageRef}
								className="relative overflow-hidden rounded-2xl bg-gray-50 max-w-full"
								style={{
									cursor: zoomed ? "zoom-in" : "default",
								}}
								onMouseMove={handleMouseMove}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}>
								<img
									src={getSizeChartImage(showSizeChart)}
									alt={`${showSizeChart} Size Chart`}
									className={`transition-transform duration-300 w-full object-contain md:w-[800px]`}
									style={{
										transform: zoomed ? `scale(2)` : `scale(1)`,
									}}
									onError={(e) => {
										console.error(
											`Failed to load image for ${showSizeChart}:`,
											getSizeChartImage(showSizeChart)
										);
										// Fallback to default image on error
										e.target.src =
											"https://azuredress.com/static/media/sizechart.ea2456da397131b84a82.jpeg";
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Custom Subscription Message */}
			{subscribeMessage && (
				<div
					className={`fixed bottom-4 right-4 text-white p-3 rounded-lg shadow-xl z-[1202] flex items-center gap-2 ${
						subscribeMessage.includes("failed") ? "bg-red-600" : "bg-green-500"
					}`}>
					<Mail className="w-5 h-5" />
					{subscribeMessage}
				</div>
			)}

			{/* FOOTER */}
			<div className="w-full bg-[#8a459f] overflow-x-hidden">
				<div className="w-full md:px-10 px-6 lg:px-16 grid lg:grid-cols-4 md:grid-cols-2 gap-5 border-b">
					{/* Newsletter */}
					<div className="flex justify-center items-start text-white flex-col lg:px-10 md:px-4 md:py-2 lg:py-6">
						<h2 className="text-3xl font-lora my-4">Let's get in Touch</h2>
						<p className="font-poppins text-[14px]">
							Sign up for our newsletter and get news about latest products and
							discounts
						</p>

						<input
							type="text"
							placeholder="Enter Your Email Address..."
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="text-white placeholder:text-white font-poppins px-3 w-full outline-none border-2 bg-inherit text-[16px] py-2 rounded-lg my-2 border-white hover:bg-white hover:bg-opacity-25 transition-all duration-300 focus:bg-white focus:bg-opacity-25"
						/>
						{emailError && (
							<p className="text-white text-sm bg-red-600 p-1 rounded mt-1">
								{emailError}
							</p>
						)}

						{/* CORRECTED: ReCAPTCHA Integration */}
						{showRecaptcha && (
							<div>
								<ReCAPTCHA
									sitekey="6LcE6gEsAAAAAMZBpBWTb1_BU5nzgx0vhQApk5tp"
									onChange={(val) => setCapVal(val)}
								/>
								{status === "recaptcha-error" && (
									<p className="mt-2 text-sm text-red-600 font-medium">
										Please complete the reCAPTCHA verification
									</p>
								)}
							</div>
						)}

						<button
							onClick={handleSubscribe}
							className="mt-4 bg-white text-[#1f4c94] font-semibold py-1.5 px-4 rounded hover:bg-opacity-90 transition w-full">
							{showRecaptcha ? "Complete Subscription" : "Subscribe"}
						</button>
					</div>

					{/* Dynamic Dropdowns */}
					<div className="text-white font-Jost-Regular md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
						<h2 className="font-lora mb-2 font-medium text-[20px]">
							Collections
						</h2>

						{Object.keys(footerData).length === 0 ? (
							// Default Fallback: Show 'Gowns' dropdown with Size Chart button
							<div key="gowns-default" className="font-poppins">
								<button
									onClick={() => toggleMenu("gowns")}
									className="flex justify-between items-center w-full py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-2">
									<span>Gowns</span>
									<span>
										{openMenu === "gowns" ? <ChevronUp /> : <ChevronDown />}
									</span>
								</button>
								<div className={getDropdownClasses("gowns")}>
									{/* Always show Size Chart button */}
									<button
										onClick={() => handleSizeChart("Gowns")}
										className="py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-3 w-full text-left">
										Size Chart
									</button>
								</div>
							</div>
						) : (
							// Original Logic: Map through footerData
							Object.keys(footerData).map((cleanCategoryName) => {
								const menuKey = cleanCategoryName
									.replace(/\s+/g, "")
									.toLowerCase();
								const yearsList = footerData[cleanCategoryName].years;
								const hasYears = yearsList && yearsList.length > 0;

								return (
									<div key={cleanCategoryName} className="font-poppins">
										<button
											onClick={() => toggleMenu(menuKey)}
											className="flex justify-between items-center w-full py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-2">
											<span>{cleanCategoryName}</span>
											<span>
												{openMenu === menuKey ? <ChevronUp /> : <ChevronDown />}
											</span>
										</button>
										<div className={getDropdownClasses(menuKey)}>
											{/* Show years only if they exist */}
											{hasYears &&
												yearsList.map((year) => (
													<Link
														key={year}
														to={getCategoryRoute(cleanCategoryName, year)}
														className="py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-3 block">
														{year} Collection
													</Link>
												))}
											{/* Always show Size Chart button */}
											<button
												onClick={() => handleSizeChart(cleanCategoryName)}
												className="py-1 px-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-25 hover:px-3 w-full text-left">
												Size Chart
											</button>
										</div>
									</div>
								);
							})
						)}
					</div>

					{/* Contact Section */}
					<div className="text-white font-Jost-Regular md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
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
						<p className=" border-[1px] border-white rounded-md w-fit p-2">
							<Link
								to="https://market.riskydress.com/"
								className="flex items-center gap-1 text-white hover:text-gray-300 transition">
								<Icon icon="qlementine-icons:user-16" width="20" height="20" />
								<span className="text-sm font-medium">RETAILER LOGIN</span>
							</Link>
						</p>
					</div>

					{/* Social Section */}
					<div className="text-white md:px-5 lg:px-5 flex flex-col gap-2 py-6 md:py-10 lg:py-14">
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
		</>
	);
}
