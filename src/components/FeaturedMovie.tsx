import React from 'react';
import './FeaturedMovie.css';

type Props = {
    item: {
        id: number;
        original_name?: string; 
        backdrop_path?: string;
        vote_average?: number;
        first_air_date?: string;
        number_of_seasons?: number;
        overview?: string;
        genres?: Array<{ name: string }>;
    };
};

export default ({ item }: Props) => {
    let genres = item.genres ? item.genres.map((genre) => genre.name) : [];
    let description = item.overview || '';

    if (description.length > 200) {
        description = description.substring(0, 200) + '...';
    }

    return (
        <div>
            <section
                className='featured'
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path || ''})`,
                }}
            >
                <div className='featured--vertical'>
                    <div className='featured--horizontal'>
                        <div className='featured--name'>{item.original_name || 'Título não disponível'}</div>
                        <div className='featured--info'>
                            <div className='featured--points'>{item.vote_average || 0} pontos</div>
                            <div className='featured--year'>
                                {item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'Ano não disponível'}
                            </div>
                            <div className='featured--seasons'>
                                {item.number_of_seasons || 0} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                            </div>
                        </div>
                        <div className='featured--description'>{description}</div>

                        <div className='featured--buttons'>
                            <a href={`/watch/${item.id}`} className='featured--watchbutton'>
                                ► Assistir
                            </a>
                            <a href={`/list/add/${item.id}`} className='featured--mylist'>
                                + Minha Lista
                            </a>
                        </div>

                        <div className='featured--genres'>
                            <strong>Gêneros: </strong>
                            {genres.join(', ') || 'Gêneros não disponíveis'}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};