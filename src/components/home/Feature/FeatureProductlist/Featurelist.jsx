import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ft.css";

export default function Featurelist({ data, count, show = "yes" }) {
	useEffect(() => {
		window.scrollTo(0, 0); // Scroll to the top when the component mounts
	}, []);

	return (
		<div className={`${count === 1 ? "lg:w-10/12" : ""}`}>
			<li
				className={`${
					count === 1 ? " block  md:flex lg:flex gap-5" : "w-full"
				}`}>
				<Link
					to={`/Gowns/id/${data.style}`}
					state={{
						product: data,
					}}>
					<div
						className={`relative ${
							count === 1
								? "lg:w-[300px] lg:h-[400px] md:w-[300px] md:h-[400px] w-full"
								: "w-full aspect-[4/5]"
						}`}>
						<img
							src={"https://admin.monsinidress.com/" + data.images[0]}
							alt={data.style}
							className="w-full h-full object-cover  object-top img1 z-1 opacity-1"
						/>
						<img
							src={"https://admin.monsinidress.com/" + data.images[1]}
							alt={data.style}
							className="myimg w-full h-full object-cover  object-top"
						/>
					</div>
				</Link>
				
			</li>
		</div>
	);
}
