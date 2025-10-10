import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

export default function AboutPage() {
	return (
		<>
			<Navbar />
			<div className=" md:mt-[180px] mt-[130px] h-fit      bg-gray-50 py-12 px-4 sm:px-8 lg:px-20">
				<div className="max-w-5xl mx-auto text-center">
					{/* About Section */}
					<h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#8a459f] font-americana">
						About Risky Dress
					</h1>
					<p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
						Discover our elegant gowns for special occasions, weddings, and
						evenings. At <span className="font-semibold">Risky Dress</span>, we
						blend fashion with sophistication to make your moments
						unforgettable.
					</p>

					{/* Stats Section */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
						<div className="bg-white shadow rounded-xl p-6">
							<h2 className="text-3xl font-bold text-[#8a459f]">80+</h2>
							<p className="text-gray-600 text-sm">Fashionable Gowns</p>
						</div>
						<div className="bg-white shadow rounded-xl p-6">
							<h2 className="text-3xl font-bold text-[#8a459f]">10</h2>
							<p className="text-gray-600 text-sm">Years of Experience</p>
						</div>
						<div className="bg-white shadow rounded-xl p-6">
							<h2 className="text-3xl font-bold text-[#8a459f]">Trusted</h2>
							<p className="text-gray-600 text-sm">By Many</p>
						</div>
					</div>

					{/* FAQ Section */}
					<div className="text-left max-w-3xl mx-auto">
						<h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
							Frequently Asked Questions
						</h2>

						<div className="mb-6">
							<h3 className="font-semibold text-gray-800 text-base sm:text-lg">
								What types of gowns do you offer?
							</h3>
							<p className="text-gray-600 text-sm sm:text-base">
								We offer elegant and fashionable gowns for special occasions,
								weddings, and evening events.
							</p>
						</div>

						<div>
							<h3 className="font-semibold text-gray-800 text-base sm:text-lg">
								How can I place an order?
							</h3>
							<p className="text-gray-600 text-sm sm:text-base">
								You can place an order directly through our online store by
								selecting your gown and following the checkout process.
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
