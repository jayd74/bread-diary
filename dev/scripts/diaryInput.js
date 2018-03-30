import React from 'react'

const DiaryInput = (props) => {
        console.log(props)
        return (
            <form onSubmit={props.onSubmit}>
                <h3>Nick Name</h3>
                <input type="text" id="name" onChange={props.onChange} value={props.data.name} />
                <h3>Date</h3>
                <input type="date" id="date" onChange={props.onChange} value={props.data.date} />

                <h3>instructions</h3>
                {/* {props.data.instructions.map((input) => (
                <div> */}
                    <textarea type="text" id="instructions" onChange={props.onChange} value={props.data.instructions} />
                    {/* <input type="button" onClick={props.addInstruction} onChange={props.onChange} value="Add Instruction"/> */}
                {/* </div>
                ))} */}
                
                
                {/* <h3>time</h3>
                <input type="time" id="instructions" onChange={props.onChange} value={props.data.instructions} /> */}
                <h3>Retrospective</h3>
                <textarea type="text" id="description" onChange={props.onChange} value={props.data.description} />
                <button type="submit">Submit</button>
        </form>
        )
}

// class DiaryInput extends React.Component {
//     constructor(){
//         super()
//         // this.addInstruction = this.addInstruction.bind(this);
//     }
    
//     render() {
//         return (
//             <form onSubmit={this.props.onSubmit}>
//                 <h3>Nick Name</h3>
//                 <input type="text" id="name" onChange={this.props.onChange} value={this.props.name} />
//                 <h3>Date</h3>
//                 <input type="date" id="date" onChange={this.props.onChange} value={this.props.date} />
//                 <h3>instructions</h3>
//                 <input type="text" id="instructions" onChange={this.props.onChange} value={this.props.instructions} />
//                 <button onClick={this.props.addInstruction}>Add Instructions</button>
//                 <h3>description</h3>
//                 <input type="text" id="description" onChange={this.props.onChange} value={this.props.description} />
//                 <button type="submit">Submit</button>
//             </form>
//         )   
//     }
// }

export default DiaryInput;