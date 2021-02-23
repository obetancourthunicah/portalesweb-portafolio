import './Cards.css';
function CardHolder ({children}){

  return (
    <section className="CardHolder">
      {children}
    </section>
  );
}

export default CardHolder;
