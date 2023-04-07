import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';

const MenuItem = (props) => {
    const { name, iconClassName,onClick ,to,exact} = props;
    const [expand,setExpand]=useState(false);
    return (
        <li onClick={onClick}>
            <NavLink exact onClick={()=>setExpand(!expand)} className="menu-item" to={to} >
                <div className="menu-icon">
                    <i class={iconClassName}></i>
                </div>
                <span>{name}</span>
            </NavLink>

        </li>
    );
}

export default MenuItem;