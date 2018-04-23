import React, {Component} from 'react';
import FaPlus from 'react-icons/lib/fa/plus'
import Note from './Note';



export default class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      notes: [],
      count: 50
    }
    this.eachNote = this.eachNote.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.nextId = this.nextId.bind(this);
  }

  componentWillMount(){
    var self = this
    if(this.state.count) {
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.state.count}`)
            .then(response => response.json())
            .then(json => json[0]
                              .split('. ')
                              .forEach(sentence => self.add(sentence.substring(0, 25))))
    }
  }

  update(newText, i){
    console.log('updating item at index', i, newText);
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i) ? note : {...note, note: newText}
      )
     }))
  }

  add(text){
    this.setState(prevState => ({
      notes:[
        ...prevState.notes,
        {
          id: this.nextId(),
          note: text
        }
      ]
    }))
  }

  nextId(){
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  remove(id){
    console.log('removing item at', id );
    this.setState(prevState => ({
      notes:prevState.notes.filter(note => note.id !== id)
    }))
  }

  eachNote(note,index){
    return(
      <Note key={note.id} index={note.id} onChange={this.update} onRemove={this.remove}>
      {note.note}
      </Note>
    )
  }

  render(){
    return(
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={this.add.bind(null, "New Note")} id="add">
          <FaPlus />
        </button>
      </div>
    )
  }

}
