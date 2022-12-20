import React from "react";

const LoginForma = ({
  userLogin,
  promjenaImena,
  promjenaLozinke,
  username,
  pass,
}) => (
  <form onSubmit={userLogin}>
    <div>
      Korisničko ime:
      <input
        type="text"
        value={username}
        name="Username"
        onChange={promjenaImena}
      />
    </div>
    <div>
      Lozinka:
      <input
        type="password"
        value={pass}
        name="Pass"
        onChange={promjenaLozinke}
      />
    </div>
    <button type="submit">Prijava</button>
  </form>
);

export default LoginForma;
