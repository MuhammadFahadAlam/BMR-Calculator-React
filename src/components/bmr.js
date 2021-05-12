import React, { Component } from 'react';
import './bmr.css';

export default class bmr extends Component {
	constructor() {
		super();
		this.state = {
			gender: '',
			weight: '',
			age: '',
			heightFeet: '',
			heightInches: '',
			activity: '',
			bmr: '',
			calorie: '',
			error: '',
		};
	}

	handleAgeChange = (e) => {
		this.setState({
			age: e.target.value,
		});
	};

	handleWeightChange = (e) => {
		this.setState({
			weight: e.target.value,
		});
	};

	handleHeightFeetChange = (e) => {
		this.setState({
			heightFeet: e.target.value,
		});
	};

	handleHeightInchesChange = (e) => {
		this.setState({
			heightInches: e.target.value,
		});
	};

	handleGenderChange = (e) => {
		this.setState({
			gender: e.target.value,
		});
	};

	handleActivityChange = (e) => {
		this.setState({
			activity: e.target.value,
		});
	};

	calculateBMR = () => {
		if (
			this.state.age === '' ||
			this.state.gender === '' ||
			this.state.heightFeet === '' ||
			this.state.heightInches === '' ||
			this.state.weight === ''
		) {
			this.setState({
				error: 'All Fields are required!',
			});
			return;
		}

		this.setState({ error: '' });

		let bmrC = '';
		let height =
			this.state.heightFeet * 30.48 + this.state.heightInches * 2.54;

		if (this.state.gender === '1') {
			bmrC =
				66 +
				6.2 * this.state.weight +
				12.7 * height -
				6.76 * this.state.age;
		} else if (this.state.gender === '2') {
			bmrC =
				655.1 +
				4.35 * this.state.weight +
				4.7 * height -
				4.7 * this.state.age;
		}

		this.setState({
			bmr: bmrC,
		});
	};

	calculateCalories = () => {
		let Calorie;

		if (this.state.activity) {
			Calorie = this.state.bmr * this.state.activity;
			this.setState({
				calorie: Calorie,
				error: '',
			});
		} else {
			this.setState({
				error: 'Select activity to find Calorie.',
			});
		}
	};

	next() {
		if (this.state.bmr) {
			return (
				<div className='workout'>
					<div className='inputwrap'>
						<label className='label'>Workout in a Week</label>
						<select
							className='activity'
							onChange={this.handleActivityChange}
							value={this.state.activity}
							name='activity'
						>
							<option value=''>Select your Activity</option>
							<option value='1.2'>
								Sedentary (Very little or no exercise, and desk
								job)
							</option>
							<option value='1.375'>
								Lightly Active (Light exercise 1 to 3 days per
								week)
							</option>
							<option value='1.55'>
								Moderately Active (Moderate exercise 3 to 5 days
								per week)
							</option>
							<option value='1.725'>
								Very Active (Heavy exercise 6 to 7 days per
								week)
							</option>
							<option value='1.9'>
								Extremely Active (Very intense exercise, and
								physical job, exercise multiple times per day)
							</option>
						</select>
					</div>
					<button
						type='button'
						onClick={() => this.calculateCalories()}
					>
						Calculate Calories
					</button>
				</div>
			);
		}
	}

	render() {
		let error;
		let resultBMR;
		let resultCalorie;
		let next;

		if (this.state.error) {
			error = <div className='error'>{this.state.error}</div>;
		}

		if (this.state.bmr) {
			resultBMR = <div className='result'>{this.state.bmr}</div>;
			next = this.next();
		}

		if (this.state.calorie) {
			resultCalorie = <div className='result'>{this.state.calorie}</div>;
		}

		return (
			<div id='bmrcalc'>
				<div className='form'>
					<h2>BMR &amp; Daily Calorie Calculator</h2>
					{error}
					<div className='inputwrap'>
						<label className='label'>Gender</label>
						<label>
							<input
								type='radio'
								className='genderF'
								name='gender'
								value='1'
								checked={this.state.gender === '1'}
								onChange={this.handleGenderChange}
							/>
							Female
						</label>
						<label>
							<input
								type='radio'
								className='genderM'
								name='gender'
								value='2'
								checked={this.state.gender === '2'}
								onChange={this.handleGenderChange}
							/>
							Male
						</label>
					</div>
					<div className='inputwrap'>
						<label className='label'>Weight in Pounds</label>
						<input
							type='number'
							name='weight'
							className='weight'
							min='0'
							max='999'
							onChange={this.handleWeightChange}
						/>
					</div>
					<div className='inputwrap'>
						<label className='label'>
							Height in feet and inches
						</label>
						<input
							type='number'
							name='heightFeet'
							className='heightFeet'
							min='0'
							max='8'
							onChange={this.handleHeightFeetChange}
						/>
						<input
							type='number'
							name='heightInches'
							className='heightInches'
							min='0'
							max='11'
							onChange={this.handleHeightInchesChange}
						/>
					</div>
					<div className='inputwrap'>
						<label className='label'>Age in years</label>
						<input
							type='number'
							className='age'
							name='age'
							min='0'
							max='120'
							onChange={this.handleAgeChange}
						/>
					</div>
					<button type='button' onClick={() => this.calculateBMR()}>
						Calculate BMR
					</button>
					{resultBMR}
					{next}
					{resultCalorie}
				</div>
			</div>
		);
	}
}
