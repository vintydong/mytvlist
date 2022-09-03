import '../styles/ListItem.css';

function ListItem({ data, remove }) {
    return (
        <div className='list-item'>
            <div className='list-item-title'>{data.name}</div>
            <div className='list-item-desc'>
                {data.rating ? `${data.rating}/5` : '--/5'} <br />
                {data.type === 'Show' && data.season && data.episode
                    ? `Last Watched S${data.season}E${data.episode}`
                    : ''}
            </div>
            <button className='list-item-close' onClick={() => remove(data)}>
                X
            </button>
        </div>
    );
}

export default ListItem;
