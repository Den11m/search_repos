export const getRepositories = async (query, page) => {
    const results = await fetch(`https://api.github.com/search/repositories?q=${query}+in:name&sort=stars&order=desc&page=${page}`, {
        headers: new Headers({
            'Accept': 'application/json'
        }),
        }
    );
    const reposData = await results.json();
    return reposData
};
