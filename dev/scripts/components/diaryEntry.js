import React from 'react'


const DiaryEntry = (props) => {
    // console.log(props)
    return <div className="diary-entry">
        <label htmlFor="diaryEntry-close">
          <i className="fas fa-times-circle" />
        </label>
        <input type="button" onClick={props.hideEntry} id="diaryEntry-close" />
        <div className="diaryEntry-header">
          <div className="diaryEntry-item" id="sourdough-heading">
            <h3>Sourdough</h3>
            <p>{props.data.count}</p>
          </div>
          <div className="diaryEntry-item">
            <h3>Prep Date</h3>
            <p>{props.data.prepdate}</p>
          </div>
          <div className="diaryEntry-item">
            <h3>Bake Date</h3>
            <p>{props.data.bakedate}</p>
          </div>
        </div> {/* end diaryEntry-header */}
        <div className="diaryEntry-section-small">
          <div className="diaryEntry-item">
            <h3>Leave</h3>
            <p className="pre-line">{props.data.leaven}</p>
          </div>
          <div className="diaryEntry-item">
            <h3>Dough</h3>
            <p className="pre-line">{props.data.dough}</p>
          </div>
        </div>
        <div className="diaryEntry-section-large">
          <div className="diaryEntry-item">
            <h3>Instructions</h3>
            <p className="pre-line">{props.data.instructions}</p>
          </div>
        </div>
        <div className="diaryEntry-section-large">
          <div className="diaryEntry-item">
            <h3>Retrospective</h3>
            <p className="pre-line">{props.data.retrospective}</p>
          </div>
        </div>
        
        <button onClick={() => props.deleteEntry(props.data.key)} id={props.data.key}>
          DELETE
        </button>
      </div>;
}

export default DiaryEntry