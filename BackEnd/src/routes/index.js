const { db, auth } = require("../database/firebase");
const { Router } = require("express");

const router = Router();

router.post("/get-data-company", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === "aux" || claims.type === "inspector") {
          try {
            await db
              .collection("Companies")
              .doc(req.body.orgId)
              .get()
              .then((company) => {
                if (company.exists) {
                  console.log(company);

                  res.status(200).json({
                    success: true,
                    orgId:company.id,
                    ...company.data(),
                  });
                } else {
                  res.status(401).json({
                    success: false,
                  });
                }
              })
              .catch((err) => {
                res.status(500).json({
                  success: false,
                  message: err,
                });
              });
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
        res.json({
          success: false,
          message: err.message,
        });
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

router.post("/create-db-user", async (req, res) => {
  try {
    const QueryDocumentSnapshot = await db
      .collection("Users")
      .doc("id54654")
      .set(req.body);
    res.send(QueryDocumentSnapshot);
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await db
      .collection("Organismos")
      .get()
      .then((QueryDocumentSnapshot) => {
        var orgs = QueryDocumentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.status(200).json({
          success: true,
          data: orgs,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          error: err.message,
        });
      });

    console.log(orgs);
    console.log(typeof orgs === "object");
  } catch (errors) {
    console.log(errors);
  }

  // res.send(QueryDocumentSnapshot.docs);
});

router.post("/new-org", (req, res) => {
  try {
    console.log(req.body);

    res.send("ORGANIZATION CREATED");
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
});

function creteToken(uid) {
  auth
    .createCustomToken(ud)
    .then((customToken) => {
      // Send token back to client
    })
    .catch((error) => {
      console.log("Error creating custom token:", error);
    });
}

router.get("/get-user", async (req, res) => {
  try {
    await auth
      .getUser(req.body.uid)
      .then((UserRecord) => {
        res.send(UserRecord);
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

router.get("/get-token", async (req, res) => {
  try {
    const additionalClaims = {
      premiumAccount: true,
      profe: false,
      master: true,
      inspecot: true,
    };
    await auth
      .createCustomToken(req.body.uid, additionalClaims)
      .then((customToken) => {
        res.send(customToken);
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

router.get("/verify-token", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        //const uid = decodedToken.uid;
        res.send(decodedToken);
      })
      .catch((error) => {
        res.send({
          success: false,
        });
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/new-user", async (req, res) => {
  await auth
    .createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: req.bodydisplayName,
      disabled: req.body.disabled,
    })
    .then(async (userRecord) => {
      if (req.body.data.type == "aux") {
        await auth
          .setCustomUserClaims(userRecord.uid, { aux: true })
          .then((userCla) => {
            console.log(userCla);
          })
          .catch((err) => {
            console.log("error: " + err);
          });
      } else if (req.body.data.type == "admin") {
        await auth
          .setCustomUserClaims(userRecord.uid, { admin: true })
          .then((userCla) => {})
          .catch((err) => {});
      }

      try {
        await db.collection("Users").doc(uerRecord.uids).set(req.body.data);
        console.log("User data in db ");
      } catch (error) {}

      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      res.send(userRecord);
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
});

module.exports = router;
