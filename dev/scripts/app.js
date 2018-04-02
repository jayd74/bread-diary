import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import DiaryEntry from './components/diaryEntry';
import DiaryInput from './components/diaryInput';
import DiaryTile from './components/diaryTile';
import InputField from './components/inputField';

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
          leaven: '',
          dough: '',
          prepdate: '',
          bakedate: '',
          instructions: '',
          retrospective: '',
          image: [],
          imgURL: '',
          newEntry: false,
          loggedIn: false,
          showDiaryEntry: false
      }
      this.onChange = this.onChange.bind(this);
      this.addEntry = this.addEntry.bind(this);
      this.deleteEntry = this.deleteEntry.bind(this);
      this.newEntry = this.newEntry.bind(this);
      this.showEntry = this.showEntry.bind(this);
      this.hideEntry = this.hideEntry.bind(this);
      this.closeEntry = this.closeEntry.bind(this);
      this.googleSignIn = this.googleSignIn.bind(this);
      this.signOut = this.signOut.bind(this);
      // this.imgUpload = this.imgUpload.bind(this);
    }
    googleSignIn(){
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      this.setState({
        loggedIn: true
      })
    }
    guestSignIn(){
      firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }
    signOut(){
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
      this.setState({
        loggedIn: false
      })
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
    showEntry(e,i){
      this.setState({
        showDiaryEntry: true,
        entryToShow: this.state.breadEntries[i]
      })
      console.log(this.state.breadEntries[i])
    }
    hideEntry(){
      console.log('hide')
      this.setState({
        showDiaryEntry: false
      })
    }
    addEntry(e,i) {
      e.preventDefault();
      let userID = this.state.user
      const entry = {
        leaven: this.state.leaven,
        dough: this.state.dough,
        prepdate: this.state.prepdate,
        bakedate: this.state.bakedate,
        instructions: this.state.instructions,
        retrospective: this.state.retrospective,
        count: this.state.breadEntries.length + 1,
        image: this.state.image
      }
      const dbref = firebase.database().ref(`/users/${userID}/bread-entries/`);  
      dbref.push(entry)
      
      this.setState({
        leaven: '',
        dough: '',
        prepdate: '',
        bakedate: '',
        instructions: '',
        retrospective: '',
      })
    }
    // imgUpload(imgfile){
    //   this.setState({
    //     image: imgfile,
    //   })
    // }
    deleteEntry(entryKey){
      let userID = this.state.user

      let entryDelete = this.state.breadEntries.find((entry) => {
        return entry.key === entryKey
      });
      const dbRef = firebase.database().ref(`/users/${userID}/bread-entries/${entryKey}`).remove();
    }
    componentDidMount(){
          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.setState({
                  loggedIn: true,
                  user: user.uid,
                  userName: user.displayName
                })

                let userID = this.state.user

                const dbRef = firebase.database().ref(`/users/${userID}/bread-entries/`);
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
          })
    }
    render() {
      return (
        <Fragment>
          <div className="wrapper">
            <h1>Bread Diary</h1>
            <div className="sign-in-btn">
              <button className={this.state.loggedIn ? "hide" : "sign-in-out"} onClick={this.guestSignIn}>Sign In As Guest</button>
              <button className="sign-in-out" onClick={this.state.loggedIn ? this.signOut : this.googleSignIn}>
              {this.state.loggedIn ? <div><p>Sign Out {this.state.userName}</p></div> : <div><span><i className="fab fa-google"></i></span>Sign In</div>}
              </button>
            </div>

          <div className={this.state.loggedIn ? "hide" : "intro"}>
            <blockquote>Keep track of the bread that you make and track each loaf</blockquote>
          </div>
        
          <div className={this.state.loggedIn ? "bread-diary-account" : "hide"}>
         
            <div className="diary-container">
              {this.state.showDiaryEntry === true ? 
                  <DiaryEntry data={this.state.entryToShow} key={this.state.breadEntries.key} deleteEntry={this.deleteEntry} showEntry={this.showEntry} hideEntry={this.hideEntry}/>
                :
                this.state.breadEntries.map((entry, i) => {
                return (
                  <DiaryTile data={entry} key={entry.key} deleteEntry={this.deleteEntry} showEntry={(e) => this.showEntry(e, i)} />
                )
                })
              } 

              {this.state.newEntry === true ? 
                <DiaryInput data={this.state} onChange={this.onChange} onSubmit={this.addEntry} addInstruction={this.addInstruction} closeEntry={this.closeEntry}/> 
                : 
                <div className={this.state.showDiaryEntry === true ? "hide" : "diary-tile"}>
                  <button onClick={this.newEntry} className="diary-tile-add"><i className="fas fa-plus-circle"></i></button>        
                </div>
              } 
         
            </div> {/* end diary-container */}
          </div> {/* end bread-diary-account div */}
        </div> {/* end wrapper */}
        </Fragment>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
