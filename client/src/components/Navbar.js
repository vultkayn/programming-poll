import React, {useState, useEffect} from 'react';
import './styles/Navbar.css';

export default function Navbar ({tabs, onChange}) {
    const [active, setActive] = useState(null);
    useEffect(() => {setActive(active); onChange(null, tabs && tabs[0].content)}, []);

    if (! tabs) return null;
    if (active === null) setActive(tabs[0].key)
    
    const tabsComp = tabs.map((tab) =>
        <Tab 
        title={tab.name}
        content={tab.content}
        key={tab.key}
        onSelect={(e, content) => {setActive(tab.key); onChange(e, content)}}
        active={active == tab.key}
        /> 
    );

    return (
        <nav className='Navbar Navbar-main'>
            {tabsComp}
        </nav>
    );
}


function Tab ({title, content, key, onSelect, active}) {
    function handleClick (e) {
        e.preventDefault();
        onSelect(e, content);
    }

    return (
        <div className={`Tab ${active ? 'Tab-active' : ''}`} key={key} onClick={handleClick}>
            {title}
        </div>
    );
}