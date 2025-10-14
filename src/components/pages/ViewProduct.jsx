import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { Icon } from "@iconify/react";
import Footer from "../Footer/Footer";

// Accent Color: A deep, luxurious mauve/rose color for an elegant touch
const ACCENT_COLOR = "#8a459f";
// Darker shade for hover states

// A simple component for the structured product details on the right side
const ProductInfoBlock = ({ title, children }) => (
	<div>
		<h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">
			{title}
		</h3>
		<div className="text-lg font-light text-gray-800">{children}</div>
	</div>
);

export default function ViewProduct() {
	const location = useLocation();
	const product = location.state?.product;
	const url = location.state?.url;
	const [selectedImage, setSelectedImage] = useState(0);
	const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
	const [isZoomActive, setIsZoomActive] = useState(false);
	const imageRef = useRef(null);

	const handleMouseMove = (e) => {
		if (!imageRef.current) return;

		const rect = imageRef.current.getBoundingClientRect();
		// Calculate position within the image container
		const x = e.nativeEvent.offsetX / rect.width;
		const y = e.nativeEvent.offsetY / rect.height;

		setZoomPosition({ x: x * 100, y: y * 100 });
	};

	const handleMouseEnter = () => {
		setIsZoomActive(true);
	};

	const handleMouseLeave = () => {
		setIsZoomActive(false);
	};

	if (!product) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-3xl font-light text-gray-800 mb-4">
						Product not found
					</h1>
					<Link
						to="/"
						className="text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-gray-500 transition-all duration-300">
						Return to Collection
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<Navbar />

			{/* Header: Breadcrumb-style navigation */}
			<header className="lg:mt-[190px] mt-[150px] border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center text-sm">
					<Link
						to="/"
						className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
						Prom {product.year}
					</Link>

					<span className="text-gray-500 capitalize">{product.type}</span>
					<Icon
						icon="ic:round-chevron-right"
						width="16"
						height="16"
						className="text-gray-400 mx-2"
					/>
					<span className="font-light text-gray-800">{product.style}</span>
				</div>
			</header>

			{/* Main Product Section */}
			<main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
					{/* Image Gallery (Col 1-7) */}
					<div className="lg:col-span-7 space-y-8">
						{/* Main Image with Zoom Effect */}
						<div className="relative overflow-hidden rounded-xl xl:h-[800px]  md:h-[1100px] sm:h-[800px] h-[600px] shadow-lg border border-gray-100 bg-gray-50">
							{/* Image Container for Mouse Events */}
							<div
								ref={imageRef}
								className="w-full h-full cursor-crosshair"
								onMouseMove={handleMouseMove}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								style={{ position: "relative" }}>
								{/* Main Image */}
								<img
									src={url + product.images[selectedImage]}
									alt={product.style}
									className="w-full xl:h-[800px]  md:h-[1100px] sm:h-[800px]  h-[600px] object-cover  object-bottom   transition-opacity duration-500"
								/>

								{/* Zoom Lens/Overlay */}
								<div
									className="absolute inset-0 transition-opacity duration-300"
									style={{
										opacity: isZoomActive ? 1 : 0,
										backgroundImage: `url(${
											url + product.images[selectedImage]
										})`,
										backgroundSize: "200%", // Double the size for a 2x zoom
										backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
										pointerEvents: "none",
										// Subtle lens style with a border
										border: isZoomActive ? `0px solid ${ACCENT_COLOR}` : "none",
									}}
								/>
							</div>

							{/* Zoom Indicator/Icon */}
							<div
								className={`absolute bottom-4 right-4 bg-white text-gray-800 w-10 h-10 flex items-center justify-center rounded-full text-sm shadow-md transition-opacity duration-300 border border-gray-200 ${
									isZoomActive ? "opacity-100" : "opacity-0"
								}`}>
								<Icon icon="iconamoon:zoom-in-light" width="20" height="20" />
							</div>
						</div>

						{/* Thumbnail Grid */}
						{product.images.length > 1 && (
							<div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
								{product.images.map((img, i) => (
									<div
										key={i}
										className={`relative aspect-square  overflow-hidden rounded-lg bg-gray-50 cursor-pointer group transition-all duration-300 border-2 ${
											selectedImage === i
												? `border-[${ACCENT_COLOR}]`
												: "border-transparent hover:border-gray-200"
										}`}
										onClick={() => {
											setSelectedImage(i);
											setIsZoomActive(false);
										}}>
										<img
											src={url + img}
											alt={`${product.style} view ${i + 1}`}
											className="w-full h-full object-cover object-top  transition-transform duration-300 group-hover:scale-105"
										/>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Product Information (Col 8-12) */}
					<div className="lg:col-span-5 lg:sticky lg:top-24 self-start lg:h-full">
						{/* Product Header */}
						<div className="mb-10">
							<h1 className="text-4xl font-normal text-gray-900 tracking-tight mb-2">
								{product.style}
							</h1>
							<p className="text-3xl font-light text-gray-700">
								{product.price}
							</p>
						</div>

						{/* Divider */}
						<div className={`w-20 h-px bg-[${ACCENT_COLOR}] mb-10`} />

						{/* Product Details */}
						<div className="space-y-8 mb-10">
							<ProductInfoBlock title="Collection Year">
								<p>{product.year}</p>
							</ProductInfoBlock>

							<ProductInfoBlock title="Available Sizes">
								<p>{product.sizeRange}</p>
							</ProductInfoBlock>

							{/* Colors */}
							<ProductInfoBlock title="Color Variations">
								<div className="flex flex-wrap gap-2 pt-1">
									{product.colors.map((color, index) => (
										<span
											key={index}
											className={`px-3 py-1 bg-white border border-[${ACCENT_COLOR}] border-opacity-50 rounded-full text-sm font-light text-[${ACCENT_COLOR}] transition-colors duration-200 cursor-default`}>
											{color}
										</span>
									))}
								</div>
							</ProductInfoBlock>
						</div>

						{/* Inquiry Button */}
						<div className="mb-12">
							<Link to={"/contact"}>
								<button
									className={`w-full border-2 border-[${ACCENT_COLOR}] text-[${ACCENT_COLOR}] py-4 px-8 rounded-full hover:bg-[${ACCENT_COLOR}] transition-all duration-300 font-medium tracking-wider text-base uppercase hover:text-white shadow-md hover:shadow-lg`}>
									Inquire About This Gown
								</button>
							</Link>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
