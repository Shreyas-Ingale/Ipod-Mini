import React from "react";

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.audioElement = React.createRef();
    }

    // to play the song automatically once page is rendered and to change the play pause icon
    componentDidMount() {
        this.props.handleActionButton();
        this.audioElement.current.addEventListener('ended', this.props.handleAudioEnded);
    }

    // to change the play pause icon
    componentWillUnmount() {
        this.props.handleAudioEnded()
        this.audioElement.current.removeEventListener('ended', this.handleAudioEnded);
    }



    render() {
        const { songDetails } = this.props;
        const { songs, posters, songIndex, name, artist } = songDetails;
        return (
            <>
                <div className="music-screen">
                    <div className="blur-div" style={{backgroundImage: `url(${posters[songIndex]})`}}></div>
                    <h1>{name[songIndex]}</h1>
                    <img src={posters[songIndex]} alt={name[songIndex]}></img>
                    <p>
                        {artist[songIndex]}
                    </p>
                    {/* removed unwanted icons from audio element */}
                    <audio controls controlsList="nodownload noplaybackrate" ref={this.audioElement} id="audio">
                        <source src={songs[songIndex]} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </>
        )
    }
}

export default Songs;