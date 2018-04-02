import React from 'react'


const DiaryTile = (props) => {
    // console.log(props.data)
    return (
        <div className="diary-tile">
            <button onClick={() => props.deleteEntry(props.data.key)} id={props.data.key}><i className="far fa-trash-alt"></i></button>
            <h3>Sourdough #{props.data.count}</h3>
            <h3>{props.data.bakedate}</h3>
            <input type="button" onClick={props.showEntry} value="show" id={props.data.key}/>
        </div>
    )
}

export default DiaryTile