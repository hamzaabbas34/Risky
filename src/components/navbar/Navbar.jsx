import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logo-1759675839376.png";

export default function Navbar({ data }) {
	const navigate = useNavigate();
	const [showSearch, setShowSearch] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [search, setSearch] = useState("");

	const filteredData = data?.filter((item) =>
		item.style?.toLowerCase().includes(search?.toLowerCase())
	);

	return (
		<>
			{/* ✅ NAVBAR */}
			<div className="fixed w-full top-0 z-50 bg-white border-b-2 border-gray-100">
				<div
					className={`flex justify-between items-center bg-[#8a459f] w-full px-5 py-3 transition-all duration-500 `}>
					{/* ✅ Mobile Menu Icon */}
					<button
						onClick={() => setShowMenu(true)}
						className="text-white hover:text-gray-300 transition lg:hidden">
						<Icon icon="mdi:menu" width="28" height="28" />
					</button>

					{/* Social Media Icons */}
					<div className="hidden md:flex gap-3 items-center">
						<Icon
							icon="akar-icons:facebook-fill"
							width="20"
							height="20"
							className="text-white hover:text-gray-300 transition"
						/>
						<Icon
							icon="ri:instagram-fill"
							width="22"
							height="22"
							className="text-white hover:text-gray-300 transition"
						/>
						<Icon
							icon="iconoir:tiktok-solid"
							width="22"
							height="22"
							className="text-white hover:text-gray-300 transition"
						/>
					</div>

					{/* User Actions */}
					<div className="flex items-center gap-3">
						<Link
							to="https://market.riskydress.com/"
							className="flex items-center gap-1 text-white hover:text-gray-300 transition">
							<Icon icon="qlementine-icons:user-16" width="20" height="20" />
							<span className="text-sm font-medium">RETAILER LOGIN</span>
						</Link>

						<button
							onClick={() => setShowSearch(true)}
							className="text-white hover:text-gray-300 transition md:block hidden">
							<Icon icon="bx:search-alt" width="24" height="24" />
						</button>
					</div>
				</div>

				{/* ✅ Logo Section */}
				<div className="w-full flex justify-center items-center px-6 pt-4 md:pb-0 pb-2">
					<div
						className="cursor-pointer font-americana font-extrabold"
						onClick={() => navigate("/")}>
						<h2 className="text-4xl text-center bg-gradient-to-r from-[#8a459f] via-[#c1b1c6] to-[#8a459f] bg-clip-text text-transparent">
							Risky
							<span className="text-[8px] uppercase tracking-[3px] text-gray-600 mt-[-5px] block">
								Proudly Canadian
							</span>
						</h2>
					</div>
				</div>

				{/* ✅ Desktop Menu */}
				<ul className="hidden lg:flex font-poppins items-center justify-center gap-8 px-8 text-black font-medium text-base py-3">
					<li>
						<Link
							to="/"
							className="hover:text-[#8a459f] transition-colors duration-200">
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="hover:text-[#8a459f] transition-colors duration-200">
							Gowns
						</Link>
					</li>
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
					<li>
						<Link
							to="/"
							onClick={() => setShowMenu(false)}
							className="block px-3 py-2 hover:text-[#8a459f] transition-colors duration-200">
							Gowns
						</Link>
					</li>
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
