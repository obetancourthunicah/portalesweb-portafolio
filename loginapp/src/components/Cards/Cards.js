import PillBotton from './PillBotton';
function Cards (){
  //JSX 
  return (
    <section className="Cards">
      <h2>Title</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quis porro autem quo sit cum provident repellat? Provident, quam? Totam dolorem vel corrupti voluptatibus numquam magnam beatae ea! Nostrum, quae.
      </p>
      <div>
        <PillBotton text="Acción A" type="submit" click={(e) => { alert("Click A");}}></PillBotton>
        <PillBotton text="Acción B" type="submit" click={(e) => { alert("Click B"); }}></PillBotton>

      </div>
    </section>
  );
}

export default Cards;
