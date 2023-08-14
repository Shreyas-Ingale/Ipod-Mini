import React from 'react';

class Playlist extends React.Component
{
    render()
    {
        return (
            <div className="normal-screen playlist-icon">
                <h1>Playlists</h1>
                <div>
                    <i className="bi bi-music-note-list"></i>
                </div>
            </div>
        );
    }
};

export default Playlist;