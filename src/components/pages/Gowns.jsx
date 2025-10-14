import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

// Define items per page
const ITEMS_PER_PAGE = 12; // You can adjust this number

export default function Gowns() {
	const [data, setData] = useState({ products: [] }); // Initialize as object with products array
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	// NEW STATE for pagination
	const [currentPage, setCurrentPage] = useState(1);

	const PRIMARY_COLOR = "#8a459f";
	const HOVER_COLOR = "rgb(219 39 119 / 0.8)";

	// --- Data Fetching Logic (Kept as is) ---
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				// Reset currentPage on new year fetch
				setCurrentPage(1);
				const response = await fetch(`/risky.json`);
				if (!response.ok) throw new Error("Failed to fetch data");
				const result = await response.json();
				setData(result);
				console.log("Fetched data:", result);
			} catch (err) {
				setError(err.message);
				setData({ products: [] }); // Set empty products array on error
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	// ------------------------------------------

	// --- Pagination Logic ---
	// Use data.products instead of data
	const products = useMemo(() => {
		return data?.products || [];
	}, [data?.products]);
	// Calculate the total number of pages
	const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

	// Get the items for the current page
	const currentItems = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		return products.slice(startIndex, endIndex);
	}, [products, currentPage]);

	// Handler to change page
	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
			// Optional: Scroll to the top of the content when page changes
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};
	// -------------------------

	if (loading)
		return <div className="text-center mt-20 text-gray-600">Loading...</div>;

	if (error)
		return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

	return (
		<div className="">
			<Navbar data={data.products} />
			<h1 className="mt-[200px] text-5xl font-extrabold font-americana text-center mb-16 text-white bg-[#8a459f] bg-opacity-80 py-20  tracking-tight">
				Risky Collection <span style={{ color: "white" }}></span>
			</h1>

			{products && products.length > 0 ? (
				<>
					{/* Display the current page items */}
					<div className=" py-5  px-6 sm:px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{currentItems.map((item, index) => (
							<Link
								to={`/Gowns/id/${item.style}`}
								state={{
									product: item,
									url: `https://demo.riskydress.com/images/${item.year}/Risky/`,
								}}
								key={index}
								className="bg-white shadow-lg overflow-hidden group border-b-4 border-transparent hover:border-b-4 transition-all duration-300 transform hover:shadow-xl"
								style={{ borderBottomColor: PRIMARY_COLOR }}>
								<div className="relative overflow-hidden">
									<img
										src={`https://demo.riskydress.com/images/${item.year}/Risky/${item.images?.[0]}`}
										alt={item.style}
										className="w-full h-[440px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="p-4 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
											<div className="flex justify-between items-center mb-2">
												<h2 className="font-bold text-xl drop-shadow-md">
													{item.style}
												</h2>
												<p
													className="font-extrabold text-lg"
													style={{
														color: PRIMARY_COLOR,
														filter: "brightness(1.5)",
													}}>
													{item.price}
												</p>
											</div>
											<div className="flex justify-between items-center text-sm">
												<p className="text-gray-200">
													Sizes:{" "}
													<span className="font-medium">{item.sizeRange}</span>
												</p>
												<button
													className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
													style={{
														backgroundColor: PRIMARY_COLOR,
														color: "white",
													}}
													onMouseOver={(e) =>
														(e.currentTarget.style.backgroundColor =
															HOVER_COLOR)
													}
													onMouseOut={(e) =>
														(e.currentTarget.style.backgroundColor =
															PRIMARY_COLOR)
													}>
													View Dress
												</button>
											</div>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>

					{/* Pagination Controls */}
					<div className="flex justify-center items-center my-10 space-x-2 md:flex-row sm:flex-col flex-col gap-4">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
								currentPage === 1
									? "bg-gray-200 text-gray-500 cursor-not-allowed"
									: "text-white"
							}`}
							style={{
								backgroundColor: currentPage !== 1 ? PRIMARY_COLOR : undefined,
							}}
							onMouseOver={(e) =>
								currentPage !== 1 &&
								(e.currentTarget.style.backgroundColor = HOVER_COLOR)
							}
							onMouseOut={(e) =>
								currentPage !== 1 &&
								(e.currentTarget.style.backgroundColor = PRIMARY_COLOR)
							}>
							Previous
						</button>

						{/* Dynamic Page Buttons (Optional: display a few surrounding pages) */}
						<div className="flex gap-2">
							{[...Array(totalPages).keys()].map((page) => {
								const pageNum = page + 1;
								// Basic logic to show current, previous, and next page buttons
								if (
									pageNum === 1 ||
									pageNum === totalPages ||
									(pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
								) {
									return (
										<button
											key={pageNum}
											onClick={() => handlePageChange(pageNum)}
											className={`w-10 h-10 rounded-full font-semibold transition-colors duration-300 ${
												pageNum === currentPage
													? "text-white shadow-md" // Distinct color for current page
													: "bg-gray-100 text-gray-700 hover:bg-gray-200"
											}`}
											style={
												pageNum === currentPage
													? { backgroundColor: PRIMARY_COLOR, color: "white" }
													: {}
											}>
											{pageNum}
										</button>
									);
								}
								// Add ellipses for skipped pages (before and after current view)
								if (pageNum === 2 && currentPage > 2) {
									return (
										<span key="start-ellipsis" className="text-gray-500">
											...
										</span>
									);
								}
								if (
									pageNum === totalPages - 1 &&
									currentPage < totalPages - 1
								) {
									return (
										<span key="end-ellipsis" className="text-gray-500">
											...
										</span>
									);
								}
								return null;
							})}
						</div>

						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className={`px-4 py-2 rounded-full md:text-sm font-semibold transition-colors duration-300 ${
								currentPage === totalPages
									? "bg-gray-200 text-gray-500 cursor-not-allowed"
									: "text-white"
							}`}
							style={{
								backgroundColor:
									currentPage !== totalPages ? PRIMARY_COLOR : undefined,
							}}
							onMouseOver={(e) =>
								currentPage !== totalPages &&
								(e.currentTarget.style.backgroundColor = HOVER_COLOR)
							}
							onMouseOut={(e) =>
								currentPage !== totalPages &&
								(e.currentTarget.style.backgroundColor = PRIMARY_COLOR)
							}>
							Next
						</button>
					</div>
				</>
			) : (
				<div className="text-center text-gray-600 mt-20 p-10 bg-gray-50 rounded-xl">
					<p className="text-xl font-semibold mb-8">No data available.</p>
					<Link
						to="/Gowns"
						className="inline-block px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg"
						style={{ backgroundColor: PRIMARY_COLOR, color: "white" }}
						onMouseOver={(e) =>
							(e.currentTarget.style.backgroundColor = HOVER_COLOR)
						}
						onMouseOut={(e) =>
							(e.currentTarget.style.backgroundColor = PRIMARY_COLOR)
						}>
						Back to Collections
					</Link>
				</div>
			)}
			<Footer />
		</div>
	);
}
