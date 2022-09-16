import { NextResponse } from "next/server";

const signedinPages = [
  "/admin",
  "/admin/create/user",
  "/admin/update/user",
  "/admin/update/information",
  "/admin/information",
  "/admin/users",
  "/auxAdmin",
  "/auxAdmin/create/client",
  "/auxAdmin/create/proyect",
  "/auxAdmin/update/client",
  "/auxAdmin/update/proyect",
  "/auxAdmin/clients",
  "/auxAdmin/proyects",
  "/inspector",
  "/inspector/update/zone",
  "/inspector/variables/[measureZone]",
  "/inspector/zones/[pushZone]",
  "/inspector/variable",
  "/inspector/zonas",
];

export function middleware(req) {
  // Condicional para determinar si se encuentra en alguna de estas páginas
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("token");
    const access = req.cookies.get("typeUser");
    const uid = req.cookies.get("uid");
    // prints para ayudar en desarrollo
    console.log(token);
    console.log(uid);
    // console.log(access);

    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";

    // hash table (similar a un switch), nos permite saber que paths tiene acceso el usuario
    const VALUE = {
      admin: "/admin",
      aux: "/auxAdmin",
      inspector: "/inspector",
    };

    if (!token) {
      console.log("lo redireccion al login");
      // lo regresa al inicio
      return NextResponse.redirect(url);
    } else {
      // conocer cual url tiene acceso
      let acces_to_page = VALUE[access];
      // setea a donde se va a redireccionar cuando no tiene acceso a dicha url
      url.pathname = acces_to_page;

      // prints que ayudan en el dev
      // console.log("nombre de la ruta", req.nextUrl.pathname);
      // console.log("Tomen del path que tiene", acces_to_page);

      // determinar si la ruta que se esta solicitando tiene el acceso!
      if (req.nextUrl.pathname.includes(acces_to_page)) {
        console.log("puede entrar");
        return NextResponse.next();
      } else {
        console.log("no puede entrar");
        // lo regresa a su inicio
        return NextResponse.redirect(url);
      }
    }
  }
}
