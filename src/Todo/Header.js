import React, { Component } from 'react';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputVal: '',
      priority: 'low',
      isValid: true,
    }
  }

  getDotoItem = (e) => {
    this.setState({
      inputVal: e.target.value
    })
  }
1
  handleAddTodo = (event) => {
    event.preventDefault();

    if (this.state.inputVal){

      this.props.handleAddTodo(this.state.inputVal, this.state.priority);

      this.setState( {
        inputVal: '',
        isValid: true
      } )


    } else {
      this.setState({isValid: false})
    }
  }

  handleDotoPriority = (e) => {
    if (e.target && e.target.tagName === 'INPUT'){
      this.setState( {
        priority: e.target.value,
      } );
    }

  }

  getInputStyle(){
    let inputStyle = {};
    
    if (!this.state.isValid){
      inputStyle = {
        border: '1px solid red',
        boxShadow: '0 0 3px 1px red'
      }
    } else {
      inputStyle = {
        border: '1px solid black',
        boxShadow: 'none'
      }
    }
    
    return inputStyle
  }


  

  render() {
    return (
      <div className="wrap_header">
        <form className="todo_inp" onSubmit={this.handleAddTodo}>
          <label htmlFor="Todo_inp" className="inp_label">ToDo: </label>

          <input 
            style={this.getInputStyle()} 
            type="text" autoComplete="off" 
            name="Todo_inp" placeholder="Write your todo..." 
            value={this.state.inputVal} 
            onChange={this.getDotoItem}/>
          
          <button>Create</button>
          
          <div className="wrap_priority" onClick={this.handleDotoPriority}>
            <label htmlFor="prior" className="prior_lab">Priority:</label>
            <input type="radio" name="prior" value="low"/><span>Low</span>
            <input type="radio" name="prior" value="normal"/><span>Normal</span>
            <input type="radio" name="prior" value="high"/><span>High</span>
          </div>
          
        </form>
      </div>
    );
  }
}

export default Header;