import Menu from "./Menu";
import Coverflow from "./Coverflow";
import Games from "./Games";
import Songs from "./Songs"
import About from "./About";
import Album from "./Album";
import Artist from "./Artist";
import Playlist from "./Playlist";

const Display = (props) => {
    const { wallpapers, menuContent, selectedItem, pageToRender, songDetails, handleActionButton, handleAudioEnded } = props;
    // display different pages based on which was selected in menu through pageToRender var
    // also display menu if width-50 is active
    return (
        <> 
            <div className="display-container">
                < Menu menu={menuContent} selectedItem={selectedItem} />
                {pageToRender === 'Home' ? <img
					src={wallpapers.images[wallpapers.id]}
					alt="HOME"
					style={{
						height: "100%",
						width: "100%",
					}}
				/> : ''}
                {pageToRender === 'Cover Flow' ? < Coverflow /> : ''}
                {pageToRender === 'Games' ? < Games /> : ''}
                {pageToRender === 'Songs' ? <Songs songDetails={songDetails} handleActionButton={handleActionButton} handleAudioEnded={handleAudioEnded} /> : ''}
                {pageToRender === 'Artists' ? < Artist /> : ''}
                {pageToRender === 'Albums' ? < Album /> : ''}
                {pageToRender === 'Playlists' ? < Playlist /> : ''}
                {pageToRender === 'About' ? < About /> : ''}
            </div>
        </>
    )
}

export default Display;