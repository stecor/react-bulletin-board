import React, {Component} from 'react';
import Note from './Note';


export default class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      notes: [
        {
          id:0,
          note: "Call Lisa"
        },
        {
          id:1,
          note: "Email John"
        },
        {
          id:2,
          note: "Order printer ink"
        }
      ]
    }
    this.eachNote = this.eachNote.bind(this);
    this.update = this.update.bind(this);
  }


  update(newText, index){
    console.log('updating item at index', index, newText);
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== index) ? note : {...note, note: newText}
      )
     }))
  }

  eachNote(note,index){
    return(
      <Note key={index} index={index} onChange={this.update}>
      {note.note}
      </Note>
    )
  }

  render(){
    return(
      <div className="board">
        {this.state.notes.map(this.eachNote)}
      </div>
    )
  }

}
