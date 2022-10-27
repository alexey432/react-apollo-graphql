import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import ShowPage from './pages/ShowPage';



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="people">
            <Route path=":id" element={<ShowPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </ApolloProvider>
  );
}

export default App;
