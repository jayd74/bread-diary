import React from 'react'
import FileUploader from 'react-firebase-file-uploader';

const DiaryInput = (props) => {
        return (
            <div className="diary-entry">
                <form onSubmit={props.onSubmit}>
                    <label htmlFor="diaryInput-close"><i className="fas fa-times-circle"></i></label>
                    <input type="button" id="diaryInput-close" onChange={props.onChange} onClick={props.closeEntry} />                    
                    <div className="diaryEntry-header">
                        <div className="diaryEntry-item" id="sourdough-heading">
                            <h3>Sourdough</h3>
                            <p>{props.data.count}</p>
                        </div>
                        
                        <div className="diaryEntry-item diaryInput-item">
                            <h3>Prep Date</h3>
                            <input type="date" id="prepdate" onChange={props.onChange} value={props.data.prepdate} />
                        </div>
                        
                        <div className="diaryEntry-item diaryInput-item">
                            <h3>Bake Date *</h3>
                            <input type="date" id="bakedate" onChange={props.onChange} value={props.data.bakedate} required/>
                        </div>
                    </div>

                    <div className="diaryEntry-section-small">
                        <div className="diaryEntry-item diaryInput-item">
                            <h3>Leaven</h3>
                            <textarea type="text" id="leaven" onChange={props.onChange} value={props.data.leaven} placeholder="List Ingredients Used"/>
                        </div>

                        <div className="diaryEntry-item diaryInput-item">
                            <h3>Dough</h3>
                            <textarea type="text" id="dough" onChange={props.onChange} value={props.data.dough} placeholder="List Ingredients Used"/>
                        </div>
                    </div>

                    <div className="diaryEntry-section-large">
                        <div className="diaryEntry-item diaryInput-item">
                            <h3>instructions</h3>
                        </div>
                        <div> */}
                            <textarea type="text" id="instructions" onChange={props.onChange} value={props.data.instructions} placeholder="Steps you took to make the bread"/>
                        </div>
                    </div>
                
                    <div className="diaryEntry-section-large">
                        <div className="diaryEntry-item diaryInput-item">
                            <h3>Retrospective *</h3>
                            <textarea type="text" id="retrospective" onChange={props.onChange} value={props.data.retrospective} required placeholder="How did it turn out?"/>
                        </div>
                    </div>

                    {/* <input type="file" name="image" id="image" imgUpload={props.imgUpload}/> */}
                <button type="submit">Save</button>
                </form>
                
            </div>
        )
}

export default DiaryInput;