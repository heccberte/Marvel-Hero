import React, { useState } from 'react';
import thorImg from '../images/thor.jpeg'
import MarvelService from '../services/MarvelService';
import Loader from './Loader';

const marvelService = new MarvelService();

function RandomChar() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [char, setChar] = useState({})
    
    const onCharLoaded = (char) => {
        setChar(char)
        if (char.description !== '') {
            let newDesc = changeText(char.description)
            setChar({ ...char, description: newDesc })
        } else setChar({ ...char, description: 'No description available' })
        setLoading(false)
    }

    const changeText = (text) => {
        var maxlength = 200;
        let str = ''
        for (let i = 0; i < maxlength; i++) {
            if (text[i]) str += text[i]
        }
        return str.slice(0, -3) + '...'
    }
    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const updateChar = () => {
        if (error) setError(false)
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        marvelService.getCharacter(id)
            .then(res => {
                onCharLoaded(res)
            })
            .catch(onError)
        setLoading(true)
    }
    const spinner = loading ? <div className='flex justify-center content-center items-center'><Loader /></div> : null
    const errorMessage = error ? <div className='flex justify-center content-center items-center text-center font-bold'>Ошибка<br />Попробуйте снова</div> : null
    const content = !(error || loading) ?
        <div className='p-5 grid grid-flow-col justify-start gap-4 items-stretch'>
            <img className='w-[200px] h-[200px]' src={char.thumbnail ? char.thumbnail : thorImg} />
            <div className='h-[200px] grid grid-cols-1 gap-4 content-between justify-between'>
                <div>
                    <h2 className='text-xl font-bold mb-2'>{char.name ? char.name : 'THOR'}</h2>
                    <div className=''>
                        {char.description ? char.description : 'As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he\'s quite smart and compassionate...'}
                    </div>
                </div>
                <div className='grid grid-flow-col gap-4 justify-start'>
                    <a className='cursor-pointer font-medium text-sm w-max py-3 px-5 text-white bg-red-700 transition-all hover:-translate-y-1' target='_blank' href={char.homepage ? char.homepage : null}>HOMEPAGE</a>
                    <a className='cursor-pointer font-medium bg-zinc-800 text-sm text-white w-max py-3 px-5 transition-all hover:-translate-y-1' target='_blank' href={char.wiki ? char.wiki : null}>WIKI</a>
                </div>
            </div>
        </div>
        : null

    return (
        <div className='shadow-xl grid grid-cols-2 grid-rows-1 mt-10 text-sm'>
            {spinner}
            {errorMessage}
            {content}
            <div className='randomchar min-h-[245px] bg-zinc-800 text-white p-5 grid grid-cols-1 relative content-between text-xl font-bold relative'>
                <div className='h-[200px] grid items-end'>
                    <div>Random character for today!<br />Do you want to get to know him better?</div>
                    <div>Or choose another one</div>
                    <button onClick={updateChar} className='text-sm font-medium w-max py-3 px-5 bg-red-700 transition-all hover:-translate-y-1'>TRY IT!</button>
                </div>

            </div>
        </div>
    );
}

export default RandomChar;