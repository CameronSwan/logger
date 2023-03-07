import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService'

const BristolStoolScale = (props) => {

  const [stoolTypes, setStoolTypes] = useState('')

  useEffect(() => {
    dataService.getStoolTypes(stoolTypes => {
      setStoolTypes(stoolTypes)
    })

  }, [])

  if (!props.showModal) {
    return null
  }

  else return (
    <div className='BristolStoolScale__Modal'>
      <div>Bristol Stool Scale <button type='button' onClick={props.onClose} title="close">X</button></div>
      {stoolTypes.map(stoolType => {
        return (
          <div>
            <div>image<span>{stoolType.name}</span> <p>{stoolType.description}</p></div>
          </div>
        )
      })}
      <div>Learn more</div>
    </div>
  );
};

export default BristolStoolScale;