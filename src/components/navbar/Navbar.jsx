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
	const [isZoomActive, setIsZoomActive] = useState(false);
	const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
	const imageRef = useRef(null);

	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		fetch("/risky.json")
			.then((res) => res.json())
			.then((data) => setData(data.products))
			.catch((err) => console.error(err));
	}, []);

	const filteredData = data?.filter((item) =>
		item.style?.toLowerCase().includes(search?.toLowerCase())
	);

	const gownsOptions = [
		{ label: "2026 Collection", value: "/Gowns/2026" },
		// { label: "2025 Collection", value: "/Gowns/2025" },
		// { label: "Size Chart", value: "sizeChart" },
	];

	// Zoom Handlers
	const handleMouseMove = (e) => {
		if (!zoomed && imageRef.current) {
			const rect = imageRef.current.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;
			setZoomPosition({ x, y });
		}
	};
	const handleMouseEnter = () => setIsZoomActive(true);
	const handleMouseLeave = () => setIsZoomActive(false);

	const toggleDropdown = (menu) =>
		setOpenDropdown(openDropdown === menu ? null : menu);

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

					{/* Dropdown */}
					<DropdownMenu
						title="Gowns"
						options={gownsOptions}
						onSizeChartClick={(section) => setShowSizeChart(section)}
					/>

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

					{/* Gowns Dropdown */}
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
													setShowSizeChart(item.label);
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
								onMouseMove={handleMouseMove}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								style={{
									width: zoomed ? "200%" : "100%",
									height: zoomed ? "auto" : "500px",
									transition: "all 0.3s ease",
								}}>
								<img
									src={sizeChart}
									alt="Size Chart"
									className="w-full h-full object-contain"
								/>
								{!zoomed && (
									<div
										className="absolute inset-0 transition-opacity duration-300"
										style={{
											opacity: isZoomActive ? 1 : 0,
											backgroundImage: `url(${sizeChart})`,
											backgroundSize: "200%",
											backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
											pointerEvents: "none",
										}}
									/>
								)}
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
													url: `https://demo.riskydress.com/images/${item.year}/Risky/`,
												},
											});
										}}>
										<img
											src={`https://demo.riskydress.com/images/${item.year}/Risky/${item.images?.[0]}`}
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
