const { db, auth } = require("../database/firebase");
const { Router } = require("express");
const router = Router();

const type = "aux";

//---CREATE PROJECT------------------------------------------------------------->
// Nuevo comentario adic
router.post("/new-project", async (req, res) => {
  await auth
    .verifyIdToken(req.body.idToken)
    .then(async (claims) => {
      if (claims.type === type) {
        //consultar si el inspector existe?
        //consultar si el cliente existe?
        //creación de proyecto relacionado con la organización
        try {
          await db.collection("Projects").add(req.body.project); // add project
          res.status(200).json({
            autorization: true,
            success: true,
          });
        } catch (errors) {
          res.status(401).json({
            success: false,
            error: errors.message,
          });
        }
      } else {
        res.status(401).json({
          autorization: false,
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(401).json({
        message: "User not found",
        error: err,
      });
    });
});
//---LIST PROJECTS-------------------------------------------------------------->
router.get("/list-projects", async (req, res) => {
  try {
    //consulta proyectos de una sola organización?
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            const projectsRerive = await db.collection("Projects").get(); // get projects
            const projects = projectsRerive.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            res.status(200).send(projects);
          } catch (errors) {
            console.log("Project don't retrieve " + errors);
            res.status(401).json({
              success: false,
              error: error.message,
            });
          }
        } else {
          res.status(401).json({
            autorization: false,
            success: false,
          });
        }

        //res.send("ok")
      })
      .catch((err) => {
        res.status(401).json({
          message: "User not found",
          error: err.message,
        });
      });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//---UPDATE PROJECT------------------------------------------------------------->
router.post("/update-projects", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          //Consultamos si el proyecto existe?
          try {
            await db
              .collection("Projects")
              .doc(req.body.docId)
              .update(req.body.project); // add project
            res.status(200).json({
              autorization: true,
              success: true,
            });
          } catch (errors) {
            res.status(401).json({
              success: false,
              error: errors.message,
            });
          }
        } else {
          res.status(401).json({
            autorization: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.json({
          message: "User not found",
          error: err,
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
//---DELETE PROJECT----------------------------------------------------------->
router.post("/delete-project", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db.collection("Projects").doc(req.body.docId).delete(); // add project
            //Consultar si existe?
            res.status(200).json({
              success: true,
            });
          } catch (errors) {
            res.status(401).json({
              success: false,
              error: error.message,
            });
          }
        } else {
          res.status(401).json({
            autorization: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.json({
          message: "User not found",
          error: err,
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
//CUSTOMERS

//---CREATE CUSTOMER
router.post("/new-customer", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db.collection("Customers").add(req.body.customer); // add project
            res.status(200).json({
              autorization: true,
              success: true,
            });
          } catch (errors) {
            res.status(401).json({
              success: false,
              error: err.message,
            });
          }
        } else {
          res.status(401).json({
            autorization: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(401).json({
          message: "User not found",
          error: err,
        });
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
});

//------LIST CUSTOMERS----------------------------------------------------------
router.post("/list-customers", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            const projectsRerive = await db
              .collection("Customers")
              .where("orgId", "==", req.body.orgId)
              .get(); // get projects
            const projects = projectsRerive.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            res.send(projects);
          } catch (errors) {
            res.status(401).json({
              success: false,
              message: err.message,
            });
          }
        } else {
          res.status(401).json({
            autorization: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(401).json({
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
});

//---UPDATE CUSTOMER---
router.post("/update-customer", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db
              .collection("Customers")
              .doc(req.body.docId)
              .update(req.body.customer); // add project
            res.status(200).json({
              autorization: true,
              success: true,
            });
          } catch (errors) {
            res.status(401).json({
              success: false,
              message: err.message,
            });
          }
        } else {
          res.status(401).json({
            autorization: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(401).json({
          message: "User not found",
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
});

//---DELETE CUSTOMER---
router.post("/delete-customer", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db.collection("Customers").doc(req.body.docId).delete(); // add project
            res.status(200).json({
              success: true,
            });
          } catch (errors) {
            res.status(200).json({
              success: false,
              message: err.message,
            });
          }
        } else {
          res.status(401).json({
            autorization: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(401).json({ message: "User not found", error: err });
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
});
//---LIST INSPECTORS--
router.post("/list-inspectors", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            const projectsRerive = await db
              .collection("Users")
              .where("orgId", "==", req.body.orgId)
              .where("type", "==", "inspector")
              .get(); // get projects
            const projects = projectsRerive.docs.map((doc) => ({
              displayName: doc.data().displayName,
              uid: doc.data().uid,
            }));
            console.log("Inspectors projects");
            res.send(projects);
          } catch (errors) {
            console.log("Inspectors don't retrieve " + errors);
            res.json({
              success: false,
              message: err.message,
            });
          }
        } else {
          console.log("Is not a valid autorization");
          res.json({
            autorization: false,
            success: false,
          });
        }

        //res.send("ok")
      })
      .catch((err) => {
        res.json({
          message: "User not found",
          error: err,
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

router.post("/get-org-id", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type || claims.type === "inspector") {
          if (claims.type === type || claims.type === "inspector") {
            try {
              const projectsRerive = await db
                .collection("Users")
                .where("uid", "==", req.body.uid)
                .get(); // get projects
              const projects = projectsRerive.docs.map(
                (doc) => doc.data().orgId
              );
              console.log("Inspectors projects");
              res.send(projects);
            } catch (errors) {
              console.log("Inspectors don't retrieve " + errors);
              res.json({
                success: false,
                message: err.message,
              });
            }
          } else {
            console.log("Is not a valid autorization");
            res.json({
              autorization: false,
              success: false,
            });
          }
        }
      })
      .catch((err) => {
        res.json({
          message: "User not found",
          error: err,
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

//---list projects------------------------------------------------------------->
router.post("/getProjectsForAux", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            const projectsRerive = await db
              .collection("Projects")
              .where("orgId", "==", req.body.orgId)
              .get();
            const projects = projectsRerive.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Retrive Projects");
            res.send(projects);
          } catch (errors) {
            console.log("Zone don't retrieve " + errors);
            res.json({
              success: false,
              error: err.message,
            });
          }
        } else {
          console.log("Is not a valid autorization");
          res.status(401).json({
            success: false,
          });
        }
        //res.send("ok")
      })
      .catch((err) => {
        res.json({
          message: "User not found",
          error: err,
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
module.exports = router;
