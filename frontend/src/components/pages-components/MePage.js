import { useRef, useState } from 'react';
import '../../styles/pages-styles/MePage.css';
import '../../styles/pages-styles/content.css';
import '../../styles/pages-styles/modal.css';
import ModalForm from '../Form.js';
import ListItem from '../ListItem.js';
import { useEffect } from 'react';
import axios from 'axios';
const { REACT_APP_BACKEND_URL } = process.env;

function MePage() {
    const [shows, setShows] = useState(null);
    const [movies, setMovies] = useState(null);

    const modalRef = useRef();
    useEffect(() => {
        loadHandler();
    }, []);

    const loadHandler = async () => {
        const s = axios.get(`${REACT_APP_BACKEND_URL}/api/shows`);
        const m = axios.get(`${REACT_APP_BACKEND_URL}/api/movies`);
        const [_shows, _movies] = await Promise.all([s, m]);
        setShows(
            _shows.data.map((show) => {
                return { ...show, type: 'Show' };
            })
        );
        setMovies(
            _movies.data.map((movie) => {
                return { ...movie, type: 'Movie' };
            })
        );
    };

    const saveHandler = async () => {
        if (shows != null) {
            const s = axios.post(
                `${REACT_APP_BACKEND_URL}/api/shows`,
                { items: shows },
                { headers: { 'Content-Type': 'application/json' } }
            );
        }
        if (movies != null) {
            const m = axios.post(
                `${REACT_APP_BACKEND_URL}/api/movies`,
                {
                    items: movies,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
        }
    };

    const modalHandler = () => {
        const modal = document.querySelector('.modal');
        modal.style.display = 'block';
    };

    const addItem = (data) => {
        if (data.type === 'Show') {
            if (shows === null) setShows([data]);
            else setShows([...shows, data]);
        } else if (data.type === 'Movie') {
            if (movies === null) setMovies([data]);
            else setMovies([...movies, data]);
        } else {
            console.log('Invalid type');
        }
    };

    // Mark show for deletion
    const removeItem = (data) => {
        console.log(data);
        if (data.type === 'Show') {
            setShows(
                shows.map((show) => {
                    if (show.name === data.name) {
                        return { ...show, delete: true };
                    } else return show;
                })
            );
        } else if (data.type === 'Movie') {
            setMovies(
                movies.map((movie) => {
                    if (movie.name === data.name) {
                        return { ...movie, delete: true };
                    } else return movie;
                })
            );
        } else {
            console.log('Invalid type');
        }
    };

    return (
        <div className='content me-page'>
            <div className='list-buttons'>
                <button onClick={loadHandler}>Load list</button>
                <button onClick={modalHandler}>Add Item</button>
                <button onClick={saveHandler}>Save list</button>
            </div>
            <div className='modal' ref={modalRef}>
                <div className='modal-content'>
                    <ModalForm parent={modalRef} callback={addItem} />
                </div>
            </div>
            <div className='list-container'>
                <div className='list-column list-shows'>
                    Shows
                    <hr />
                    {shows
                        ? shows
                              .filter((show) => !show.delete)
                              .map((show) => (
                                  <ListItem data={show} remove={removeItem}>
                                      {show.name}
                                  </ListItem>
                              ))
                        : ''}
                </div>
                <div className='list-column list-movies'>
                    Movies
                    <hr />
                    {movies
                        ? movies
                              .filter((movie) => !movie.delete)
                              .map((movie) => (
                                  <ListItem data={movie} remove={removeItem}>
                                      {movie.name}
                                  </ListItem>
                              ))
                        : ''}
                </div>
            </div>
        </div>
    );
}

export default MePage;
