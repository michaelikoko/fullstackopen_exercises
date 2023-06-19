import { useState } from "react"

function DisplayAnecdote({anecdotes, votes}) {
	return (
		<>
			<div>{anecdotes}</div>
			<div>has {votes} votes</div>
		</>
	)
}

export default function App() {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.'
	]

	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(Array(8).fill(0))

	function randomAnecdote() {
		let index;
		do {
			index = Math.floor(Math.random() * anecdotes.length)
		} while (index === selected)
		setSelected(index)
	}

	function vote() {
		const copy = [...votes]
		copy[selected] += 1
		setVotes(copy)
	}

	const mostVotesIndex = votes.findIndex((element) => element === Math.max(...votes))
	return (
		<>
			<div>
				<h2>Anecdote of the day</h2>
				<DisplayAnecdote anecdotes={anecdotes[selected]} votes={votes[selected]}/>
				<div>
					<button onClick={vote}>vote</button>
					<button onClick={randomAnecdote}>next anecdote</button>
				</div>
			</div>
			<div>
				<h2>Anecdote with most votes</h2>
				<DisplayAnecdote anecdotes={anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]} />
			</div>
		</>
	)
}