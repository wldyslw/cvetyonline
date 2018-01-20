import React from 'react';

const Spinner = () => (
    <div className='text-center'>
        <i id='spinner' style={{fontSize: 60}} className="fa fa-spinner spinner" aria-hidden="true"></i>
        <br />
        <label htmlFor='spinner'>Загрузка</label>
    </div>
)

export default Spinner;
