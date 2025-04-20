import React from 'react';
import './styles.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className='header--logo'>
                <a href='/'>
                    <img src='/netflix.png' alt='Netflix' />
                </a>
            </div>
            <div className='header--user'>
                <a href='/'>
                    <img src='https://i.pinimg.com/736x/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.jpg' alt='Usuário' />
                </a>
            </div>
        </header>
    );
}

