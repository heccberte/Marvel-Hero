import React, { useEffect, useState } from 'react';
import thorImg from '../images/thor.jpeg';
import MarvelService from '../services/MarvelService';
import Loader from './Loader';

function CharInfo({ charId }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [char, setChar] = useState({});
    const [isSticky, setIsSticky] = useState(false);
    const marvelService = new MarvelService();

    const updateChar = () => {
        if (!charId) return;

        setLoading(true);
        setError(false);

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    };

    useEffect(() => {
        updateChar();
    }, [charId]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const stickyThreshold = 400; // Порог, после которого элемент становится фиксированным
            setIsSticky(scrollPosition > stickyThreshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const spinner = loading ? (
        <div className='flex justify-center content-center items-center'><Loader /></div>
    ) : null;

    const errorMessage = error ? (
        <div className='flex justify-center content-center items-center text-center font-bold'>
            Ошибка<br />Попробуйте снова
        </div>
    ) : null;

    const content = !(error || loading || !char) ? (
        <div>
            <div className="grid grid-cols-2 gap-4 items-center justify-items-start">
                <img className="w-[200px] h-[200px]" src={char.thumbnail ? char.thumbnail : thorImg} alt={char.name || "Character"} />
                <div>
                    <h2 className="text-2xl font-bold mb-4">{char.name || "Character Name"}</h2>
                    <div className="mt-4 grid grid-flow-row grid-cols-1 gap-4 justify-items-start">
                        <a target='_blank' href={char.homepage ? char.homepage : null} className="cursor-pointer font-medium text-sm w-full py-3 px-5 text-white bg-red-700 transition-all hover:-translate-y-1 text-center">
                            HOMEPAGE
                        </a>
                        <a target='_blank' href={char.wiki ? char.wiki : null} className="cursor-pointer font-medium text-sm w-full py-3 px-5 text-white bg-zinc-800 transition-all hover:-translate-y-1 text-center">
                            WIKI
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <p className="text-gray-700 text-sm">
                    {char.description || "No description available."}
                </p>
                <h3 className="text-xl font-bold mb-2">Comics:</h3>
                <ul className="list-disc text-sm text-gray-700">
                    {char.comics ? char.comics.slice(0, 20).map((comic, index) => (
                        <li key={index}>{comic.name}</li>
                    )) : <li>No comics available</li>}
                </ul>
            </div>
        </div>
    ) : null;

    return (
        <div
            className={`shadow-md bg-white p-6 rounded-lg h-min transition-all duration-300 ${
                isSticky ? 'fixed top-4 z-50' : ''
            }`}
            style={!isSticky ? { position: 'relative' } : {}}
        >
            {spinner}
            {errorMessage}
            {content}
        </div>
    );
}

export default CharInfo;
