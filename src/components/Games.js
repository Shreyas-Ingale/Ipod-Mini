import React from 'react';
import gameGIF from '../assets/images/gameGIF.gif'

class Games extends React.Component
{
    render()
    {
        return (
            <div className="screen-games">
                <img src={gameGIF} style={{width: "100%"}} alt="Games"></img>
            </div>
        );
    }
};

export default Games;