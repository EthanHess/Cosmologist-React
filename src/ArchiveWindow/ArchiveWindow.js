import React, { Component } from 'react'; 
import './ArchiveWindow.css'; 

import axios from "axios";
import url from '../api'; 

import Archive from './Archive/Archive'; 

//add date creator? 

export default class ArchiveWindow extends Component {
    constructor() {
        super(); 
        this.state = {
            archives: [], 
        }
    }

    fetchArchives() {
        axios.get(url).then(res => {
            this.setState({ archives: res.data }); 
        }); 
    }

    //Eventually this will be for updating, but initial text will be passed down from props

    // handleTextInput(event) {
    //     this.setState({ text: event.target.value }); 
    // }

    //We're going to want to get the imageURL from main page eventually. Use props. 
    createArchive(event) {
        const { text } = this.state; 
        if (event.key === "Enter" && text.length !== 0) {
            const newArchive = {
                text: this.props.text,
                nasaURL: this.props.nasaURL
            }
            axios.post(url, newArchive).then(response => {
                this.setState({ archives: response.data }); 
            });
        } else {
            alert("Please enter some text!"); 
        }
    }

    updateArchive(id, text) {
        axios.put(url + `/${id}`, { text }).then(response => {
            this.setState({ archives: response.data }); 
        }); 
    }

    editArchive(id) {
        axios.delete(url + `/${id}`).then(response => { 
            this.setState({ archives: response.data }); 
        }); 
    }

    render() {
        return (
          <div id="ArchiveWindow_container">
            <div id="ArchiveWindow_archParentContainer">
              <div id="ArchiveWindow_archChildContainer">
                    {
                      this.state.archives.map(archive => (
                        <Archive id={archive.id} 
                        key={archive.id} 
                        text={archive.text} 
                        editArchive ={this.editArchive} 
                        deleteArchive={this.deleteArchive}/>
                      ))
                    }
              </div>
            </div>
          </div>
        )
    }
}
