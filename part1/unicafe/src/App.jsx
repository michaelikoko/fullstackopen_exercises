import { useState } from "react"

function Button(props) {
	return (
		<button onClick={props.handleClick}>
			{props.text}
		</button>
	)
}

function StatisticLine({ text, value }) {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

function Statistics({ good, neutral, bad }) {
	const all = good + bad + neutral
	const average = (good - bad) / all
	const positive = (good / all) * 100

	return (
		<div>
			<h1>statistics</h1>
			{
				good === 0 && bad === 0 && neutral === 0 ?
					<p>No feedback given</p>
					:
					<table>
						<tbody>
							<StatisticLine text="good" value={good} />
							<StatisticLine text="neutral" value={neutral} />
							<StatisticLine text="bad" value={bad} />
							<StatisticLine text="all" value={all} />
							<StatisticLine text="average" value={average.toFixed(1)} />
							<StatisticLine text="positive" value={`${positive.toFixed(1)} %`} />
						</tbody>
					</table>
			}
		</div>
	)
}


export default function App() {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<>		
			<div>
				<h1>give feedback</h1>
				<Button text="good" handleClick={() => setGood(good + 1)} />
				<Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
				<Button text="bad" handleClick={() => setBad(bad + 1)} />
			</div>
			<Statistics good={good} bad={bad} neutral={neutral} />
		</>
	)
}
