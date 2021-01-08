import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	FaEnvelopeOpen,
	FaUser,
	FaCalendarTimes,
	FaMap,
	FaPhone,
	FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState("name");
	const [value, setValue] = useState("random user");
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
    setLoading(true);
		const {
			data: { results },
		} = await axios.get(url);
		const {
			name,
			location: { street },
			email,
			dob,
			phone,
			login,
			picture,
		} = results[0];

		const newPerson = {
			email,
			phone,
			password: login.password,
			age: dob.age,
			picture: picture.large,
			name: `${name.first} ${name.last}`,
			street: `${street.number} ${street.name}`,
    };

		setUser(newPerson);
		setTitle("name");
		setValue(newPerson.name);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const mouseOver = (e) => {
		if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      console.log(newValue);
      setValue(user[newValue]);
      setTitle(newValue)
		}
	};

	return (
		<main>
			<div className="block bcg-black"></div>
			<div className="block">
				<div className="container">
					<img
						src={(user && user.picture) || defaultImage}
						alt="random user"
						className="user-img"
					/>
					<p className="user-title">My {title} is</p>
					<p className="user-value">{value}</p>
					<div className="values-list">
						<button className="icon" data-label="name" onMouseOver={mouseOver}>
							<FaUser />
						</button>
						<button className="icon" data-label="email" onMouseOver={mouseOver}>
							<FaEnvelopeOpen />
						</button>
						<button className="icon" data-label="age" onMouseOver={mouseOver}>
							<FaCalendarTimes />
						</button>
						<button
							className="icon"
							data-label="street"
							onMouseOver={mouseOver}
						>
							<FaMap />
						</button>
						<button className="icon" data-label="phone" onMouseOver={mouseOver}>
							<FaPhone />
						</button>
						<button
							className="icon"
							data-label="password"
							onMouseOver={mouseOver}
						>
							<FaLock />
						</button>
					</div>
					<button className="btn" type="button" onClick={fetchData}>
						{loading ? "loading..." : "random user"}
					</button>
				</div>
			</div>
		</main>
	);
}

export default App;
