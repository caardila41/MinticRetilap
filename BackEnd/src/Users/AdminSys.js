/**
 *  Acá se implementan las funciones que utiliza el administrador del sistema
 */
const { db, auth } = require("../database/firebase");
const { Router, json } = require("express");
const { UserRecord, Auth } = require("firebase-admin/auth");
const router = Router();

//--GET ORGANIZATION--
router.post("/get-data-company-byAdmin", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === "admin") {
          try {
            const company = await db
              .collection("Companies")
              .where("uidAdmin", "==", req.body.uid)
              .get();

            const org = company.docs.map((doc) => ({
              orgId: doc.id,
              ...doc.data(),
            }));
            console.log(org);
            res.send(org);
          } catch (error) {
            res.json({
              success: false,
              error: error.message,
            });
          }
        } else {
          res.status(401).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: err.message,
        });
        console.log("Error: " + err);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

//---NEW USER  CREATE---------------------------------------------------------------------------------->
router.post("/new-profile", async (req, res) => {
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
          await db.collection("Users").add({
            uid: userRecord.uid,
            email: req.body.email,
            displayName: req.body.displayName,
            ...req.body.data,
          });
          console.log("User data in db ");
          if (req.body.data.type == "inspector") {
            await auth
              .setCustomUserClaims(userRecord.uid, { type: "inspector" })
              .then(() => {
                console.log("se creo inspector");
                // send a response in status 201
                res.status(201).json({
                  success: true,
                  message: "se creo inspector",
                });
              });
          } else if (req.body.data.type == "aux") {
            await auth
              .setCustomUserClaims(userRecord.uid, { type: "aux" })
              .then(() => {
                console.log("se creo el auxiliar");
                res.status(201).json({
                  success: true,
                  message: "se creo el auxiliar",
                });
              });
          }
        } catch (error) {
          res.json({
            success: false,
            error: error.message,
          });
          console.log("Error: " + error);
        }
      })
      .catch((error) => {
        console.log("Error creating new user:", error);
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
//---profile  DELETE--------------------------------------------------------------------------------------->
router.post("/delete-profile", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === "admin") {
          await auth
            .deleteUser(req.body.uid)
            .then(async () => {              
              try {
                await db.collection("Users").doc(req.body.docId).delete()
                .then(()=>{
                  console.log("User deleted successfully");
                  res.status(200).json({ success: true });
                }).catch(err => {
                  console.log(err);
                  res.status(401).json({ success: false, error: err });
                });
              } catch (error) {
                console.log(error);
                res.json({
                  success: false,
                  error: error.message,
                });
              }
            })
            .catch((error) => {
              console.log("Error deleteUser :", error);
              res.json({ success: false });
            });
        } else {
          res.send("No es un admin");
          console.log("No se pudo borrar el admin");
        }
      })
      .catch((err) => {
        res.json({ message: "NO existe el superadmin" });
        console.log("Error: " + err);
      });
  } catch (errors) {
    res.json({
      success: false,
      errors: errors.message,
    });
  }
});

//---UPDATE ADMIN--------------------------------------------------------------------------------------->
router.post("/update-profile", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === "admin") {
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
                  .doc(req.body.docId)
                  .update(req.body.data);
                console.log("User data in db update");
              } catch (error) {
                console.log("Error: update failed" + error);
              }
              // try {
              //     await db.collection("Companies")
              //         .doc(userRecord.uid).update(req.body.dataOrg)
              // } catch (error) {
              //     console.log("Error: update failed" + error);
              // }
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
          res.send("No pudo actualizar usuario");
          console.log("No se creo admin");
        }
      })
      .catch((err) => {
        res.json({ message: "NO existe el admin" });
        console.log("Error: " + err);
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//---LIST ADMIN------------------------------------------------------------------------------------------>
router.post("/list-profile", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === "admin") {
          await db
            .collection("Users")
            .where("orgId", "==", req.body.orgId)
            .where("type", "in", ["inspector", "aux"])
            .get()
            .then((listUsersResult) => {
              const users = listUsersResult.docs.map((doc) => ({
                docId: doc.id,
                ...doc.data(),
              }));
              res.status(200).json({
                data: users,
              });
            })

            /* await auth
            .listUsers()
            .then(async (listUsersResult) => {

              

              var users = [];
              listUsersResult.users.forEach((element) => {
                



                if (element.hasOwnProperty("customClaims")) {
                  //console.log(element);
                  if (
                    element.customClaims.type == "aux" ||
                    element.customClaims.type == "inspector"
                  ) {
                    users.push(element);
                  }
                }
              });
              res.status(200).json({
                data: users,
              });
             
            })
            */
            .catch((error) => {
              res.status(error.status).json({
                success: false,
                error: error.message,
              });
              console.log("Error listUsersResult :", error);
            });
        } else {
          res.send("No pudo mostrar  usuario admin");
        }
      })
      .catch((err) => {
        res.json({ message: "NO existe el superadmin" });
        console.log("Error: " + err);
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
