import React from 'react';
import githubIcon from 'assets/imgs/github.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import './Footer.scss';

function Footer() {
    return (
        <div className='footer'>
            <div className='links'>
                <a
                    href='https://github.com/luonganh99/dabezt-movie'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <img src={githubIcon} alt='Github' />
                </a>
            </div>
            <p className='self-text'>
                Made by Luong Anh with <FontAwesomeIcon icon={faHeart} color='red' />
            </p>
            <p className='date'>Septemper, 2020</p>
        </div>
    );
}

export default Footer;
