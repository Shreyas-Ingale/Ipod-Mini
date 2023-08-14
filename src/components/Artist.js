import React from 'react';

class Artist extends React.Component
{
    render()
    {
        return (
            <div className="normal-screen artist-icon">
                <h1>Artists</h1>
                <div>
                    <i className="bi bi-person-fill"></i>
                </div>
            </div>
        );
    }
};

export default Artist;