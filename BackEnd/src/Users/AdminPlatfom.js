/**
 * Signin y Signup
 */

const { db, auth } = require("../database/firebase");
const { Router } = require("express");
const { Query, QueryDocumentSnapshot } = require("firebase-admin/firestore");
const router = Router();

//---CREATE SUPER ADMIN--------------------------------------------------------------------------------->
router.post("/new-superadmin", async (req, res) => {
  try {
    await auth
      .createUser({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName,
        disabled: req.body.disabled,
      })
      .then(async (userRecord) => {
        try {
          if ((req.body.data.type = "superadmin")) {
            await auth
              .setCustomUserClaims(userRecord.uid, { type: "superadmin" })
              .then(async() => {
                console.log("se creo el superusuario");
                await db.collection("Users").add({
                  uid: userRecord.uid,
                  ...req.body.data,
                });
              });
          }
        } catch (error) {}
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
        res.send(userRecord);
      })
      .catch((error) => {
        console.log("Error creating new user:", error);
      });
  } catch (errors) {
    console.log(errors);
    res.json({
      success: false,
      message: errors.message,
    });
  }
});

//---NEW ADMIN  CREATE---------------------------------------------------------------------------------->
router.post("/new-admin", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === "superadmin") {
          await auth
            .createUser({
              email: req.body.email,
              password: req.body.password,
              displayName: req.body.displayName,
              disabled: req.body.disabled,
            })
            .then(async (userRecord) => {
              // User in db
              try {
                await db.collection("Users").add({
                  uid: userRecord.uid,
                  ...req.body.data,
                });
                console.log("User data in db ");
              } catch (error) {
                console.log("Error: " + error);
              }

              try {
                await db.collection("Companies").add({
                  uidAdmin: userRecord.uid,
                  ...req.body.dataOrg,
                });
              } catch (error) {
                console.log("Error: " + error);
              }

              //Set user claim
              try {
                if (req.body.data.type == "admin") {
                  await auth
                    .setCustomUserClaims(userRecord.uid, { type: "admin" })
                    .then(() => {
                      console.log("se creo el admin");
                    });
                }
              } catch (error) {}

              // See the UserRecord reference doc for the contents of userRecord.
              console.log(
                "Successfully created new user in auth system:",
                userRecord.uid
              );

              //
              res.send(userRecord);
            })
            .catch((error) => {
              console.log("Error creating new user:", error);
            });
        } else {
          res.send("No pudo crear un usuario admin");
          console.log("No se creo admin");
        }
      })
      .catch((err) => {
        res.json({ message: "NO existe el superadmin" });
        console.log("Error: " + err);
      });
  } catch (errors) {
    console.log(errors);
    res.json({ success: false, message: errors.message });
  }
});

//---ADMIN  DELETE--------------------------------------------------------------------------------------->
router.post("/delete-admin", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === "superadmin") {
          await auth
            .deleteUser(req.body.uid)
            .then(async () => {
              res.json({ success: true });

              try {
                await db.collection("Users").doc(req.body.uid).delete();
              } catch (arror) {
                console.log(arror);
              }

              try {
                await db.collection("Companies").doc(req.body.uid).delete();
              } catch (error) {
                console.log(error);
              }
            })
            .catch((error) => {
              console.log("Error deleteUser :", error);
              res.json({ success: false });
            });
        } else {
          res.send("No es un superadmin");
          console.log("No se pudo borrar el admin");
        }
      })
      .catch((err) => {
        res.json({ message: "NO existe el superadmin" });
        console.log("Error: " + err);
      });
  } catch (errors) {
    console.log(errors);
    res.json({
      success: false,
      message: errors.message,
    });
  }
});

//---UPDATE ADMIN--------------------------------------------------------------------------------------->
router.post("/update-admin", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === "superadmin") {
          await auth
            .updateUser(req.body.uid, {
              email: req.body.email,
              password: req.body.password,
              displayName: req.body.displayName,
              disabled: req.body.disabled,
            })
            .then(async (userRecord) => {
              try {
                await db
                  .collection("Users")
                  .doc(userRecord.uid)
                  .update(req.body.data);
                console.log("User data in db update");
              } catch (error) {
                console.log("Error: update failed" + error);
              }

              try {
                await db
                  .collection("Companies")
                  .doc(userRecord.uid)
                  .update(req.body.dataOrg);
              } catch (error) {
                console.log("Error: update failed" + error);
              }

              // See the UserRecord reference doc for the contents of userRecord.
              console.log(
                "Successfully update  user in auth system:",
                userRecord.uid
              );
              res.send(userRecord);
            })
            .catch((error) => {
              console.log("Error creating new user:", error);
            });
        } else {
          res.send("No pudo update  usuario admin");
          console.log("No se creo admin");
        }
      })
      .catch((err) => {
        res.json({ message: "NO existe el superadmin" });
        console.log("Error: " + err);
      });
  } catch (errors) {
    console.log(errors);
    res.json({
      success: true,
      message: errors.message,
    });
  }
});

//---LIST ADMIN------------------------------------------------------------------------------------------>
router.get("/list-admin", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === "superadmin") {
          await auth
            .listUsers()
            .then(async (listUsersResult) => {
              try {
                const QueryDocumentSnapshotComapnies = await db
                  .collection("Companies")
                  .get();
                var orgs = QueryDocumentSnapshotComapnies.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                //const companies=QueryDocumentSnapshotComapnies.docs.filter(doc => doc.id=="qU9XejdVDLNAhNTNvBaE6yQKzer1");
              } catch (error) {
                console.log(error);
              }

              try {
                const QueryDocumentSnapshotComapniesUsers = await db
                  .collection("Users")
                  .where("type", "==", "admin")
                  .get();
                var usersQuery = QueryDocumentSnapshotComapniesUsers.docs.map(
                  (doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  })
                );
              } catch (errors) {
                console.log(errors);
              }
              // const lala=orgs.find(org=>org.id==="qU9XejdVDLNAhNTNvBaE6yQKzer1");
              // console.log(lala);

              var users = [];
              listUsersResult.users.forEach((element) => {
                if (element.customClaims.type === "admin") {
                  const company = orgs.find(
                    (orgsm) => orgsm.id === element.uid
                  );
                  const user = usersQuery.find(
                    (userlog) => userlog.id === element.uid
                  );

                  const datos = {
                    ...company,
                    ...user,
                    ...element,
                  };
                  users.push(datos);
                }
              });

              res.send(users);
            })
            .catch((error) => {
              console.log("Error listUsersResult :", error);
            });
        } else {
          res.send("No pudo update  usuario admin");
          console.log("No se creo admin");
        }
      })
      .catch((err) => {
        res.json({ message: "NO existe el superadmin" });
        console.log("Error: " + err);
      });
  } catch (errors) {
    console.log(errors);
    res.send({
      success: false,
      error: errors.message,
    });
  }
});

/**
 *  Codigos de pruebas...
 */

//---Nombre del UID------------------------------------------------------------------------------------->
router.post("/get-username", async (req, res) => {
  try {
    const projectsRerive = await db
      .collection("Users")
      .where("uid", "==", req.body.uid)
      .get(); // get projects
    const projects = projectsRerive.docs.map((doc) => doc.data().displayName);
    console.log("Name by uid");
    res.send(projects[0]);
  } catch (error) {
    console.log(error);
  }
});

//---Correo del UID------------------------------------------------------------------------------------>
router.get("/get-emailuser", async (req, res) => {
  try {
  } catch (errors) {
    console.log(errors);
    res.json({
      success: false,
      error: errors.message,
    });
  }

  const additionalClaims = {
    premiumAccount: true,
    profe: false,
    master: false,
    inspecot: false,
  };
  await auth
    .createCustomToken(req.body.uid, additionalClaims)
    .then((customToken) => {
      res.send(customToken);
    })
    .catch((err) => {
      console.log(err);
    });
});

//---UID de correo---------------------------------------------------------------------------->
router.post("/get-uid", async (req, res) => {
  try {
    const additionalClaims = {
      premiumAccount: true,
      profe: false,
      master: true,
      inspecot: true,
    };
    await auth
      .getUserByEmail(req.body.email, additionalClaims)
      .then((buff) => {
        res.send(buff.uid);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//---Token de correo---------------------------------------------------------------------------->
router.post("/get-tokenmail", async (req, res) => {
  try {
    const additionalClaims = {
      premiumAccount: true,
      profe: false,
      master: false,
      inspecot: false,
    };
    await auth
      .createCustomToken(req.body.email, additionalClaims)
      .then((buff) => {
        res.send(buff);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

//---Token de correo---------------------------------------------------------------------------->
router.post("/get-tokenverify", async (req, res) => {
  try {
    console.log("Data retrieve: " + req.body);
    console.log("Token retrieve: " + req.body.token);
    await auth
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        //const uid = decodedToken.uid;
        console.log(decodedToken);
        res.send(decodedToken);
      })
      .catch((error) => {
        console.log(error);
        res.json({
          success: false,
          error: error.message,
        });
        // Handle error
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    Auth.signInWithEmailAndPassword(req.body.email, req.body.password)
      .then((userCredential) => {
        // Signed in

        res.send(userCredential);
        // ...
      })
      .catch((error) => {
        console.error(error);
        res.json({
          success: false,
          message: error.message,
        });
      });
  } catch (errors) {
    console.log(errors);
    res.json({
      success: false,
      message: errors.message,
    });
  }
});

module.exports = router;
