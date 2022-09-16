const { db, auth } = require("../database/firebase");
const { Router } = require("express");
const { UserRecord, Auth } = require("firebase-admin/auth");
const router = Router();

/**
 *                           CRUD zonas de proyecto
 * -ID
 * -Proyectos
 * --Area
 * --No. iluminarias
 * --Nombre de la zona
 * --Tipo de zona
 * --Array con clave y valor
 * ---indice, marca de tiempo y un valor
 */

const type = "inspector";
//---list projects------------------------------------------------------------->
router.post("/getProjectsForInspector", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            const projectsRerive = await db
              .collection("Projects")
              .where("idInspector", "==", req.body.uid)
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
//---CREATE ZONE------------------------------------------------------------->
router.post("/new-zone", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Zones")
              .add(req.body.zone);
            console.log("Zone created");
            res.json({
              success: true,
            });
          } catch (errors) {
            console.log("Zone don't created " + errors);
            res.json({
              success: false,
              error: err.message,
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
          success: false,
          error: err.message,
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
//---CREATE MEASURE ZONE------------------------------------------------------------->
router.post("/new-measure-zone", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          let baseDeDatos = db
            .collection("Projects")
            .doc(req.body.docIdproject)
            .collection("Zones")
            .doc(req.body.docIdZone)
            .collection("Measures");
          try {
            await baseDeDatos.add(req.body.measure);
            console.log("Measure created");
            res.json({
              success: true,
            });
          } catch (errors) {
            console.log("Zone don't created " + errors);
            res.json({
              success: false,
              error: err.message,
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
      error: err.message,
    });
  }
});
//---LIST ZONE-------------------------------------------------------------->
router.post("/list-zone", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            const projectsRerive = await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Zones")
              .get(); // get projects
            const projects = projectsRerive.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Retrive Zones");
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
      error: err.message,
    });
  }
});
//---LIST MEASURES ZONES-------------------------------------------------------------->
router.post("/list-measure-zone", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            const projectsRerive = await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Zones")
              .doc(req.body.docIdZone)
              .collection("Measures")
              .orderBy("num", "asc")
              .get(); // get projects
            const projects = projectsRerive.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Detalle de las medidas");
            res.send(projects);
          } catch (errors) {
            console.log("Error en la obtencion por :" + errors);
            res.json({
              success: false,
              error: err.message,
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
//---UPDATE ZONE------------------------------------------------------------->
router.post("/update-zone", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Zones")
              .doc(req.body.docIdZone)
              .update(req.body.zone); // add project
            console.log("Zone update successful");
            res.json({
              success: true,
            });
          } catch (errors) {
            console.log("Zone don't update " + errors);
            res.json({
              success: false,
              error: err.message,
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
//---UPDATE MEASURE ZONE------------------------------------------------------------->
router.post("/update-measure", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            const projectsRerive = await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Zones")
              .doc(req.body.docIdZone)
              .collection("Measures")
              .doc(req.body.idMeasure)
              .update(req.body.measure); // add project
            console.log("Zone update successful");
            res.json({
              success: true,
            });
          } catch (errors) {
            console.log("Zone don't update " + errors);
            res.json({
              success: false,
              error: err.message,
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
//---DELETE ZONE----------------------------------------------------------->
router.post("/delete-zone", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Zones")
              .doc(req.body.docIdZone)
              .delete(); // add project
            console.log("Zone delete successful");
            res.json({
              success: true,
            });
          } catch (errors) {
            console.log("Zone don't delete " + errors);
            res.json({
              success: false,
              error: err.message,
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
//---DELETE MEASURE ZONE----------------------------------------------------------->
router.post("/delete-measure", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            const projectsRerive = await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Zones")
              .doc(req.body.docIdZone)
              .collection("Measures")
              .doc(req.body.idMeasure)
              .delete(); // add project
            console.log("Measure delete successful");
            res.json({
              success: true,
            });
          } catch (errors) {
            console.log("Measure don't delete " + errors);
            res.json({
              success: false,
              error: err.message,
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

//--NEW COMMENT
router.post("/new-comment", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Comments")
              .add(req.body.comment)
              .then(() => {
                console.log("comment created");
                res.status(200).json({
                  success: true,
                });
              })
              .catch((err) => {
                console.log("comment not created");
                res.status(401).json({
                  error: err,
                  success: false,
                });
              });
          } catch (errors) {
            console.log("Comments don't created " + errors);
            res.json({
              success: false,
              error: err.message,
            });
          }
        } else {
          console.log("Is not a valid autorization");
          res.json({
            autorization: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.json({
          success: false,
          error: err.message,
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


//--get COMMENTs
router.post("/get-comments", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Comments")
              .get()              
              .then((docComents) => {
                const comements = docComents.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                console.log("comment retrieved");
                res.status(200).json({
                  success: true,
                  data: comements,
                });
              })
              .catch((err) => {
                console.log("comment not retrieved");
                res.status(401).json({
                  error: err,
                  success: false,
                });
              });
          } catch (errors) {
            console.log("Comments don't retrieved " + errors);
            res.json({
              success: false,
              error: err.message,
            });
          }
        } else {
          console.log("Is not a valid autorization");
          res.json({
            autorization: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.json({
          success: false,
          error: err.message,
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


//--delete COMMENT
router.post("/delete-comment", async (req, res) => {
  try {
    await auth
      .verifyIdToken(req.body.idToken)
      .then(async (claims) => {
        if (claims.type === type) {
          try {
            await db
              .collection("Projects")
              .doc(req.body.docIdproject)
              .collection("Comments")
              .doc(req.body.commentId)
              .delete()
              .then(() => {
                console.log("comment deleted");
                res.status(200).json({
                  success: true,
                });
              })
              .catch((err) => {
                console.log("comment not deleted");
                res.status(401).json({
                  error: err,
                  success: false,
                });
              });
          } catch (errors) {
            console.log("Comments don't delete " + errors);
            res.json({
              success: false,
              error: err.message,
            });
          }
        } else {
          console.log("Is not a valid autorization");
          res.json({
            autorization: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.json({
          success: false,
          error: err.message,
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
