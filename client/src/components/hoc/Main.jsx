import React from 'react';

const Main = ({children}) => {
  return (
    <div className="todo__tasks">
      {children}
    </div>
  );
};

export default Main;
