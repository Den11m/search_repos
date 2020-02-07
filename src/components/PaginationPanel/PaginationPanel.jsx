import React, {useState, useEffect} from 'react'

import {
    Navigation,
    Menu,
    MenuItem,
    NavigationBtn
} from './style'

const PaginationPanel = ({activePageIndex, pagesCount, pagesPerChunk, onNavigate}) => {

    const [shownChunkIndex, setShownChunkIndex] = useState(Math.floor(activePageIndex / pagesPerChunk));

    useEffect(() => {
        setShownChunkIndex(0)
    }, [pagesCount]);

    const firstPageInChunkIndex = shownChunkIndex * pagesPerChunk;

    const handleChangeChunk = (action) => {
        if (action === 'increase') {
            if (shownChunkIndex === (Math.floor(pagesCount / pagesPerChunk))) return;
            setShownChunkIndex(shownChunkIndex + 1)
        }
        if (action === 'decrease') {
            if (shownChunkIndex === 0) return;
            setShownChunkIndex(shownChunkIndex - 1)
        }
    };

    return (
        <Navigation>
            <Menu>
                <NavigationBtn
                    className={shownChunkIndex === 0 ? 'disabled' : ''}
                    onClick={() => handleChangeChunk('decrease')}>
                    {`<`}
                </NavigationBtn>
                {
                    Array(pagesCount)
                        .fill(0)
                        .slice(firstPageInChunkIndex, firstPageInChunkIndex + pagesPerChunk)
                        .map((_, index) => {
                            const pageIndex = firstPageInChunkIndex + index;
                            return (
                                <MenuItem
                                    key={pageIndex}
                                    className={activePageIndex === pageIndex ? 'active' : ''}
                                    onClick={() => onNavigate(pageIndex)}>
                                    {pageIndex + 1}
                                </MenuItem>
                            )
                        })
                }

                <NavigationBtn
                    className={(shownChunkIndex * pagesPerChunk + pagesPerChunk) >= pagesCount ? 'disabled' : ''}
                    onClick={() => handleChangeChunk('increase')}>
                    {`>`}
                </NavigationBtn>
            </Menu>
        </Navigation>
    )
};

export default PaginationPanel
