import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

export default function ContactPage() {
	const [form, setForm] = useState({ firstName: "", email: "", message: "" });
	const [errors, setErrors] = useState({});
	const [status, setStatus] = useState(null);

	// --- Original JavaScript Logic (UNMODIFIED) ---

	function validate() {
		const e = {};
		if (!form.firstName.trim()) e.firstName = "First name is required";
		if (!form.email.trim()) e.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
			e.email = "Enter a valid email";
		if (!form.message.trim()) e.message = "Message is required";
		return e;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validation = validate();
		setErrors(validation);
		if (Object.keys(validation).length) return;

		try {
			setStatus("sending");
			// Simulate an API call delay
			await new Promise((res) => setTimeout(res, 900));
			setStatus("success");
			setForm({ firstName: "", email: "", message: "" });
			setTimeout(() => setStatus(null), 3000);
		} catch (err) {
			setStatus("error");
		}
	};

	// --- Redesigned HTML/Tailwind CSS Below ---

	// Define main color variables for clean Tailwind classes
	const primaryButtonColor = "zinc"; // Chic dark gray/almost black
	const focusRingColor = "zinc";

	// Helper function for input classes to clean up JSX
	const getInputClasses = (field) => {
		const base = `mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-${focusRingColor}-800 bg-white placeholder-gray-400`;
		return errors[field]
			? `${base} border-red-500`
			: `${base} border-gray-300 hover:border-gray-400`;
	};

	return (
		<>
			<Navbar />
			<div className=" mt-[180px] min-h-screen bg-gray-100 py-20 px-4 sm:px-6 lg:px-10">
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					{/* Left Section - Contact Form (Sleek, White Card) */}
					<section className="bg-white p-10 rounded-xl shadow-2xl border border-gray-200">
						<h1 className="text-4xl font-americana  font-bold text-[#8a459f]  mb-2 tracking-wide">
							Contact Us
						</h1>
						<p className="text-gray-600 mb-8 text-lg">
							For inquiries about our bespoke elegant gowns, please reach out.
							We are dedicated to providing a timely response within 24 hours.
						</p>

						<form onSubmit={handleSubmit} className="space-y-6">
							{/* First Name Input */}
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-semibold text-gray-700">
									Your First Name
								</label>
								<input
									id="firstName"
									name="firstName"
									value={form.firstName}
									onChange={handleChange}
									type="text"
									placeholder="Enter your first name"
									className={getInputClasses("firstName")}
								/>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-600 font-medium">
										{errors.firstName}
									</p>
								)}
							</div>

							{/* Email Input */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-semibold text-gray-700">
									Your Email Address*
								</label>
								<input
									id="email"
									name="email"
									value={form.email}
									onChange={handleChange}
									type="email"
									placeholder="name@example.com"
									className={getInputClasses("email")}
								/>
								{errors.email && (
									<p className="mt-1 text-sm text-red-600 font-medium">
										{errors.email}
									</p>
								)}
							</div>

							{/* Message Textarea */}
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-semibold text-gray-700">
									Your Message*
								</label>
								<textarea
									id="message"
									name="message"
									value={form.message}
									onChange={handleChange}
									rows={6}
									placeholder="Type your message here..."
									className={getInputClasses("message")}
								/>
								{errors.message && (
									<p className="mt-1 text-sm text-red-600 font-medium">
										{errors.message}
									</p>
								)}
							</div>

							{/* Submit Button and Status */}
							<div className="pt-2 flex items-center space-x-4">
								<button
									type="submit"
									className={`inline-flex items-center text-black justify-center rounded-lg bg-${primaryButtonColor}-800 px-6 py-3  text-base font-bold shadow-md hover:bg-${primaryButtonColor}-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${focusRingColor}-800 disabled:opacity-50 disabled:cursor-not-allowed`}
									disabled={status === "sending"}>
									{status === "sending" ? "Sending..." : "Send Your Inquiry"}
								</button>

								{status === "success" && (
									<p className="text-green-600 font-medium">
										Your inquiry has been sent. Thank you!
									</p>
								)}

								{status === "error" && (
									<p className="text-red-600 font-medium">
										Something went wrong. Please try again later.
									</p>
								)}
							</div>
						</form>
					</section>

					{/* Right Section - Location Info (Minimalist and Structured) */}
					<aside className="space-y-8 pt-4">
						{/* Location Details Card */}
						<div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-gray-800">
							<h2 className="text-2xl font-americana font-bold mb-4 text-[#8a459f] ">
								Our Details
							</h2>
		

							<div className="space-y-5">
								{/* Address */}
								<div className="flex items-start">
									<span className="text-gray-800 mr-3 text-xl">&#9906;</span>{" "}
									{/* Pin Icon */}
									<div>
										<h3 className="text-sm uppercase font-bold text-gray-700">
											Address
										</h3>
										<p className="text-gray-600 text-base leading-relaxed">
											18136 R. J.-A.-Bombardier,
											<br /> Mirabel, QC J7J 0H5, Canada
										</p>
									</div>
								</div>

								

								{/* Contact */}
								<div className="flex items-start">
									<span className="text-gray-800 mr-3 text-xl">&#x2709;</span>{" "}
									{/* Mail Icon */}
									<div>
										<h3 className="text-sm uppercase font-bold text-gray-700">
											Contact
										</h3>
										<p className="text-gray-600 text-base">
											Phone:{" "}
											<span className="font-semibold text-gray-800">
												450-818-7078
											</span>
											<br />
											Email:{" "}
											<span className="font-semibold text-gray-800">
												 Info@RiskyDress.com
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Google Map Embed (Full width in the column) */}
						<div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
							<div className="w-full h-64 lg:h-80">
								<iframe
									title="Contact Location Map"
									className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.316065600778!2d-73.92213!3d45.689148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc8d6072757f5fb%3A0x99f44a4cd27f8672!2s18136%20R.%20J.-A.-Bombardier%2C%20Mirabel%2C%20QC%20J7J%200H5%2C%20Canada!5e0!3m2!1sen!2s!4v1696942945000!5m2!1sen!2s"
									allowFullScreen=""
									loading="lazy"></iframe>
							</div>
						</div>
					</aside>
				</div>
			</div>
			<Footer />
		</>
	);
}
