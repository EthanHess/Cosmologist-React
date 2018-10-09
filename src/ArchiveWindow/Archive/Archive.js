import React, { Component } from 'react'; 
import './Archive.css'; 

// import FaTrash from "react-icons/lib/fa/trash";
//import FaPencil from "react-icons/lib/fa/pencil";

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
        console.log('id and text', id, text); 
        if (event.key === "Enter" && text.length !== 0) {
            this.props.editArchive(id, text); 
            this.setState({ editing: false });
        } else {
            //alert("HELLO WORLD");
            console.log("Not enter"); 
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
                <div><img src={imageURL} /></div>
                <div>
                
                
                {
                    editing ? 
                    <input className="Archive_input" value={this.state.text} onChange={this.handleChange} onKeyPress={ (e) => this.edit(e) } placeholder="Update"/>
                    :
                    <p className="Archive_text">{text}</p>
                }
                </div>
                <div>

                <button className="Archive_edit" onClick={ (et) => this.setState({ editing: !this.state.editing, text }) }> Edit </button>
                <button className="Archive_delete" onClick={ () => deleteArchive(this.props.id) }> Delete </button>
                </div>
            </div>
            //Leave out time but we'll have this here temporarily just in case
        )
    }
}