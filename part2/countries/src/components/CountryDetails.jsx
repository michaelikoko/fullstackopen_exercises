
export default function CountryDetails({suggestions}) {
    return (
        <>
            <h1>{suggestions[0].name.common}</h1>
            <p>capital {suggestions[0].capital[0]}</p>
            <p>area {suggestions[0].area}</p>
            <h3>languages:</h3>
            <ul>
                {
                    Object.values(suggestions[0].languages).map(language => (
                        <li key={language}>{language}</li>
                    ))
                }
            </ul>
            <img src={suggestions[0].flags.png} alt={`${suggestions[0].name.common}'s flag`} />
        </>
    )
}