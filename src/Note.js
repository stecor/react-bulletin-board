import React, { Component } from 'react';

export default class Note extends Component {

    render(){
      return(
        <div className="note">
          <p>Learn React</p>
          <span>
              <button>Edit</button>
              <button>Remove</button>
          </span>
        </div>
      )
    }
}
