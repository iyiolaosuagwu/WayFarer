/**
 * Takes an array of objects and returns an array of data arrayss
 * [{"one", "two"}, {three, four}]  => [ ["one", "two"], ["three", "four"] ]
 */
const convertNestedDataObjectToArray = (dataArray) => {
    const data = [];
    dataArray.map(dataObject => data.push(Object.values(dataObject)));
    return data;
};


/**
 * takes an array of arrays and replaces the square bracket with parenthesis
 * surrounds each element of the array with quotes
 * [ ["one", "two"], ["three", "four"] ] =>  ('one', 'two'), ('three', 'four')
 */
const transformNestedArraysToQueryValues = (dataArray) => {
    const quotedData = dataArray.map((valuesArray) => {
        const data = valuesArray.map((val) => {
            // ensures integers are not converted to strings
            if (+val) return val;
            return `'${val}'`;
        }).toString();
        return data;
    });
    const values = quotedData.map(data => `(${data})`)
        .toString();
    return values;
};

/**
 * forms the VALUES data of an sql insert query
 * [{"one", "two"}, {three, four}] => "('one', 'two'), ('three', 'four');"
 */
const getValues = (dataArray) => {
    const queryString = `${
        transformNestedArraysToQueryValues(convertNestedDataObjectToArray(dataArray))
        }`;
    return queryString;
};

export default getValues;