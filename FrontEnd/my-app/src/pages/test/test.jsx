import { useState } from "react";

export default function Test() {
  const [username, setUsername] = useState("bra");
  const [password, setPassowrd] = useState("123SDSAED");
  const [email, setEmail] = useState("bra@uao.edu.co");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      user: username,
      pass: password,
      email: email,
    };

    await fetch("http://localhost:4000/guardar", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <input type="text" onChange={(e) => setUsername(e.target.value)} name="user" placeholder="Usuario" />
      <input type="text" onChange={(e) => setPassowrd(e.target.value)} name="pass" placeholder="Contraseña" />
      <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Correo" />
      <button type="submit">Ingresar</button>
    </form>
  );
}
