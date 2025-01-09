import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import MarvelService from '../services/MarvelService';

const marvelService = new MarvelService();

function CharList({ onCharSerlected }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [ended, setEnded] = useState(false)

    const onCharListLoaded = (newCharList) => {
        if (newCharList.length < 9) {
            setEnded(true)
        }
        setCharList((prevList) => [...prevList, ...newCharList]);
        setLoading(false);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const onRequest = (currentOffset) => {
        setLoading(true);
        setError(false);
        marvelService
            .getAllCharacters(currentOffset)
            .then(onCharListLoaded)
            .catch(onError);
    };

    const loadMoreCharacters = () => {
        const newOffset = offset + 9;
        setOffset(newOffset);
        onRequest(newOffset);
    };

    useEffect(() => {
        onRequest(offset);
    }, []);

    return (
        <div className="col-span-3">
            {loading && charList.length === 0 ? (
                <div className="inset-0 flex justify-center items-center bg-opacity-75">
                    <Loader />
                </div>
            ) : (
                <ul className="grid grid-cols-3 gap-4 relative">
                    {charList.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => onCharSerlected(item.id)}
                            className="max-w-[200px] break-words grid grid-flow-row content-start w-max transition-all hover:-translate-y-1 shadow-xl hover:shadow-red-400 cursor-pointer"
                        >
                            <img
                                className="h-[200px] w-[200px] object-cover"
                                src={item.thumbnail}
                                alt={item.name}
                            />
                            <div className="bg-zinc-800 text-white text-xl font-bold h-[100px] p-2">
                                {item.name}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {error && (
                <div className="text-center text-red-500 font-bold mt-4">
                    Ошибка загрузки данных. Попробуйте снова.
                </div>
            )}
            {!loading && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={loadMoreCharacters}
                        className="cursor-pointer font-medium text-sm w-[400px] py-3 px-5 text-white bg-red-700 transition-all hover:-translate-y-1 text-center"
                        style={{'display': ended ? 'none' : 'block'}}
                    >
                        LOAD MORE
                    </button>
                </div>
            )}
            {loading && charList.length > 0 && (
                <div className="flex justify-center mt-4">
                    <Loader />
                </div>
            )}
        </div>
    );
}

export default CharList;
