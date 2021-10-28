import React from 'react';
import './badge.scss'
import classNames from "classnames";

const Badge = ({color, onClick, selectedColor, id}) => {
    return (
        <i onClick={onClick}
           id={id}
           className={classNames('badge',
               {[`badge--${color}`] : color},
               {'active': selectedColor === id})}> </i>
    );
};

export default Badge;