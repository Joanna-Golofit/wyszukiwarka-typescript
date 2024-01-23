import React, { useEffect, useState } from "react";
import "./App.scss";
import data from "./data/02-faq.json";
import { FAQ, GroupType } from "./types/types";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState<string>("");
	const [showContent, setShowContent] = useState<number | null>(null);

	useEffect(() => {
		const hash = window.location.hash.replace("#", "");
		if (hash) {
			const id = parseInt(hash, 10);
			setShowContent(isNaN(id) ? null : id);
		}
	}, []);

	const searchPhrase = search.toLowerCase().split(" ").join(".*");

	const filteredData: FAQ[] = data.questions.filter((faq: FAQ) => {
		const faqContent = (faq.title + faq.content).toLowerCase();
		return new RegExp(searchPhrase).test(faqContent);
	});

	console.log("data (all):", data);
	console.log("filteredData: ", filteredData);
	console.log("search: ", search);
	console.log("searchPhrase:", searchPhrase);

	return (
		<main className="FAQ">
			<input
				type="text"
				value={search}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setSearch(e.target.value)
				}
				placeholder="Search..."
			/>
			<div className="main-container">
				<section className="left">
					{data.groups.left.map((group: GroupType, index: number) => (
						<div key={index}>
							<h2>{group.name}</h2>
							{filteredData
								.filter((faq: FAQ) => faq.groupId === group.id)
								.map((faq: FAQ) => (
									<div key={faq.id}>
										<h3
											onClick={() => {
												const newShowContent =
													showContent === faq.id ? null : faq.id;
												setShowContent(newShowContent);
												navigate(`#${newShowContent}`);
											}}
										>
											{faq.title}{" "}
											{showContent === faq.id ? (
												<FontAwesomeIcon icon={faChevronUp} />
											) : (
												<FontAwesomeIcon icon={faChevronDown} />
											)}
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
					{data.groups.right.map((group: GroupType, index: number) => (
						<div key={index}>
							<h2>{group.name}</h2>
							{filteredData
								.filter((faq: FAQ) => faq.groupId === group.id)
								.map((faq: FAQ) => (
									<div key={faq.id}>
										<h3
											onClick={() => {
												const newShowContent =
													showContent === faq.id ? null : faq.id;
												setShowContent(newShowContent);
												navigate(`#${newShowContent}`);
											}}
										>
											{faq.title}{" "}
											{showContent === faq.id ? (
												<FontAwesomeIcon icon={faChevronUp} />
											) : (
												<FontAwesomeIcon icon={faChevronDown} />
											)}
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
		</main>
	);
};

export default App;
