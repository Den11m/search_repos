export default class CachedSearch {
    constructor(searchFunction, resultsHandler) {
        this.searchFunction = searchFunction;
        this.resultsHandler = resultsHandler;

        this.cache = {};
    }

    changeQuery(query, page){
        let uniqueQuery = `${query}&page=${page}`;

        if (this.cache[uniqueQuery]) {
            console.log("query retrieved from cache:", uniqueQuery);
            this.resultsHandler(this.cache[uniqueQuery]);
        } else {
            this.searchFunction(query, page)
                .then(results => {
                    this.cache[uniqueQuery] = results;
                    console.log("query added to cache:", uniqueQuery);
                    this.resultsHandler(results);
                });
        }
    }
}
