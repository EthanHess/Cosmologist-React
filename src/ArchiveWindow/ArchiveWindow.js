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

    createArchive() {
        console.log("CHILD FUNCTION CALLED! :)"); 
        const { text } = this.state; 
        const newArchive = {
            text: this.props.inputText,
            nasaURL: this.props.nasaURL
        }
        axios.post(url, newArchive).then(response => {
            this.setState({ archives: response.data }); 
        });
    }

    updateArchive(id, text) {
        axios.put(url + `/${id}`, { text }).then(response => {
            this.setState({ archives: response.data }); 
        }); 
    }

    deleteArchive(id) {
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
                        imageURL={archive.nasaURL}
                        editArchive ={this.updateArchive} 
                        deleteArchive={this.deleteArchive}/>
                      ))
                    }
              </div>
            </div>
          </div>
        )
    }
}
