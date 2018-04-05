import React from 'react'


const DiaryTile = (props) => {
    return (
        <div className="diary-tile">
            <h3>Sourdough #{props.data.count}</h3>
            <h3>{props.data.bakedate}</h3>
            <input type="button" onClick={props.showEntry} value="show" id={props.data.key}/>
        </div>
    )
}

export default DiaryTile