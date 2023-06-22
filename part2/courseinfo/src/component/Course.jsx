function Header({ course }){
    return(
        <h2>{course}</h2>
    )
}

function Part({ part }){
    return(
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

function Content({ parts }){
    return(
        <>
            {
                parts.map(part => (
                    <Part part={part} key={part.id}/>
                ))
            }
        </>
    )
}

function Total({ sum }){
    return(
        <p><strong>total of {sum} exercises</strong></p>
    )
}


export default function Course({course}){
    const sum = course.parts.reduce((accumulator, part) => {
        return accumulator + part.exercises;
    }, 0)

    return(
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={sum} />
        </div>
    )
}

