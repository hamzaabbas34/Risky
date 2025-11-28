import React from "react";
import video1 from "../../../assets/video/WhatsApp Video 2025-10-10 at 17.06.49.mp4";
import video2 from "../../../assets/video/WhatsApp Video 2025-10-10 at 17.06.51.mp4";

export default function ExploreCollection() {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	// Initial static data as fallback
	const initialStaticData = [
		{
			_id: "static-1",
			brand: "Prom Collection",
			media: [
				{
					url: video1,
					type: "video",
					filename: "prom-video.mp4",
				},
			],
		},
		{
			_id: "static-2",
			brand: "Evening Collection",
			media: [
				{
					url: "https://demo.riskydress.com/images/2026/ENCHANTED-E/E40237%20%281%29.png",
					type: "image",
					filename: "evening-dress.jpg",
				},
			],
		},
		{
			_id: "static-3",
			brand: "Evening Collection",
			media: [
				{
					url: video2,
					type: "video",
					filename: "prom-video.mp4",
				},
			],
		},
	];

	// Fetch data with POST request
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://admin.monsinidress.com/api/hero-section/brand`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ brand: "Risky" }),
					}
				);

				if (!response.ok) throw new Error("Failed to fetch data");
				const result = await response.json();
				console.log("API Response:", result);

				// Transform API data to match component structure
				if (result.data && result.data.length > 0) {
					const transformedData = result.data.map((item, index) => ({
						_id: item._id || `api-${index}`,
						brand: item.brand || "Monsini Collection",
						media:
							item.media?.map((mediaItem) => ({
								...mediaItem,
								url: mediaItem.url.startsWith("http")
									? mediaItem.url
									: `https://admin.monsinidress.com/${mediaItem.url}`,
								type:
									mediaItem.type ||
									(mediaItem.url.includes(".mp4") ? "video" : "image"),
							})) || [],
						category: "collection", // Default category
					}));

					console.log("Transformed Data:", transformedData);
					setData(transformedData);
				} else {
					// Use static data if API returns no data
					setData(initialStaticData);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				// Use static data on error
				setData(initialStaticData);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Function to render media item
	const renderMedia = (mediaItem, index) => {
		if (mediaItem.type === "video") {
			return (
				<video
					key={index}
					src={mediaItem.url}
					autoPlay
					loop
					muted
					playsInline
					className="w-full sm:h-[700px] h-[600px] md:h-[800px] object-cover object-top"
				/>
			);
		} else {
			return (
				<img
					key={index}
					src={mediaItem.url}
					className="w-full sm:h-[700px] h-[600px] md:h-[800px] object-cover object-top"
					alt={mediaItem.filename || "Collection image"}
					onError={(e) => {
						// Fallback to placeholder if image fails to load
						e.target.src =
							"https://via.placeholder.com/800x800/8a459f/ffffff?text=Collection+Image";
					}}
				/>
			);
		}
	};

	if (loading) {
		return (
			<div className="flex flex-col-reverse md:flex-row w-full mt-[150px] md:h-auto">
				{/* Loading skeleton */}
				<div className="w-full md:w-[85%] grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="w-full sm:h-[700px] h-[600px] md:h-[800px] bg-gray-200 animate-pulse"
						/>
					))}
				</div>

				{/* Text Section */}
				<div className="w-full md:w-[15%] flex justify-start md:justify-center items-center bg-white md:h-[800px] h-auto py-5 md:py-0 text-start">
					<span className="block md:hidden text-[50px] font-lora font-extrabold text-[#8a459f] tracking-wide leading-[45px]">
						NEW <br /> ARRIVAL
					</span>
					<span className="hidden md:block text-[70px] lg:text-[80px] font-lora font-extrabold text-[#8a459f] leading-[80px] tracking-widest whitespace-nowrap rotate-[-270deg] md:leading-1">
						NEW ARRIVAL
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col-reverse md:flex-row w-full mt-[150px] md:h-auto">
			{/* Media Section */}
			<div className="w-full md:w-[85%] grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2">
				{data.length > 0
					? data.map((collection, collectionIndex) => (
							<div key={collection._id || collectionIndex}>
								{collection.media && collection.media.length > 0 ? (
									collection.media.map((mediaItem, mediaIndex) =>
										renderMedia(mediaItem, `${collectionIndex}-${mediaIndex}`)
									)
								) : (
									// Fallback if no media in collection
									<img
										src="https://via.placeholder.com/800x800/8a459f/ffffff?text=No+Image"
										className="w-full sm:h-[700px] h-[600px] md:h-[800px] object-cover object-top"
										alt="No media available"
									/>
								)}
							</div>
					  ))
					: // Fallback to static data if no data available
					  initialStaticData.map((collection, index) => (
							<div key={collection._id}>
								{collection.media.map((mediaItem, mediaIndex) =>
									renderMedia(mediaItem, `${index}-${mediaIndex}`)
								)}
							</div>
					  ))}
			</div>

			{/* Text Section */}
			<div className="w-full md:w-[15%] flex justify-start md:justify-center items-center bg-white md:h-[800px] h-auto py-5 md:py-0 text-start">
				{/* Mobile (two lines, not rotated) */}
				<span className="block md:hidden text-[50px] font-lora font-extrabold text-[#8a459f] tracking-wide leading-[45px]">
					NEW <br /> ARRIVAL
				</span>

				{/* Desktop (one line, rotated) */}
				<span className="hidden md:block text-[70px] lg:text-[80px] font-lora font-extrabold text-[#8a459f] leading-[80px] tracking-widest whitespace-nowrap rotate-[-270deg] md:leading-1">
					NEW ARRIVAL
				</span>
			</div>
		</div>
	);
}
