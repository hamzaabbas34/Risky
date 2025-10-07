import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logo-1759675839376.png";

export default function Navbar() {
	const navigate = useNavigate();
	const [showSearch, setShowSearch] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);

	// ✅ Fetch local data.json
	useEffect(() => {
		fetch("/data.json")
			.then((res) => res.json())
			.then((data) => setData(data))
			.catch((err) => console.error("Error fetching data:", err));
	}, []);

	const filteredData = data.filter((item) =>
		item.heading.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			{/* NAVBAR */}
			<div className="fixed w-full top-0 z-50 bg-white border-b-2 border-gray-100">
				<div className="w-full flex justify-between items-center px-6 py-4">
					{/* Left: Logo */}
					<div
						className="cursor-pointer font-americana font-extrabold "
						onClick={() => navigate("/")}>
						<h2 className="text-4xl bg-gradient-to-r from-[#8a459f] via-[#c1b1c6] to-[#8a459f] bg-clip-text text-transparent">
							Risky
						</h2>
					</div>

					{/* Right: Icons */}
					<div className="flex items-center gap-4">
						{/* Search Icon */}
						<button onClick={() => setShowSearch(true)}>
							<Icon icon="mingcute:search-3-line" width="28" height="28" />
						</button>

						{/* User Icon */}
						<Icon icon="qlementine-icons:user-16" width="28" height="28" />

						{/* Hamburger Menu for Mobile */}
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

				{/* Desktop Menu */}
				<ul className="hidden lg:flex font-poppins items-center gap-6 lg:gap-10 px-8 text-gray-700 text-base py-3">
					<li>
						<Link
							to="/"
							className="hover:text-[#8a459f] transition-colors duration-200">
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/about"
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
				{/* Close Button */}
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
				<ul className="flex flex-col gap-4 p-6 font-poppins text-gray-700 text-lg">
					<li>
						<Link
							to="/"
							onClick={() => setShowMenu(false)}
							className="hover:text-[#8a459f] transition-colors duration-200">
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/about"
							onClick={() => setShowMenu(false)}
							className="hover:text-[#8a459f] transition-colors duration-200">
							Gowns
						</Link>
					</li>
					<li>
						<Link
							to="/about"
							onClick={() => setShowMenu(false)}
							className="hover:text-[#8a459f] transition-colors duration-200">
							About Us
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							onClick={() => setShowMenu(false)}
							className="hover:text-[#8a459f] transition-colors duration-200">
							Contact Us
						</Link>
					</li>
				</ul>
			</div>

			{/* Overlay for Sidebar */}
			{showMenu && (
				<div
					onClick={() => setShowMenu(false)}
					className="fixed inset-0 bg-black bg-opacity-40 z-[1000]"></div>
			)}

			{/* ✅ SEARCH MODAL (Your existing one) */}
			{showSearch && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center px-4">
					<div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
						{/* Close */}
						<button
							onClick={() => setShowSearch(false)}
							className="absolute top-3 right-3 text-gray-500 hover:text-[#8a459f] ">
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
								className="w-full px-3 py-1 outline-none text-gray-700"
							/>
						</div>

						{/* Filtered Results */}
						<div className="mt-4 max-h-64 overflow-y-auto">
							{search.length > 0 && filteredData.length > 0 ? (
								filteredData.map((item) => (
									<div
										key={item.id}
										className="flex items-center gap-3 border-b py-2 px-1 cursor-pointer hover:bg-gray-50 transition"
										onClick={() => {
											setShowSearch(false);
											navigate(`/product/${item.id}`);
										}}>
										<img
											src={item.images[0]}
											alt={item.heading}
											className="w-16 h-16 object-cover rounded"
										/>
										<div>
											<h3 className="font-semibold text-gray-800">
												{item.heading}
											</h3>
											<p className="text-sm text-gray-500">${item.price}</p>
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
