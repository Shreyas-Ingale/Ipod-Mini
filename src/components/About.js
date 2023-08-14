import React from 'react';

class About extends React.Component
{
    render()
    {
        return (
            <div className="about-screen">
                <h1>About</h1>
                <div>
                    <p>Made by : <strong>Shreyas Ingale</strong></p>
                    <a href='https://www.github.com/shreyas-ingale' target='_blank' rel='noreferrer'><i className="bi bi-github"></i></a>
                </div>
            </div>
        );
    }
};

export default About;