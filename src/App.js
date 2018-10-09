import React, { Component } from 'react';
import './App.css';

import ArchiveWindow from './ArchiveWindow/ArchiveWindow'; 

import axios from 'axios'; 

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      imageURL: "CosmoNasaBG.png",
      explanation: "",
      zip: 19003 //empty? 
    }
    this.child = React.createRef(); 
    this.create = this.create.bind(this); 
    this.fetchWeatherData = this.fetchWeatherData.bind(this); 
  }

  //NOTE: This will return a video sometimes so check 
  fetchNasaData() {
    console.log('---CLICKED---'); 
    const apiKey = "nKSlklNflzmjDb9rOForb7kQBrS5xLhhnEaDgNvv"; 
    const fullURLNasa = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`; 

    axios.get(fullURLNasa).then(res => {
      console.log('res.data', res.data); 
      console.log('res.data.media_type', res.data.media_type); 
      console.log('res.data.explanation', res.data.explanation); 
      if (res.data.media_type === "image") {
        this.setState({
          imageURL: res.data.url, 
          explanation: res.data.explanation, 
          input: ''
        }); 
      } else {
        console.log('--- VIDEO ---'); 
      }
    }); 
  }

  fetchWeatherData() {
    const apiKey = "bf7530b76d7a12467797821f211df585"; 
    const fullWeatherURL = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip}&units=imperial&appid=${apiKey}`; 
    axios.get(fullWeatherURL).then(res => {
      console.log('res.data', res.data); 
    }); 
  }

  handleInput(val) {
    this.setState({ input: val }); 
  }

  create() {
    this.child.current.createArchive()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="cosmologist">
            <img src="CosmoLogoReact.png"></img>
            <button onClick={this.fetchWeatherData}> Weather </button>
          </div>
          <img src={this.state.imageURL} className="App-logo" alt="logo" />
          <button onClick={ ()=> this.fetchNasaData() } >Get APOD</button>
          <p>{this.state.explanation}</p>
        </header>
        <main>
          <div id="text_div">
            <input placeholder="Enter caption!" onChange={ (event)=> this.handleInput(event.target.value)}></input>
            <button onClick={ this.create }>Save Archive</button>
          </div>
          <div>
            <ArchiveWindow ref={ this.child } nasaURL={this.state.imageURL} inputText={this.state.input}/> 
          </div>
        </main>
      </div>
    );
  }
}

export default App;
