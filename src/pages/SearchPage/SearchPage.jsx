import React, {useState, useEffect, useMemo} from 'react'
import {Title} from '../../components/TextComponents/TextComponents'
import Search from '../../components/Search/Search'
import PaginationPanel from '../../components/PaginationPanel/PaginationPanel'
import RepositoryCard from '../../components/RepositoryCard/RepositoryCard'
import {getRepositories} from '../../api/search'
import CachedSearch from '../../cachedSearch/CachedSearch'

import {Container} from './style'

const itemOnPage = 30;

const SearchPage = React.memo(() => {

    const [query, setQuery] = useState('');
    const [repos, setRepos] = useState([]);
    const [count, setCount] = useState(0);
    const [activePageIndex, setActivePageIndex] = useState(0);

    const handleChangeInfo = (repos) => {
        setRepos(repos.items);
        setCount(repos['total_count']);
    };

    const cachedSearch = useMemo(() => new CachedSearch(getRepositories, handleChangeInfo), []);

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    useEffect(() => {
        let currentQuery = true;
        const controller = new AbortController();

        const loadRepos = async () => {
            if (!query) {
                setCount(0);
                setRepos([]);
                return
            }

            await sleep(400);
            if (currentQuery) {
                await cachedSearch.changeQuery(query, activePageIndex + 1, controller);
            }
        };

        loadRepos();

        return () => {
            currentQuery = false;
            controller.abort()
        }
    }, [query, activePageIndex]);

    const handleChange = event => {
        setQuery(event.target.value);
        setActivePageIndex(0)
    };

    const handleNavigate = (newPageIndex) => {
        if (activePageIndex !== newPageIndex) {
            setActivePageIndex(newPageIndex)
        }
    };

    const renderCards = repos.map(el => <RepositoryCard key={el.id} repoDetails={el}/>);


    return (<Container>
        <Title>GitHub</Title>

        <Search
            handleChange={handleChange}
            query={query}
        />

        {
            count ? <PaginationPanel
                pagesCount={Math.ceil(count / itemOnPage)}
                activePageIndex={activePageIndex}
                pagesPerChunk={5}
                onNavigate={handleNavigate}
            /> : null
        }

        {renderCards}
    </Container>)
});

export default SearchPage;
