import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.css';
import Container from './components/containers/Container';
import PeopleContainer from './components/containers/PeopleWithCarsContainer';
import CarsContainer from './components/containers/CarsContainer';

import { BrowserRouter, Routes, Route } from "react-router-dom";


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="people">
            <Route path=":id" element={<div>123</div>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </ApolloProvider>
  );
}

export default App;
