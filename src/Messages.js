import {Component} from "react";
import React from "react";
import avatar1 from "./img/firstKitty.jpg";
import avatar2 from "./img/secondKitty.jpg";
import avatar3 from "./img/thirdKitty.jpg";
import avatar4 from "./img/fourthKitty.jpg";
import avatar5 from "./img/fifthKitty.jpg";

function randomAvatar(){
  const imgPaths=[avatar1,avatar2,avatar3,avatar4,avatar5];
  const randomImg=imgPaths[Math.floor(Math.random() * imgPaths.length)];
  return randomImg;
}


class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const myMessage = member.id === currentMember.id;
    const className = myMessage ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
            <img src={randomAvatar()} />
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      ></span>
      
        <div className="Message-content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;