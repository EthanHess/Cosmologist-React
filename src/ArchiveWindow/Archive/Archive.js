import React, { Component } from 'react'; 
import './Archive.css'; 

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
            this.setState({ editing: false });; 
        } else {
            //alert? 
        }
    }

    render() {
        const { id, text, editArchive, deleteArchive } = this.props; 
        const { editing } = this.state; 
        return (
            <div></div>
        )
    }
}