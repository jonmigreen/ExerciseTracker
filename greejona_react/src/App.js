import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import Navigation from './components/nav.js';
import { useState } from 'react';

function App() {
	const [exerciseToEdit, setExerciseToEdit] = useState();

	return (
		<div className="App">
			<Router>
				
        		<div className="sticky">
					<Navigation />
				</div>
				<section>
					<header id="App-header">
						<h1> TRAXALOT </h1>
						<p id="header-intro">
							A <b style={{color: "#ffe26a"}}>Single Page Application</b> to track your exercises.
						</p>
					</header>
				</section>
				<main>
					<div className="App-table">
						<Route path="/" exact>
							<HomePage setExerciseToEdit={setExerciseToEdit} />
						</Route>
						<Route path="/add">
							<AddPage />
						</Route>
						<Route path="/edit">
							<EditPage exerciseToEdit={exerciseToEdit} />
						</Route>
					</div>
				</main>
				<footer id="App-footer"> &copy; 2022 Jonathan Green </footer>
			</Router>
		</div>
	);
}

export default App;
