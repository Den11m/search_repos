import React, {useState, useEffect, useMemo, useCallback, useReducer} from 'react'
import {Title} from '../../components/TextComponents/TextComponents'
import Search from '../../components/Search/Search'
import PaginationPanel from '../../components/PaginationPanel/PaginationPanel'
import RepositoryCard from '../../components/RepositoryCard/RepositoryCard'
import {getRepositories} from '../../api/search'
import CachedSearch from '../../cachedSearch/CachedSearch'

import {Main} from './style'

const itemOnPage = 30;

const initialState = {
    count: 0,
    repos: [],
};

function reducer(state, action) {
    if (action.type === 'reset') {
        return {...initialState};
    } else if (action.type === 'newData') {
        return {count: action.data['total_count'], repos: [...action.data.items]};
    } else {
        throw new Error();
    }
}

const SearchPage = React.memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [query, setQuery] = useState('');
    const [activePageIndex, setActivePageIndex] = useState(0);

    const handleChangeInfo = useCallback((data) => {
        dispatch({type: 'newData', data});
    }, []);

    const cachedSearch = useMemo(() => new CachedSearch(getRepositories, handleChangeInfo), [handleChangeInfo]);

    useEffect(() => {
        let currentQuery = true;
        const controller = new AbortController();
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const loadRepos = async () => {
            if (!query) {
                dispatch({type: 'reset'});
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
    }, [query, activePageIndex, cachedSearch]);

    const handleChange = useCallback((event) => {
        setQuery(event.target.value);
        setActivePageIndex(0)
    }, []);

    const handleNavigate = useCallback((newPageIndex) => {
        if (activePageIndex !== newPageIndex) {
            setActivePageIndex(newPageIndex)
        }
    }, [activePageIndex]);

    const renderCards = useMemo(() => state.repos.map(el => <RepositoryCard key={el.id}
                                                                            repoDetails={el}/>), [state.repos]);

    return (
        <Main>
            <Title>GitHub</Title>

            <Search
                handleChange={handleChange}
                query={query}
            />

            {
                state.count ? <PaginationPanel
                    pagesCount={Math.ceil(state.count / itemOnPage)}
                    activePageIndex={activePageIndex}
                    pagesPerChunk={5}
                    onNavigate={handleNavigate}
                /> : null
            }

            {renderCards}
        </Main>)
});

export default SearchPage;
