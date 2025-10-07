import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Footer from "../../Footer/Footer";
import Featurelist from "../Feature/FeatureProductlist/Featurelist";

const ProductItem = ({ products, productsPerPage }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const initialPage = parseInt(queryParams.get("page")) || 1;
	const [currentPage, setCurrentPage] = useState(initialPage);
	const totalPages = Math.ceil(products.length / productsPerPage);

	useEffect(() => {
		setCurrentPage(initialPage);
	}, [initialPage]);

	useEffect(() => {
		navigate(`/product?page=${currentPage}`, { replace: true });
	}, [currentPage, navigate]);

	const handlePageChange = (pageNumber) => {
		if (pageNumber !== currentPage) {
			setCurrentPage(pageNumber);
		}
	};

	const renderProducts = () => {
		const startIndex = (currentPage - 1) * productsPerPage;
		const selectedProducts = products.slice(
			startIndex,
			startIndex + productsPerPage
		);

		return selectedProducts.map((data, index) => (
			<Featurelist key={index} data={data} />
		));
	};

	const renderPagination = () => {
		const pageNumbers = [];
		const maxButtons = 3; // Number of buttons to show
		let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
		let endPage = Math.min(totalPages, startPage + maxButtons - 1);

		if (endPage - startPage + 1 < maxButtons) {
			startPage = Math.max(1, endPage - maxButtons + 1);
		}

		if (currentPage > 1) {
			pageNumbers.push(
				<div
					key="prev"
					className="w-12  bg-[#8a459f]  flex justify-center items-center rounded-full h-12">
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						className=" text-white">
						˂˂
					</button>
				</div>
			);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<div
					key={i}
					className="w-12  bg-[#8a459f]  flex justify-center items-center rounded-full h-12">
					<button
						onClick={() => handlePageChange(i)}
						className={`px-4 py-3 rounded-[50%]  text-white ${
							i === currentPage
								? "  text-white border border-black"
								: " bg-[#8a459f] "
						}`}>
						{i}
					</button>
				</div>
			);
		}

		if (currentPage < totalPages) {
			pageNumbers.push(
				<div
					key="next"
					className="w-12  bg-[#8a459f]  flex justify-center items-center rounded-full h-12">
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						className=" text-white rounded-full">
						˃˃
					</button>
				</div>
			);
		}

		return (
			<div className="pagination flex justify-center items-center gap-4 p-4">
				{pageNumbers}
			</div>
		);
	};

	return (
		<div className="product-items">
			<Navbar />
			<h2
				className="font-Jost-Medium 2xl:text text-center py-5  "
				data-aos="fade-right">
				My All Product{" "}
			</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-20 mb-16 px-4 md:px-8 lg:px-16 overflow-x-hidden">
				{renderProducts()}
			</ul>
			{renderPagination()}
			<Footer />
		</div>
	);
};

export default ProductItem;
