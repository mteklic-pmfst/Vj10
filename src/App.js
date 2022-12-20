import React, { useState, useEffect, useRef } from "react";
import Poruka from "./components/Poruka";
import LoginForma from "./components/LoginForma";
import PorukaForma from "./components/PorukaForma";
import Promjenjiv from "./components/Promjenjiv";
import porukeAkcije from "./services/poruke";
import prijavaAkcije from "./services/login";

const App = (props) => {
  const [poruke, postaviPoruke] = useState([]);
  const [ispisSve, postaviIspis] = useState(true);
  const [username, postaviUsername] = useState("");
  const [pass, postaviPass] = useState("");
  const [korisnik, postaviKorisnika] = useState(null);

  const porukaFormaRef = useRef()

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const korisnik = await prijavaAkcije.prijava({
        username,
        pass,
      });
      window.localStorage.setItem(
        "prijavljeniKorisnik",
        JSON.stringify(korisnik)
      );
      porukeAkcije.postaviToken(korisnik.token);
      postaviKorisnika(korisnik);
      postaviUsername("");
      postaviPass("");
      console.log(korisnik);
    } catch (exception) {
      alert("Neispravni podaci");
    }
  };

  const porukeZaIspis = ispisSve
    ? poruke
    : poruke.filter((poruka) => poruka.vazno === true);

  const promjenaVaznostiPoruke = (id) => {
    const poruka = poruke.find((p) => p.id === id);
    const modPoruka = {
      ...poruka,
      vazno: !poruka.vazno,
    };

    porukeAkcije.osvjezi(id, modPoruka).then((response) => {
      console.log(response);
      postaviPoruke(poruke.map((p) => (p.id !== id ? p : response.data)));
    });
  };

  const brisiPoruku = (id) => {
    porukeAkcije.brisi(id).then((response) => {
      console.log(response);
      postaviPoruke(poruke.filter((p) => p.id !== id));
    });
  };

  useEffect(() => {
    porukeAkcije.dohvatiSve().then((res) => postaviPoruke(res.data));
  }, []);

  useEffect(() => {
    const logiraniKorisnikJSON = window.localStorage.getItem(
      "prijavljeniKorisnik"
    );
    if (logiraniKorisnikJSON) {
      const korisnik = JSON.parse(logiraniKorisnikJSON);
      postaviKorisnika(korisnik);
      porukeAkcije.postaviToken(korisnik.token);
    }
  }, []);

  const novaPoruka = (noviObjekt) => {
    porukaFormaRef.current.promjenaVidljivosti()
    porukeAkcije.stvori(noviObjekt).then((res) => {
      postaviPoruke(poruke.concat(res.data));
    });
  };

  const loginForma = () => {
    return (
      <Promjenjiv natpis="Prijavi se">
        <LoginForma
          username={username}
          pass={pass}
          promjenaImena={({ target }) => postaviUsername(target.value)}
          promjenaLozinke={({ target }) => postaviPass(target.value)}
          userLogin={userLogin}
        />
      </Promjenjiv>
    );
  };

  const porukaForma = () => (
    <Promjenjiv natpis='Nova poruka' ref={porukaFormaRef}>
      <PorukaForma
        spremiPoruku={novaPoruka}
      />
    </Promjenjiv>
  )

  return (
    <div>
      <h1>Poruke</h1>
      {korisnik === null ? (
        loginForma()
      ) : (
        <div>
          <p>Prijavljeni ste kao {korisnik.ime}</p>
          {porukaForma()}
        </div>
      )}

      <h1>Poruke - Novo</h1>
      <div>
        <button onClick={() => postaviIspis(!ispisSve)}>
          Prikaži {ispisSve ? "važne" : "sve"}
        </button>
      </div>
      <ul>
        {porukeZaIspis.map((p) => (
          <Poruka
            key={p.id}
            poruka={p}
            promjenaVaznosti={() => promjenaVaznostiPoruke(p.id)}
            brisiPoruku={() => brisiPoruku(p.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
