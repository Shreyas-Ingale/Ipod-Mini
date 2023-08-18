// Importing React, Zingtouch and different Components
import React from "react";
import ZingTouch from 'zingtouch'; // used for circular sliding the controller to access the menu items
import Display from "./components/Display";
import Controller from "./components/Controller";
import songs from "./assets/songs/songs"; // importing songs used
import { posters, wallpapers } from "./assets/images/images"; // importing images used
import ErrorBoundary from "./components/ErrorBoundary"; //importing ErrorBoundary to handle errors

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // different menus along with currently visible one
      mainMenu: ['Cover Flow', 'Games', 'Music', 'Settings'],
      musicMenu: ['Songs', 'Albums', 'Artists', 'Playlists'],
      settingsMenu: ['Change Wallpaper', 'Rotate', 'About'],
      currMenuContent: ['Cover Flow', 'Games', 'Music', 'Settings'],
      selectedItem: 0, // currently selected menu item
      currMenu: 'Main', // current menu
      pageToRender: 'Home', // currently rendered page home by default
      songDetails: { // This object will be used in Songs Component to render it
        songs: songs,
        posters: posters,
        songIndex: 0, // current song
        name: ["Red Swan", "Blinding Lights", "Labon Ko"],
        artist: ["Yoshiki & Hyde", "The Weeknd", "KK"],
        isPlaying: false, // if a song is playing or not
      },
      wallpapers: { // this object will be used to access the wallpapers
        images: wallpapers,
        id: 0 // current wallpaper
      }
    }
    this.currAngle = 0; // used to while rotating the controller
    this.tempSelectedItem = 0; // used to access the menu items
  }

  componentDidMount() {
    //initializing the zingtouch lib with 60 deg angles diff. to access menu items
    var containerElement = document.querySelector('.controller-container');
    var activeRegion = ZingTouch.Region(containerElement);
    activeRegion.bind(containerElement, 'rotate', (event) => {
      if (document.querySelector('.display-menu').classList.contains('width-50')) {
        let dist = event.detail.distanceFromLast;
        this.currAngle += dist;
        if (this.currAngle > 60) {
          this.tempSelectedItem++;
          // this keeps it within range of the possible menu items
          this.tempSelectedItem %= this.state.currMenuContent.length;
          this.setState({
            selectedItem: this.tempSelectedItem
          })
          this.currAngle = 0;
        }
        else if (this.currAngle < -60) {
          this.tempSelectedItem--;
          if (this.tempSelectedItem === -1)
            this.tempSelectedItem = this.state.currMenuContent.length - 1;
          this.setState({
            selectedItem: this.tempSelectedItem
          })
          this.currAngle = 0;
        }
      }
    });
  }

  handleMenuButton = () => {
    // if in main menu it will toggle the menu to open/close if in any of the sub-menus
    // you will be redirected to the main menu
    let { currMenu, mainMenu } = this.state;
    let menu = document.querySelector('.display-menu');
    if (menu.classList.contains('width-50')) {// width-50 class allows the menu to be visible
      if (currMenu === 'Main') {
        menu.classList.remove('width-50');
      }
      else if (currMenu === 'Music') {
        this.setState({
          currMenu: 'Main',
          currMenuContent: mainMenu,
          pageToRender: 'Home'
        });
      }
      else {
        this.setState({
          currMenu: 'Main',
          currMenuContent: mainMenu,
          pageToRender: 'Home'
        });
      }
    }
    else {
      menu.classList.add('width-50');
    }
  }

  handleSelectButton = () => {
    // renders the respective page or sub-menu depending on currMenu and selectedItem vars
    let { currMenu, musicMenu, settingsMenu, selectedItem, pageToRender, wallpapers } = this.state;
    if (document.querySelector('.display-menu').classList.contains('width-50')) {
      if (currMenu === 'Main') {
        if (selectedItem === 0) {
          pageToRender = 'Cover Flow';
        }
        else if (selectedItem === 1) {
          pageToRender = 'Games';
        }
        else if (selectedItem === 2) {
          this.setState({
            currMenu: 'Music',
            currMenuContent: musicMenu,
            selectedItem: 0
          });
          return;
        }
        else {
          this.setState({
            currMenu: 'Settings',
            currMenuContent: settingsMenu,
            selectedItem: 0
          });
          return;
        }
      }
      else if (currMenu === 'Music') {
        if (selectedItem === 0) {
          pageToRender = 'Songs';
        }
        else if (selectedItem === 1) {
          pageToRender = 'Albums';
        }
        else if (selectedItem === 2) {
          pageToRender = 'Artists';
        }
        else {
          pageToRender = 'Playlists';
        }
      }
      else if (currMenu === 'Settings') {
        if (selectedItem === 0) { // here wallpaper is changed
          wallpapers.id++
          if (wallpapers.id === wallpapers.images.length) {
            wallpapers.id = 0;
          }
          this.setState({
            wallpapers
          })
          return;
        }
        else if (selectedItem === 1) {
          this.handleRotate();// calling this to rotate ipod
          return;
        }
        else {
          pageToRender = 'About';
        }
      }
      this.setState({
        pageToRender
      });
      document.querySelector('.display-menu').classList.remove('width-50');
    }
  }

  handleActionButton = () => {
    // used to play/pause the song currently being played if menu is closed
    let { pageToRender, songDetails } = this.state;
    let menu = document.querySelector('.display-menu');
    let audioElement = document.getElementById("audio"); //the audio element
    if (pageToRender === 'Songs' && !menu.classList.contains('width-50') && audioElement) {
      if (!songDetails.isPlaying) {
        songDetails.isPlaying = true;
        audioElement.play()
      }
      else {
        songDetails.isPlaying = false;
        audioElement.pause();
      }
      this.setState({ songDetails })
    }
  }

  handleForwardButton = () => {
    // used to play the next song if menu is closed
    let { pageToRender, songDetails } = this.state;
    let menu = document.querySelector('.display-menu');
    let audioElement = document.getElementById("audio");
    if (!menu.classList.contains('width-50') && pageToRender === 'Songs' && audioElement) {
      audioElement.pause();
      songDetails.isPlaying = false;
      songDetails.songIndex++;
      if (songDetails.songIndex === songs.length) {
        songDetails.songIndex = 0;
      }
      this.setState({
        songDetails
      })
      audioElement.load();
    }
  }

  handleBackwardButton = () => {
    // used to play the previous song if menu is closed
    let { pageToRender, songDetails } = this.state;
    let menu = document.querySelector('.display-menu');
    let audioElement = document.getElementById("audio");
    if (!menu.classList.contains('width-50') && pageToRender === 'Songs' && audioElement) {
      audioElement.pause();
      songDetails.isPlaying = false;
      songDetails.songIndex--;
      if (songDetails.songIndex === -1) {
        songDetails.songIndex = songs.length - 1;
      }
      this.setState({
        songDetails
      })
      audioElement.load();
    }
  }

  handleRotate = () => {
    // rotate the ipod using rotateZ
    document.querySelector('.App').classList.toggle('rotate-anti-clockwise');
    document.querySelector('.display-container').classList.toggle('rotate-clockwise');
    document.querySelector('.controller-container').classList.toggle('rotate-clockwise');
  }

  handleAudioEnded = () => {
    // used to change the play icon to pause when the song ends naturally
    let { songDetails } = this.state;
    songDetails.isPlaying = false;
    this.setState({
      songDetails
    })
  };

  render() {
    const { currMenuContent, selectedItem, pageToRender, songDetails, wallpapers } = this.state
    return (
      <div className="App">
        <ErrorBoundary>
          < Display
            wallpapers={wallpapers}
            menuContent={currMenuContent}
            selectedItem={selectedItem}
            pageToRender={pageToRender}
            songDetails={songDetails}
            handleActionButton={this.handleActionButton}
            handleAudioEnded={this.handleAudioEnded}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          < Controller
            handleMenuButton={this.handleMenuButton}
            handleSelectButton={this.handleSelectButton}
            handleActionButton={this.handleActionButton}
            handleForwardButton={this.handleForwardButton}
            handleBackwardButton={this.handleBackwardButton}
            isSongPlaying={songDetails.isPlaying}
          />
        </ErrorBoundary>

      </div>
    );
  }
}

export default App;
