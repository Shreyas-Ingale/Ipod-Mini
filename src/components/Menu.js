const Menu = (props) => {
    const { menu, selectedItem } = props;
    return (
        <>
            <div className="display-menu">
                <div className="menu-heading">
                    <h3>Ipod Mini.</h3>
                </div>
                {menu.map((item,index) => {
                    return (
                        <div className={selectedItem === index ? "selected" : ''} key={index}>
                            <p className="menu-content"><span>{item}</span>{selectedItem === index ? <span><i className="bi bi-chevron-right"></i></span> : ''}</p>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Menu;