import React, {useState} from "react";

const PorukaForma = (props) => {
    const [unosPoruke, postaviUnos] = useState("...unesi poruku")
    const promjenaUnosa = (e) =>{
        postaviUnos(e.target.value)
    }

    const novaPoruka = (e) => {
        e.preventDefault()
        props.spremiPoruku({
            sadrzaj: unosPoruke,
            vazno: Math.random() > 0.5
        })
        postaviUnos('')
    }
  return (
    <div>
      <h2>Stvori novu poruku</h2>
      <form onSubmit={novaPoruka}>
        <input value={unosPoruke} onChange={promjenaUnosa} />
        <button type="submit">Spremi</button>
      </form>
    </div>
  );
};
export default PorukaForma;
