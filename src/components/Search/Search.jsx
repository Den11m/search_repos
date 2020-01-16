import React, {useEffect, useRef} from 'react'
import {SearchInput} from './style'

const Search = ({query, handleChange}) => {

    const focusSearch = useRef(null);

    useEffect(() => {focusSearch.current.focus()}, []);

    return <SearchInput
        type="text"
        placeholder="Search repos by name"
        ref={focusSearch}
        onChange={handleChange}
        value={query}
    />
};

export default Search;
