import React from 'react'


const DiaryEntry = (props) => {
    // console.log(props)
    return (
        <div className="diary-entry">
            <button onClick={() => props.deleteEntry(props.data.key)} id={props.data.key}>Delete</button>
            <h3>{props.data.name}</h3>
            <h3>{props.data.date}</h3>
            <h3>{props.data.description}</h3>
            <h3>{props.data.consistency}</h3>
        </div>
    )
}

export default DiaryEntry