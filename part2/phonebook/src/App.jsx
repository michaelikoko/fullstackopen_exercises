import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from "./services/phonebook"
import Alert from './components/Alert'
import './index.css'


export default function App() {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNum, setNewNum] = useState("")
	const [searchTerm, setSearchTerm] = useState('')
	const [alertMessage, setAlertMessage] = useState(null)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		console.log('effect')
		phoneService
			.getAll()
			.then(persons => {
				setPersons(persons)
			})
	}, [])

	function handleNameChange(event) {
		setNewName(event.target.value)
	}

	function handleNumChange(event) {
		setNewNum(event.target.value)
	}

	function handleSearchChange(event) {
		setSearchTerm(event.target.value)
	}

	const displayedPersons = searchTerm ?
		persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
		:
		persons

	function addNewName(event) {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNum,
		}
		if (persons.find(person => person.name === newName)) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
				const updatePerson = persons.find(person => person.name === newName)
				const changedPerson = { ...updatePerson, number: newNum }
				phoneService
					.update(updatePerson.id, changedPerson)
					.then(returnedPerson => {
						setPersons(persons.map(person => person.id !== updatePerson.id ? person : returnedPerson))
						setAlertMessage(
							`${returnedPerson.name} number has been changed`
						)
						setTimeout(() => {
							setAlertMessage(null)
						}, 5000)
						setNewName('')
						setNewNum('')
					})
					.catch(error => {
						setIsError(true)
						setAlertMessage(
							`Information of ${updatePerson.name} has already been removed from the server`
						)
						setTimeout(() => {
							setAlertMessage(null)
							setIsError(false)
						}, 5000)
						setPersons(persons.filter(p => p.id !== updatePerson.id))
					})
			}
		} else {
			phoneService
				.create(personObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setAlertMessage(
						`Added ${returnedPerson.name}`
					)
					setTimeout(() => {
						setAlertMessage(null)
					}, 5000)
					setNewName('')
					setNewNum('')
				})
		}
	}

	function deletePerson(id) {
		const confirmPerson = persons.find(person => person.id === id)
		if (window.confirm(`Delete ${confirmPerson.name} ?`)) {
			phoneService
				.deleteObj(id)
				.then(response => {
					setPersons(persons.filter(person => person.id !== id))
				})
		}

	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Alert message={alertMessage} isError={isError} />
			<Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
			<div>
				<h3>add a new</h3>
				<PersonForm addNewName={addNewName} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
			</div>
			<div>
				<h3>Numbers</h3>
				<Persons displayedPersons={displayedPersons} deletePerson={deletePerson} />
			</div>
		</div>
	)
}

