const Controller = (props) => {
    const { handleMenuButton, handleSelectButton, handleActionButton, handleForwardButton, handleBackwardButton, isSongPlaying } = props;
    return (
        <>
            <div className="controller-container" draggable="false">
                <button type="button" className="select-btn" onClick={handleSelectButton} draggable="false">
                    <h2>Select</h2>
                </button>
                <button type="button" className="menu-btn" onClick={handleMenuButton} draggable="false">
                    <i className="bi bi-list"></i>
                </button>
                <button type="button" className="forward-btn" onClick={handleForwardButton} draggable="false">
                    <i className="bi bi-fast-forward-fill"></i>
                </button>
                <button type="button" className="backward-btn" onClick={handleBackwardButton} draggable="false">
                    <i className="bi bi-rewind-fill"></i>
                </button>
                {/* depending on song is playing or not deciding pause/play icon respt. */}
                <button type="button" className="action-btn" onClick={handleActionButton} draggable="false">
                    <i className={isSongPlaying ? "bi bi-pause-fill" : "bi bi-play-fill"}></i>
                </button>
            </div>
        </>
    )
}

export default Controller;