import React from 'react';

class Album extends React.Component
{
    render()
    {
        return (
            <div className="normal-screen album-icon">
                <h1>Albums</h1>
                <div>
                    <i className="bi bi-file-music-fill"></i>
                </div>
            </div>
        );
    }
};

export default Album;