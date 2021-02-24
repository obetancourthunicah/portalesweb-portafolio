import logo from './logo.svg';
import './App.css';
import BrandHeader from './components/BrandHeader/BrandHeader';
import Cards from './components/Cards/Cards';
import CardHolder from './components/Cards/CardHolder';

function App() {
  return (
    <section>
      <BrandHeader></BrandHeader>
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
