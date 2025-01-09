import React from 'react';

function Header() {
    return (
        <div className='flex items-center justify-between'>
            <h1 className='font-bold text-2xl'><span className='text-red-800'>Marvel</span> information portal</h1>
            <div className='font-bold text-2xl'>
                <a href='#' className='hover:text-red-800 transition-colors'>Characters</a> / <a className='hover:text-red-800 transition-colors' href='#'>Comics</a>
            </div>
        </div>
    );
}

export default Header;
