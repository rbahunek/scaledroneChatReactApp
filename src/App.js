import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";


function randomName() {
  const adjectives = [
    "Javascript", "", "", "Undefined", "Missing" 
  ];
  const nouns = [
    "object", "function", "parameter", "const", "var"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + " " + noun;
}

function randomHexColor() {
  var colorValue= Math.floor(Math.random()*16777215).toString(16);
  return '#' + colorValue;
  // pronašla na https://css-tricks.com/snippets/javascript/random-hex-color/
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomHexColor()
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("I1derkFDfROUcLWb", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });

    //Ovaj dio je iz scaledronove dokumentacije i tutoriala: https://www.scaledrone.com/blog/tutorial-build-a-reactjs-chat-app/
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome Hackers!</h1>      
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;