import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

// Define items per page (Still kept for the API request limit)
const ITEMS_PER_PAGE = 12;

export default function Gowns() {
	// Initialize data state to hold products for the *current page*
	const [data, setData] = useState({ products: [] });

	const [error, setError] = useState(null);
	const parms = useParams();
	const year = parms.year;

	// State for pagination data received from the API
	const [pagination, setPagination] = useState({
		total: 0,
		totalPages: 0,
		hasNextPage: false,
		hasPrevPage: false,
	});
	const [currentPage, setCurrentPage] = useState(1);

	const PRIMARY_COLOR = "#8a459f";
	const HOVER_COLOR = "rgb(219 39 119 / 0.8)";

	console.log(year);

	// --- Data Fetching Logic (Updated to be cleaner) ---
	useEffect(() => {
		const fetchData = async () => {
			try {
				setError(null); // Clear previous errors

				// Build query parameters with pagination
				const params = new URLSearchParams({
					brand: "Risky",
					category: `Gowns`,
					year: year,
					page: currentPage.toString(),
					limit: ITEMS_PER_PAGE.toString(),
				});

				const apiUrl = `${"https://admin.monsinidress.com"}/api/products?${params}`;

				console.log("Request URL:", apiUrl);

				const response = await fetch(apiUrl);

				if (!response.ok) throw new Error("Failed to fetch data");

				const result = await response.json();

				console.log("API Response 123:", result);

				// Check if the API response has the expected structure
				if (
					result.success &&
					result.data &&
					Array.isArray(result.data.products)
				) {
					// Set data.products, which contains the items for the current page
					setData(result.data);

					// Set the pagination metadata
					setPagination(
						result.data.pagination || {
							total: 0,
							totalPages: 0,
							hasNextPage: false,
							hasPrevPage: false,
						}
					);
					console.log("Fetched data:", result.data.products);
				} else {
					// Handle cases where API returns success but data structure is wrong or products is missing
					throw new Error("Invalid or missing data structure from API");
				}
			} catch (err) {
				console.error("Fetch error:", err);
				setError(err.message);
				setData({ products: [] }); // Reset data on error
				setPagination({
					total: 0,
					totalPages: 0,
					hasNextPage: false,
					hasPrevPage: false,
				});
			} finally {
			}
		};
		fetchData();
	}, [year, currentPage]);
	// ------------------------------------------

	// --- Pagination Logic (Simplified) ---
	// The items for the current page are already fetched into data.products.
	const currentItems = useMemo(() => {
		return data?.products || [];
	}, [data?.products]);

	// Total pages should be read directly from the API response
	const totalPages = pagination.totalPages;
	// -------------------------------------

	// Handler to change page
	const handlePageChange = (page) => {
		// Use pagination.totalPages from the API response for boundary check
		if (page > 0 && page <= pagination.totalPages) {
			setCurrentPage(page);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};
	// -------------------------

	if (error)
		return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

	return (
		<div className="">
			{/* Pass currentItems to Navbar if it expects the displayed items */}
			<Navbar data={currentItems} />
			<h1 className="lg:mt-[200px] mt-[140px] text-5xl font-extrabold font-americana text-center mb-16 text-white bg-[#8a459f] bg-opacity-80 py-20  tracking-tight">
				Risky {year} Collection <span style={{ color: "white" }}></span>
			</h1>

			{/* Check if currentItems (the fetched products for the page) have any length */}
			{currentItems && currentItems.length > 0 ? (
				<>
					{/* Display the current page items */}
					<div className=" py-5  px-6 sm:px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{currentItems.map((item, index) => (
							<Link
								to={`/Gowns/id/${item.style}`}
								state={{
									product: item,
								}}
								key={index}
								className="bg-white shadow-lg overflow-hidden group border-b-4 border-transparent hover:border-b-4 transition-all duration-300 transform hover:shadow-xl"
								style={{ borderBottomColor: PRIMARY_COLOR }}>
								<div className="relative overflow-hidden">
									<img
										src={`https://admin.monsinidress.com/${item.images?.[0]}`}
										alt={item.style}
										className="w-full h-[440px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="p-4 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
											<div className="flex justify-between items-center text-sm">
												<p className="text-gray-200">{item.style}</p>
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
							// Disable based on API's totalPages
							disabled={currentPage === 1 || totalPages === 0}
							className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
								currentPage === 1 || totalPages === 0
									? "bg-gray-200 text-gray-500 cursor-not-allowed"
									: "text-white"
							}`}
							style={{
								backgroundColor:
									currentPage !== 1 && totalPages !== 0
										? PRIMARY_COLOR
										: undefined,
							}}
							onMouseOver={(e) =>
								currentPage !== 1 &&
								totalPages !== 0 &&
								(e.currentTarget.style.backgroundColor = HOVER_COLOR)
							}
							onMouseOut={(e) =>
								currentPage !== 1 &&
								totalPages !== 0 &&
								(e.currentTarget.style.backgroundColor = PRIMARY_COLOR)
							}>
							Previous
						</button>

						{/* Dynamic Page Buttons */}
						<div className="flex gap-2">
							{/* Generate buttons based on API's totalPages */}
							{[...Array(totalPages).keys()].map((page) => {
								const pageNum = page + 1;
								// Basic logic to show current, previous, and next page buttons, plus first/last
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
													? "text-white shadow-md"
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
							// Disable based on API's totalPages
							disabled={currentPage === totalPages || totalPages === 0}
							className={`px-4 py-2 rounded-full md:text-sm font-semibold transition-colors duration-300 ${
								currentPage === totalPages || totalPages === 0
									? "bg-gray-200 text-gray-500 cursor-not-allowed"
									: "text-white"
							}`}
							style={{
								backgroundColor:
									currentPage !== totalPages && totalPages !== 0
										? PRIMARY_COLOR
										: undefined,
							}}
							onMouseOver={(e) =>
								currentPage !== totalPages &&
								totalPages !== 0 &&
								(e.currentTarget.style.backgroundColor = HOVER_COLOR)
							}
							onMouseOut={(e) =>
								currentPage !== totalPages &&
								totalPages !== 0 &&
								(e.currentTarget.style.backgroundColor = PRIMARY_COLOR)
							}>
							Next
						</button>
					</div>
				</>
			) : (
				<div className="text-center text-gray-600 mt-20 p-10 bg-gray-50 rounded-xl">
					<p className="text-xl font-semibold mb-8">
						No {year} data available for Risky gowns.
					</p>
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
						Back to All Gowns
					</Link>
				</div>
			)}
			<Footer />
		</div>
	);
}
