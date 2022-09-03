import '../styles/Form.css';
import { useState } from 'react';

function ModalForm({ parent, callback }) {
    const [itemType, setItemType] = useState('show');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hide modal
        if (parent.current) parent.current.style.display = 'none';

        const inputs = ['name', 'season', 'episode', 'type', 'rating'];
        const data = inputs.reduce((prev, curr) => {
            return { ...prev, [curr]: e.target[curr].value };
        }, {});

        callback(data);
    };
    const handleClick = (e) => {
        if (parent.current) parent.current.style.display = 'none';
    };

    const handleSelectChange = (e) => {
        setItemType(e.target.value);
    };
    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <li>
                    <label>
                        Name <br />
                        <input type='text' name='name' required></input>
                    </label>
                    <select onChange={handleSelectChange} name='type'>
                        <option>Show</option>
                        <option>Movie</option>
                    </select>
                </li>
                <li>
                    <label>
                        Last Watched <br />
                        <input
                            type='number'
                            placeholder='Season'
                            name='season'
                            required={itemType === 'show'}
                        ></input>
                        <input
                            type='number'
                            placeholder='Episode'
                            name='episode'
                            required={itemType === 'show'}
                        ></input>
                    </label>
                </li>
                <li>
                    <label>
                        Rating <br />
                        <input
                            type='number'
                            min='1'
                            max='5'
                            name='rating'
                            required
                        ></input>
                    </label>
                </li>
                <li>
                    <button onClick={handleClick} type='button'>
                        Close
                    </button>
                    <button type='submit'>Submit</button>
                </li>
            </form>
        </div>
    );
}

export default ModalForm;
