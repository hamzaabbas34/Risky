import { Icon } from "@iconify/react";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logo-1759675839376.png";
import sizeChart from "../../assets/images/rs5-1-AR01zQ0x8Gc92gEv.avif";

const DropdownMenu = ({ title, options, onSizeChartClick }) => {
	return (
		<li className="relative group font-poppins font-medium text-[15px]">
			<span className="flex items-center cursor-pointer py-2 px-3 text-black hover:text-[#8a459f] transition-colors duration-200 uppercase tracking-wide">
				{title}
				<Icon
					icon="heroicons:chevron-down-20-solid"
					className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
				/>
			</span>

			{/* Dropdown List */}
			<div className="absolute left-1/2 -translate-x-1/2 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
				<div className="py-1">
					{options.map((option, index) =>
						option.label === "Size Chart" ? (
							<button
								key={index}
								onClick={() => onSizeChartClick(title)}
								className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#8a459f] w-full text-center border-b border-gray-100 last:border-b-0 transition">
								{option.label}
							</button>
						) : (
							<Link
								key={index}
								to={option.value}
								className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#8a459f] w-full text-center border-b border-gray-100 last:border-b-0 transition">
								{option.label}
							</Link>
						)
					)}
				</div>
			</div>
		</li>
	);
};

export default function Navbar() {
	const navigate = useNavigate();
	const [showSearch, setShowSearch] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(null);
	const [showSizeChart, setShowSizeChart] = useState("");
	const [zoomed, setZoomed] = useState(false);
	const imageRef = useRef(null);

	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);
	const [navbarData, setNavbarData] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch navbar data with POST request
	useEffect(() => {
		const fetchNavbarData = async () => {
			try {
				const apiUrl = `https://admin.monsinidress.com/api/products/navbar`;
				console.log("Fetching navbar data from:", apiUrl);

				const response = await fetch(apiUrl, {
					method: "POST", // Changed to POST
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ brand: "Risky" }), // Added request body
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = await response.json();
				console.log("Navbar API Response:", result);
				setNavbarData(result.data);
			} catch (error) {
				console.error("Error fetching navbar data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchNavbarData();
	}, []);

	// Fetch products data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl = `https://admin.monsinidress.com/api/products/brand`;
				console.log("Fetching products from:", apiUrl);

				const response = await fetch(apiUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ brand: "Risky" }),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				console.log("Products API Response:", data);
				setData(data.data.products);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Generate dynamic options from navbar data
	const generateDropdownOptions = (category) => {
		if (!navbarData || !navbarData[category]) return [];

		const categoryData = navbarData[category];
		const years = categoryData.years || [];
		const sortedYears = [...years].sort((a, b) => b - a);

		const options = sortedYears.map((year) => ({
			label: `${year} Collection`,
			value: `/${category.toLowerCase()}/${year}`,
		}));

		// Add Size Chart option
		options.push({
			label: "Size Chart",
			value: "sizeChart",
		});

		return options;
	};

	// Get size chart image - dynamic from API or fallback to static
	const getSizeChartImage = (category) => {
		if (!navbarData || !navbarData[category]) {
			return sizeChart; // Fallback to static image
		}

		const categoryData = navbarData[category];
		const sizeChartImage = categoryData.sizeChartImage;

		// If API returns a valid size chart image, use it
		if (sizeChartImage) {
			return `https://admin.monsinidress.com/${sizeChartImage}`;
		}

		// Fallback to static image if no size chart from API
		return sizeChart;
	};

	const filteredData = data?.filter((item) =>
		item.style?.toLowerCase().includes(search?.toLowerCase())
	);

	// Generate options for Gowns category
	const gownsOptions = generateDropdownOptions("Gowns");

	// Zoom Handlers

	const toggleDropdown = (menu) =>
		setOpenDropdown(openDropdown === menu ? null : menu);

	if (loading)
		return (
			<div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
				{/* Spinning Icon */}
				<Icon
					icon="svg-spinners:ring-resize"
					className="w-16 h-16 text-purple-700 animate-spin-slow"
				/>

				{/* Loading Text */}
				<div className="text-xl font-semibold text-gray-700 mt-4 font-poppins">
					Loading Risky
				</div>
			</div>
		);
	return (
		<>
			{/* ✅ NAVBAR */}
			<div className="fixed w-full top-0 z-50 bg-white border-b border-gray-100">
				<div className="flex justify-between items-center bg-[#8a459f] px-5 py-3">
					{/* Mobile Menu Button */}
					<button
						onClick={() => setShowMenu(true)}
						className="text-white hover:text-gray-300 transition lg:hidden">
						<Icon icon="mdi:menu" width="28" height="28" />
					</button>

					{/* Instagram */}
					<Link
						to="https://www.instagram.com/riskydress?igsh=MXhhdXF1aHk0Z3ZmcA=="
						className="hidden md:flex gap-3 items-center">
						<Icon
							icon="mingcute:instagram-fill"
							width="25"
							height="25"
							color="white"
						/>
					</Link>

					{/* Search Button */}
					<button
						onClick={() => setShowSearch(true)}
						className="text-white hover:text-gray-300 transition md:block">
						<Icon icon="bx:search-alt" width="24" height="24" />
					</button>
				</div>

				{/* Logo */}
				<div className="w-full flex justify-center items-center py-3">
					<img
						src={logoImage}
						alt="Risky Logo"
						className="h-14 w-auto cursor-pointer"
						onClick={() => navigate("/")}
					/>
				</div>

				{/* Desktop Menu */}
				<ul className="hidden lg:flex font-poppins items-center justify-center gap-8 px-8 text-black font-medium text-base py-3">
					<li>
						<Link to="/" className="hover:text-[#8a459f]">
							Home
						</Link>
					</li>

					{/* Dropdown - Only show if there are options */}
					{gownsOptions.length > 0 && (
						<DropdownMenu
							title="Gowns"
							options={gownsOptions}
							onSizeChartClick={(section) => setShowSizeChart(section)}
						/>
					)}

					<li>
						<Link to="/about" className="hover:text-[#8a459f]">
							About Us
						</Link>
					</li>
					<li>
						<Link to="/contact" className="hover:text-[#8a459f]">
							Contact Us
						</Link>
					</li>

					<li className="text-[#8a459f] hover:text-white bg-white hover:bg-[#8a459f] border-2 border-[#8a459f] px-3 py-2 rounded-md transition-all duration-300">
						<Link to="https://market.riskydress.com/">
							<span className="text-sm font-medium">RETAILER LOGIN</span>
						</Link>
					</li>
				</ul>
			</div>

			{/* ✅ MOBILE SIDEBAR */}
			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[1001] transform transition-transform duration-300 ${
					showMenu ? "translate-x-0" : "-translate-x-full"
				}`}>
				<div className="flex justify-between items-center px-5 py-4 border-b">
					<img
						src={logoImage}
						alt="Logo"
						className="w-[100px] cursor-pointer"
						onClick={() => {
							setShowMenu(false);
							navigate("/");
						}}
					/>
					<button onClick={() => setShowMenu(false)}>
						<Icon icon="mdi:close" width="26" height="26" />
					</button>
				</div>

				<ul className="flex flex-col gap-1 font-poppins text-black font-medium text-lg mt-2">
					<li>
						<Link
							to="/"
							onClick={() => setShowMenu(false)}
							className="block px-3 py-2 hover:text-[#8a459f]">
							Home
						</Link>
					</li>

					{/* Gowns Dropdown - Only show if there are options */}
					{gownsOptions.length > 0 && (
						<li>
							<button
								onClick={() => toggleDropdown("Gowns")}
								className="flex items-center justify-between w-full px-3 py-2 hover:text-[#8a459f]">
								<span>Gowns</span>
								<Icon
									icon={
										openDropdown === "Gowns"
											? "akar-icons:chevron-up"
											: "akar-icons:chevron-down"
									}
								/>
							</button>
							{openDropdown === "Gowns" && (
								<ul className="ml-4 mt-1 flex flex-col gap-2 text-[15px]">
									{gownsOptions.map((item, index) => (
										<li key={index}>
											{item.label === "Size Chart" ? (
												<button
													onClick={() => {
														setShowSizeChart("Gowns");
														setShowMenu(false);
													}}
													className="w-full text-left hover:text-[#8a459f]">
													{item.label}
												</button>
											) : (
												<Link
													to={item.value}
													onClick={() => setShowMenu(false)}
													className="hover:text-[#8a459f] block">
													{item.label}
												</Link>
											)}
										</li>
									))}
								</ul>
							)}
						</li>
					)}

					<li>
						<Link
							to="/about"
							onClick={() => setShowMenu(false)}
							className="block px-3 py-2 hover:text-[#8a459f]">
							About Us
						</Link>
					</li>

					<li>
						<Link
							to="/contact"
							onClick={() => setShowMenu(false)}
							className="block px-3 py-2 hover:text-[#8a459f]">
							Contact Us
						</Link>
					</li>

					<Link
						to="https://market.riskydress.com/"
						className="flex items-center gap-1 bg-[#8a459f] text-white px-3 py-3 hover:bg-[#7a3c8d] mt-3">
						<span className="font-medium">RETAILER LOGIN</span>
					</Link>
				</ul>
			</div>

			{/* Sidebar Overlay */}
			{showMenu && (
				<div
					onClick={() => setShowMenu(false)}
					className="fixed inset-0 bg-black bg-opacity-40 z-[1000]"></div>
			)}

			{/* ✅ SIZE CHART MODAL */}
			{showSizeChart && (
				<div className="fixed inset-0 h-screen bg-black bg-opacity-70 flex items-center justify-center z-[1200] p-4">
					{/* Close */}
					<button
						onClick={() => setShowSizeChart("")}
						className="absolute top-3 right-3 text-gray-200 hover:text-blue-600 transition z-10">
						<Icon icon="heroicons:x-mark-20-solid" className="w-7 h-7" />
					</button>

					{/* Zoom Toggle */}
					<button
						onClick={() => setZoomed((prev) => !prev)}
						className="absolute top-3 left-3 text-gray-200 hover:text-blue-600 transition z-10">
						<Icon
							icon={
								zoomed
									? "mdi:magnify-minus-outline"
									: "mdi:magnify-plus-outline"
							}
							className="w-7 h-7"
						/>
					</button>

					<div className="bg-transparent w-full flex flex-col justify-center items-center gap-5 relative">
						<div
							className={`w-full h-full max-h-[90vh] overflow-auto flex justify-center items-start ${
								zoomed ? "cursor-grab" : ""
							}`}>
							<div
								ref={imageRef}
								className="relative overflow-hidden rounded-2xl bg-gray-50"
								style={{
									width: zoomed ? "200%" : "100%",
									height: zoomed ? "auto" : "500px",
									transition: "all 0.3s ease",
								}}>
								<img
									src={getSizeChartImage(showSizeChart)}
									alt="Size Chart"
									className="w-full h-full object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* ✅ SEARCH MODAL */}
			{showSearch && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center px-4">
					<div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
						<button
							onClick={() => setShowSearch(false)}
							className="absolute top-3 right-3 text-gray-500 hover:text-[#8a459f]">
							<Icon icon="mdi:close" width="26" height="26" />
						</button>

						<h2 className="text-2xl font-poppins font-semibold text-gray-800 mb-4 text-center">
							Search Products
						</h2>

						<div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
							<Icon
								icon="mingcute:search-3-line"
								width="24"
								height="24"
								className="text-gray-500"
							/>
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Type to search..."
								className="w-full px-3 py-1 outline-none text-black font-medium"
							/>
						</div>

						<div className="mt-4 max-h-64 overflow-y-auto">
							{search?.length > 0 && filteredData?.length > 0 ? (
								filteredData.map((item, index) => (
									<div
										key={index}
										className="flex items-center gap-3 border-b py-2 px-1 cursor-pointer hover:bg-gray-50 transition"
										onClick={() => {
											setShowSearch(false);
											navigate(`/Gowns/id/${item.style}`, {
												state: {
													product: item,
										
												},
											});
										}}>
										<img
											src={`https://admin.monsinidress.com/${item.images?.[0]}`}
											alt={item.style}
											className="w-16 h-16 object-cover object-top rounded"
										/>
										<div>
											<h3 className="font-semibold text-gray-800">
												{item.style}
											</h3>
											<p className="text-sm text-gray-500">{item.price}</p>
										</div>
									</div>
								))
							) : search?.length > 0 ? (
								<p className="text-center text-gray-500 mt-4">
									No results found
								</p>
							) : (
								<p className="text-center text-gray-400 mt-4 text-sm">
									Start typing to search products...
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
