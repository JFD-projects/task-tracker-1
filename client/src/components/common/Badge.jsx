import React from 'react';
import '../../css/common.scss'
import classNames from "classnames";

const Badge = ({color, onClick, selectedColor, id}) => {
  return (
    <i onClick={onClick}
       id={id}
       style={{backgroundColor: `${color}`}}
       className={classNames('badge',
         {'active': selectedColor === id})}> </i>
  );
};

export default Badge;
