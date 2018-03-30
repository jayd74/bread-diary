import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import DiaryEntry from './diaryEntry';
import DiaryInput from './diaryInput';

// create a diary to store information about bread
// require authentication to store information
// each entry will be pushed to firebase
// each entry will have fields 
//    date, water amount, texture, time proofed

var config = {
  apiKey: "AIzaSyDVFg6N26ASHQr6R6oMn8DKyKGF6fNkITk",
  authDomain: "bread-diary.firebaseapp.com",
  databaseURL: "https://bread-diary.firebaseio.com",
  projectId: "bread-diary",
  storageBucket: "bread-diary.appspot.com",
  messagingSenderId: "233604991561"
};
firebase.initializeApp(config);

class App extends React.Component {
    constructor() {
      super()
      this.state = {
          user: null,
          breadEntries:[],
          name: '',
          date: '',
          instructions: '',
          description: '',
          newEntry: false,
          deleted: false
      }
      this.onChange = this.onChange.bind(this);
      this.addEntry = this.addEntry.bind(this);
      this.deleteEntry = this.deleteEntry.bind(this);
      this.newEntry = this.newEntry.bind(this);
      this.closeEntry = this.closeEntry.bind(this);
    }
    onChange(e){
      this.setState({
          [e.target.id]: e.target.value
      })
    }
    newEntry() {
      this.setState({
        newEntry: true
      })
    }
    closeEntry(){
      this.setState({
        newEntry: false
      })
    }
    addInstruction() {
    console.log('click')
    }
    addEntry(e) {
      e.preventDefault();
      const entry = {
        name: this.state.name,
        date: this.state.date,
        instructions: this.state.instructions,
        description: this.state.description
      }
      const dbref = firebase.database().ref(`bread-entries/`);  
      dbref.push(entry)
      
      this.setState({
        name: '',
        date: '',
        instructions: '',
        description: ''
      })
    }
    deleteEntry(entryKey){
      let entryDelete = this.state.breadEntries.find((entry) => {
        return entry.key === entryKey
      });
      const dbRef = firebase.database().ref(`/bread-entries/${entryKey}`).remove();
    }
    componentDidMount(){
      const dbRef = firebase.database().ref(`/bread-entries/`);
      dbRef.on('value', (entries) => {
        const data = entries.val();
        const state = [];
        for (let key in data) {
          data[key].key = key;
          state.push(data[key])
        }
          this.setState({
            breadEntries: state
         })
      })
    }
    render() {
      return (
        <Fragment>
           
         {this.state.newEntry === false ? 
          <button onClick={this.newEntry}>Add Entry</button>
        : 
          <button onClick={this.closeEntry}>Close</button>
         }

        {this.state.newEntry === true ? 
          <DiaryInput onChange={this.onChange} onSubmit={this.addEntry} addInstruction={this.addInstruction}/> 
        : null} 
         
        <div className="diary-container">
          {this.state.breadEntries.map((entry) => {
              return (
                <DiaryEntry data={entry} key={entry.key} deleteEntry={this.deleteEntry} />
             )
            }
          )}
        </div>
        </Fragment>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
