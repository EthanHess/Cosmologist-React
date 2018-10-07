import React, { Component } from 'react'; 
import './Archive.css'; 

//TODO see if this works
// import FaTrash from "react-icons/lib/fa/trash";
// import FaPencil from "react-icons/lib/fa/pencil";

export default class Archive extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            editing: false, 
            text: this.props.text
        }

        this.handleChange = this.handleChange.bind(this); 
        this.edit = this.edit.bind(this); 
    }

    handleChange(event) {
        this.setState({ text: event.target.value }); 
    }

    edit(event) {
        const { text } = this.state; 
        const { id, edit } = this.props; 
        if (event.key === "Enter" && text.length !== 0) {
            edit(id, text); 
            this.setState({ editing: false });
        } else {
            //alert? 
        }
    }

    render() {
        //Todo: Add font awesome? 
        console.log('this.props', this.props); 
        const { id, text, imageURL, editArchive, deleteArchive } = this.props; 
        const { editing } = this.state; 
        return (
            <div className="Archive_container">
                <span className="Archive_time"></span>
                {/* TODO make class, this is a test */}
                <img src={imageURL} />
                {
                    editing ? 
                    <input className="Archive_input" value={this.state.text} onChange={this.handleChange} onKeyPress={this.edit}/>
                    :
                    <span className="Archive_text">{text}</span>
                }
                <span className="Archive_edit" onClick={ () => this.setState({ editing: !this.state.editing, text })}>Font Awesome Here</span>
                <span className="Archive_delete" onClick={ () => deleteArchive(id) }>Other Font Awesome</span> }
            </div>
            //Leave out time but we'll have this here temporarily just in case
        )
    }
}