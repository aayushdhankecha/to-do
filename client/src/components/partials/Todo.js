import React from 'react'

function Todo(text) {
    // console.log(text);/
  return (
    <div className='col-sm-3 mx-3 my-2 alert bg-light'>
      <div className="card-header">
        Header
      </div>
      <div className="card-body">
        <h4 className='card-title'>
            Light Card Theme
        </h4>
        <p className='card-text'>{text}</p>
      </div>
    </div>
  )
}

export default Todo
