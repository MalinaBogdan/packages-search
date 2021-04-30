import algoliasearch from 'algoliasearch'

const algolia = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e', { protocol: 'https:' });
const index = algolia.initIndex('npm-search');

const ATTR_REGEXP = /\s*(?:[a-z]+)\s*:\s*(?:.(?![a-z]*\s*:))*/gi;
const QUERY_REGEXP = /^((?:(?:[^\s:]+(?![a-z]*\s*:))\s*)*)/i;
const filterMapping = {
	author: 'owner.name',
	type: 'moduleTypes',
};

function parseQuery (queryString) {
	let query = queryString.match(QUERY_REGEXP)[0].trim();
	let substr = queryString.substr(query.length);
	let filters = [];
	let match;

	while ((match = ATTR_REGEXP.exec(substr)) !== null) {
		let temp = match[0].split(':');

		if (filterMapping[temp[0].trim()]) {
			filters.push(filterMapping[temp[0].trim()] + ':' + temp[1].trim());
		}
	}

	return {
		query,
		facetFilters: filters.join(','),
	};
}

export default async function searchPackages(queryString = '', page = 0, hitsPerPage = 10) {
    let parsed = parseQuery(queryString);
    let options = {
        page,
        hitsPerPage,
        attributesToHighlight: [],
        attributesToRetrieve: [ 'deprecated', 'description', 'githubRepo', 'homepage', 'keywords', 'license', 'name', 'owner', 'version' ],
        analyticsTags: [ 'jsdelivr' ],
    };

    if (parsed.facetFilters) {
        options.facetFilters = parsed.facetFilters;
    }

    const response = await index.search(parsed.query, options)

    response.hits.sort((a, b) => {
        return a.name === parsed.query ? -1 : b.name === parsed.query;
    });

    return {
        response,
        query: parsed,
    };
}
