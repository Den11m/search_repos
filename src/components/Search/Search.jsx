import React, {useEffect, useRef} from 'react'
import {Field, SearchLabel, SearchInput} from './style'

const Search = ({query, handleChange}) => {

    const focusSearch = useRef(null);

    useEffect(() => {
        focusSearch.current.focus()
    }, []);

    return (
        <Field>
            <SearchLabel>
                Search repos by name
            </SearchLabel>
            <SearchInput
                type="text"
                ref={focusSearch}
                onChange={handleChange}
                value={query}
            />
        </Field>
    )
};

export default Search;
