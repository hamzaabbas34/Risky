import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logo-1759675839376.png";

const DropdownMenu = ({ title, options, isMobile = false }) => {
	const [isOpen, setIsOpen] = useState(false);

	if (isMobile) {
		// ✅ Mobile version (collapsible)
		return (
			<li className="font-poppins font-medium text-[17px]">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex justify-between items-center w-full px-3 py-2 text-gray-800 hover:text-[#8a459f] transition-colors duration-200 uppercase tracking-wide">
					{title}
					<Icon
						icon={
							isOpen
								? "heroicons:chevron-up-20-solid"
								: "heroicons:chevron-down-20-solid"
						}
						className="ml-1 h-4 w-4 transition-transform"
					/>
				</button>

				{isOpen && (
					<ul className="pl-8 text-[15px]">
						{options.map((option, index) => (
							<li key={index}>
								<Link
									to={option.value}
									className="block py-2 hover:text-[#8a459f] transition-colors duration-200">
									{option.label}
								</Link>
							</li>
						))}
					</ul>
				)}
			</li>
		);
	}

	// ✅ Desktop version (hover)
	return (
		<li className="relative group font-poppins font-medium text-[16px]">
			<span className="flex items-center cursor-pointer py-2 px-3 text-gray-800 hover:text-[#8a459f] transition-colors duration-200 uppercase tracking-wide">
				{title}
				<Icon
					icon="heroicons:chevron-down-20-solid"
					className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
				/>
			</span>

			<div className="absolute left-1/2 -translate-x-1/2 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
				<div className="py-1">
					{options.map((option, index) => (
						<Link
							key={index}
							to={option.value}
							className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-[#8a459f] w-full text-center border-b border-gray-100 last:border-b-0 transition-colors duration-200">
							{option.label}
						</Link>
					))}
				</div>
			</div>
		</li>
	);
};

export default function Navbar({ data }) {
	const navigate = useNavigate();
	const [showSearch, setShowSearch] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [search, setSearch] = useState("");

	const promOptions = [
		{ label: "2025 Collection", value: "/prom/2025" },
		{ label: "2026 Collection", value: "/prom/2026" },
	];

	const filteredData = data.filter((item) =>
		item.style?.toLowerCase().includes(search?.toLowerCase())
	);

	return (
		<>
			{/* ✅ NAVBAR */}
			<div className="fixed w-full top-0 z-50 bg-white border-b-2 border-gray-100">
				<div className="w-full flex justify-between items-center px-6 pt-4 md:pb-0 pb-2">
					{/* Logo */}
					<div
						className="cursor-pointer font-americana font-extrabold"
						onClick={() => navigate("/")}>
						<h2 className="text-4xl bg-gradient-to-r from-[#8a459f] via-[#c1b1c6] to-[#8a459f] bg-clip-text text-transparent">
							Risky
							<span className="text-[8px] uppercase tracking-[3px] text-gray-600 mt-[-5px] block">
								Proudly Canadian
							</span>
						</h2>
					</div>

					{/* Icons */}
					<div className="flex items-center gap-4">
						{/* Search */}
						<button onClick={() => setShowSearch(true)}>
							<Icon icon="mingcute:search-3-line" width="28" height="28" />
						</button>

						{/* User */}
						<Icon icon="qlementine-icons:user-16" width="28" height="28" />

						{/* Hamburger */}
						<button
							onClick={() => setShowMenu(true)}
							className="lg:hidden block">
							<Icon
								icon="heroicons-outline:menu-alt-3"
								width="30"
								height="30"
							/>
						</button>
					</div>
				</div>

				{/* ✅ Desktop Menu */}
				<ul className="hidden lg:flex font-poppins items-center gap-8 px-8 text-black font-medium text-base py-3">
					<li>
						<Link
							to="/"
							className="hover:text-[#8a459f] transition-colors duration-200">
							Home
						</Link>
					</li>
					<DropdownMenu title="PROM" options={promOptions} />
					<li>
						<Link
							to="/about"
							className="hover:text-[#8a459f] transition-colors duration-200">
							About Us
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							className="hover:text-[#8a459f] transition-colors duration-200">
							Contact Us
						</Link>
					</li>
				</ul>
			</div>

			{/* ✅ SIDEBAR MENU (Mobile) */}
			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[1001] transform transition-transform duration-300 ${
					showMenu ? "translate-x-0" : "-translate-x-full"
				}`}>
				{/* Header */}
				<div className="flex justify-between items-center px-5 py-4 border-b">
					<img
						src={logoImage}
						alt="Monsini Logo"
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

				{/* Sidebar Links */}
				<ul className="flex flex-col gap-2 font-poppins text-black font-medium text-lg mt-2">
					<li>
						<Link
							to="/"
							onClick={() => setShowMenu(false)}
							className="block px-3 py-2 hover:text-[#8a459f] transition-colors duration-200">
							Home
						</Link>
					</li>

					{/* ✅ Mobile Dropdown */}
					<DropdownMenu title="PROM" options={promOptions} isMobile={true} />

					<li>
						<Link
							to="/about"
							onClick={() => setShowMenu(false)}
							className="block px-3 py-2 hover:text-[#8a459f] transition-colors duration-200">
							About Us
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							onClick={() => setShowMenu(false)}
							className="block px-3 py-2 hover:text-[#8a459f] transition-colors duration-200">
							Contact Us
						</Link>
					</li>
				</ul>
			</div>

			{/* Overlay */}
			{showMenu && (
				<div
					onClick={() => setShowMenu(false)}
					className="fixed inset-0 bg-black bg-opacity-40 z-[1000]"></div>
			)}

			{/* ✅ SEARCH MODAL */}
			{showSearch && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center px-4">
					<div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
						{/* Close */}
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

						{/* Filtered Results */}
						<div className="mt-4 max-h-64 overflow-y-auto">
							{search.length > 0 && filteredData.length > 0 ? (
								filteredData.map((item, index) => (
									<div
										key={index}
										className="flex items-center gap-3 border-b py-2 px-1 cursor-pointer hover:bg-gray-50 transition"
										onClick={() => {
											setShowSearch(false);
											navigate(`/product/${item.id}`);
										}}>
										<img
											src={item.images[0]}
											alt={item.style}
											className="w-16 h-16 object-cover rounded"
										/>
										<div>
											<h3 className="font-semibold text-gray-800">
												{item.style}
											</h3>
											<p className="text-sm text-gray-500">{item.price}</p>
										</div>
									</div>
								))
							) : search.length > 0 ? (
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
