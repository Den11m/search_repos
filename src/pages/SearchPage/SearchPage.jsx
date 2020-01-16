import React, {useState, useEffect} from 'react'
import {Title} from '../../components/TextComponents/TextComponents'
import Search from '../../components/Search/Search'
import RepositoryCard from '../../components/RepositoryCard/RepositoryCard'
import {getRepositories} from '../../api/search'

import {Container} from './style'

const SearchPage = () => {

    const [query, setQuery] = useState('');
    const [repos, setRepos] = useState([]);
    const [activePageIndex, setActivePageIndex] = useState(0);


    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    useEffect(() => {
        let currentQuery = true;
        const controller = new AbortController();

        const loadRepos = async () => {
            if (!query) {
                return setRepos([]);
            }

            await sleep(400);
            if (currentQuery) {
                const repos = await getRepositories(query, activePageIndex + 1, controller);
                setRepos(repos.items);
            }
        };

        loadRepos();

        return () => {
            currentQuery = false;
            controller.abort()
        }
    }, [query]);

    const handleChange = event => {
        setQuery(event.target.value);
    };

    const renderCards = repos.map(el => <RepositoryCard key={el.id} repoDetails={el}/>);

    return (<Container>
        <Title>GitHub</Title>
        <Search
            handleChange={handleChange}
            query={query}
        />

        {renderCards}
    </Container>)
};

export default SearchPage;
