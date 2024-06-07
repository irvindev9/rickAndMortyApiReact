import { Component } from "react";

class SearchBtn extends Component {
  constructor(){
    super();
    this.state = {
      mensaje: ""
    }
  }
  render(){
    const { onChangeHandler } = this.props;
    return (
      <input 
        placeholder="Search"
        type="search" 
        onChange={(event) => onChangeHandler(event.target.value)}
      />
    )
  }
}

export default SearchBtn;