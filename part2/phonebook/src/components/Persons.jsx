
export default function Persons({ displayedPersons, deletePerson }) {
    return (
        <>
            {
                displayedPersons.map(person => (
                    <div key={person.id}>
                        {person.name} {person.number} 
                        <button onClick={() => deletePerson(person.id)}>delete</button>
                    </div>
                ))
            }

        </>
    )
}