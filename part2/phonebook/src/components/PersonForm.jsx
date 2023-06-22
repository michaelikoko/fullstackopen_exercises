
export default function PersonForm({addNewName, newName, newNum, handleNameChange, handleNumChange}) {
    return (
        <form onSubmit={addNewName}>
            <div>
                name: <input value={newName} onChange={handleNameChange} required />
            </div>
            <div>
                number: <input value={newNum} onChange={handleNumChange} required />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}