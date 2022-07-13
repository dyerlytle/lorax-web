import React, { Component } from 'react';
import im1 from "./assets/images/dumbbell-bw.jpg";
import im2 from "./assets/images/eagle_nebula-bw.jpg";

class GateKeeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    let divStyle = {
      backgroundImage: `url(${im1})`,
      height: `100%`
    };
    let inputStyle = {
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
    };
    // change code below this line
    const char = 15;
    if (this.state.input.length > char) {
      divStyle = { backgroundImage: `url(${im2})`, height: `100%` }
    }
    // change code above this line
    return (
      <div style={divStyle} >
        <h3>Don't Type Too Much:</h3>
        <input
          type="text"
          style={inputStyle}
          value={this.state.input}
          onChange={this.handleChange} />
      </div>
    );
  }
};

export default GateKeeper;