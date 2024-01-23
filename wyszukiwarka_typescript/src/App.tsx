import React, { useState } from "react";
import "./App.scss";
import data from "./data/02-faq.json";
import { FAQ } from "./types/types";

const App: React.FC = () => {
	const [search, setSearch] = useState<string>("");
	const [showContent, setShowContent] = useState<number | null>(null);

	const filteredData: FAQ[] = data.questions.filter((faq: FAQ) =>
		(faq.title + faq.content).toLowerCase().includes(search.toLowerCase())
	);
	console.log(data);
	console.log(filteredData);

	return (
		<main className="FAQ">
			<input
				type="text"
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder="Search..."
			/>
			<div className="main-container">
				<section className="left">
					{data.groups.left.map((group, index) => (
						<div key={index}>
							<h2>{group.name}</h2>
							{filteredData
								.filter(faq => faq.groupId === group.id)
								.map((faq, index) => (
									<div key={index}>
										<h3
											onClick={() =>
												setShowContent(showContent === faq.id ? null : faq.id)
											}
										>
											{faq.title}
										</h3>
										{showContent === faq.id && (
											<p dangerouslySetInnerHTML={{ __html: faq.content }} />
										)}
									</div>
								))}
						</div>
					))}
				</section>
				<section className="right">
					{data.groups.right.map((group, index) => (
						<div key={index}>
							<h2>{group.name}</h2>
							{filteredData
								.filter(faq => faq.groupId === group.id)
								.map((faq, index) => (
									<div key={index}>
										<h3
											onClick={() =>
												setShowContent(showContent === faq.id ? null : faq.id)
											}
										>
											{faq.title}
										</h3>
										{showContent === faq.id && (
											<p dangerouslySetInnerHTML={{ __html: faq.content }} />
										)}
									</div>
								))}
						</div>
					))}
				</section>
			</div>
			{/* {filteredData.map((faq: FAQ, index: number) => (
				<div key={index}>
					<h2 onClick={() => setShowContent(faq.id)}>{faq.title}</h2>
					{showContent === index && <p>{faq.content} </p>}
				</div>
			))} */}
		</main>
	);
};

export default App;
