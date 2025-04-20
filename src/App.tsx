import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import { Category, FeaturedData } from './types';

export default () => {

    const [movieList, setMovieList] = useState<Category[]>([]);
    const [featuredData, setFeaturedData] = useState<FeaturedData | null>(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            setMovieList(list);
    
            let seriesCategories = list.filter(i => i.slug === 'originals' || i.slug === 'trending');

            seriesCategories = seriesCategories.map(category => ({
                ...category,
                items: category.items.results ? category.items : { results: [] }
            }));
  
            let randomCategoryIndex = Math.floor(Math.random() * seriesCategories.length);
            let randomCategory = seriesCategories[randomCategoryIndex];
    
            if (randomCategory && randomCategory.items.results.length > 0) {
                let randomChosen = Math.floor(Math.random() * randomCategory.items.results.length);
                let chosen = randomCategory.items.results[randomChosen];
    
                let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
                setFeaturedData(chosenInfo);
            }
        };
        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return (
        <div className='page'>

            <Header black={blackHeader} />

            {featuredData && 
                <FeaturedMovie item={featuredData} />
            }

            <section className='lists'>
                {movieList.map((item, key) => (
                    console.log(item),
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                Feito com <span role='img' aria-label='coração'>❤️</span> por B7web<br/>
                Direitos de imagem para Netflix<br/>
                Dados pegos do site Themoviedb.org
            </footer>

            {movieList.length <= 0 &&
                <div className='loading'>
                    <img src='/circle.gif' alt='Carregando' />
                </div>
            }
            
        </div>
    );
}