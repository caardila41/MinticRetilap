import { useState } from "react";

export default function Test() {
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      password: password,
      email: email,
      returnSecureToken:true,
    };

    await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7duFMVc1DkobGHqq2TbniVO055k63NCw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},      
      body: JSON.stringify(data),
    })
      .then((data) => data.json().then(function(data) {let jwtoken = data.idToken; console.log(jwtoken)} ))
      .catch((err) => console.log(err));

  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <input type="text" onChange={(e) => setUsername(e.target.value)} name="user" placeholder="Usuario" />
      <input type="text" onChange={(e) => setPassowrd(e.target.value)} name="password" placeholder="Contraseña" />
      <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Correo" />
      <button type="submit">Ingresar</button>
    </form>
  );
}
