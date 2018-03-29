import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import DiaryEntry from './diaryEntry';

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
          consistency: '',
          description: ''
      }
      this.onChange = this.onChange.bind(this);
      this.addEntry = this.addEntry.bind(this);
    }
    onChange(e){
      this.setState({
          [e.target.id]: e.target.value
      })
    }
  // addEntry(e) {
  //   let breadEntriesState = this.state.breadEntries[e.target.id];
  //   console.log(breadEntriesState)
  // }
    addEntry(e) {
      e.preventDefault();
      const entry = {
        name: this.state.name,
        date: this.state.date,
        consistency: this.state.consistency,
        description: this.state.description
      }

      const dbref = firebase.database().ref(`bread-entries/`);  
      dbref.push(entry)
      
      this.setState({
        name: '',
        date: '',
        consistency: '',
        description: ''
      })
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
            <form onSubmit={this.addEntry}>
              <h3>Nick Name</h3>
              <input type="text" id="name" onChange={this.onChange} value={this.state.name}/>
              <h3>Date</h3>
              <input type="date" id="date" onChange={this.onChange} value={this.state.date}/>
              <h3>consistency</h3>
              <input type="text" id="consistency" onChange={this.onChange} value={this.state.consistency}/>
              <h3>description</h3>
              <input type="text" id="description" onChange={this.onChange} value={this.state.description}/>
              <button type="submit">Submit</button>
            </form>
        
        {this.state.breadEntries.map((entry) => {
          return (
            <DiaryEntry data={entry} key={entry.key}/>
          )
        }
        )}
        </Fragment>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
