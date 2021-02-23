import logo from './logo.svg';
import './App.css';
import Cards from './components/Cards/Cards';
import CardHolder from './components/Cards/CardHolder';

function App() {
  return (
    <section>
      <h1>Hola Mundo !!!</h1>
      <CardHolder>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
      </CardHolder>
    </section>
  );
}

export default App;
