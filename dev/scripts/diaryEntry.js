import React from 'react'


// class DiaryEntry extends React.Component {
//     constructor(props){
//         super(props)
//         // this.state = {
//         //     breadEntries: {
//         //         name: '',
//         //         date: '',
//         //         consistency: '',
//         //         description: ''
//         //     }
//         // }
//         // console.log(this.state)
//         // this.addEntry = this.addEntry.bind(this)
//     }
//     // addEntry(e){
//     //     let breadEntriesState = this.state.breadEntries[e.target.id];
//     //     console.log(this.props)
//         // this.setState({
//         //     breadEntriesState: e.target.value
//         // })
//         // console.log(this.state)
//     // }
//     render(props) {
//         console.log(props)
//         return (
//             <div className="diary-entry">
                
//                 <h3>Nick Name</h3>
//                 <input type="text" id="name" onChange={props.addEntry} value={props.breadEntries.name}/>
//                 <h3>Date</h3>
//                 <input type="text" id="date" onChange={props.addEntry} value={props.breadEntries.date}/>
//                 <h3>consistency</h3>
//                 <input type="text" id="consistency" onChange={props.addEntry} value={props.breadEntries.consistency}/>
//                 <h3>description</h3>
//                 <input type="text" id="description" onChange={props.addEntry} value={props.breadEntries.description}/>

//                 <button type="submit">Submit</button>
//             </div>
//         )
//     }
// }

const DiaryEntry = (props) => {
    console.log(props)

    return (
        <div className="diary-entry">
            <h3>{props.data.name}</h3>
            <h3>{props.data.date}</h3>
            <h3>{props.data.description}</h3>
            <h3>{props.data.consistency}</h3>
        </div>
    )
}

export default DiaryEntry