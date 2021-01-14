import ApolloClient from 'apollo-boost'

const getHeaders = () => {
    const headers = {};
    const token = JSON.parse(localStorage.getItem('apollo-token'));
    if (token) {
        headers.authorization = `token ${token}`;
    }
    return headers;
};

const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: getHeaders()
});

const client = new ApolloClient({
    link: link
})

export default client