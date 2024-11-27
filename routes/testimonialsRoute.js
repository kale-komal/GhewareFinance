const express = require("express");
const router = new express.Router();
const connection = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imageDir = path.join(__dirname, "../public/images/team");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (!fs.existsSync(imageDir)) {
//       fs.mkdirSync(imageDir, { recursive: true });
//     }
//     cb(null, imageDir);
//   },
//   filename: function (req, file, cb) {
//     const title = req.body.TestimName.replace(/[^a-z0-9]/gi, "_")
//       .toLowerCase()
//       .split(" ")[0];
//     const extension = path.extname(file.originalname);
//     cb(null, `${title}_${extension}`);
//   },
// });

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'images', 'team'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
  },
});

const upload = multer({ storage });

router.post("/createteam", upload.single("img"), (req, res) => {
  const { TestimDate, TestimName, TestimInfo, TestimProfile } = req.body;
  const TestimPhoto = req.file ? `/images/team/${req.file.filename}` : null;
  const que =
    "INSERT INTO testimonials (TestimDate, TestimName,TestimInfo, TestimPhoto, TestimProfile) VALUES (?, ?, ?,?,?)";

  connection.query(
    que,
    [TestimDate, TestimName, TestimInfo, TestimPhoto, TestimProfile],
    (err, data) => {
      if (err) return res.json(err);
      return res.json("Member added successfuly");
    }
  );
});

router.get("/getteam", (req, res) => {
  const que = "SELECT * FROM testimonials";
  connection.query(que, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/getteam/:id", (req, res) => {
  const que = "SELECT * FROM testimonials WHERE TestimID=?";
  const id = req.params.id;
  connection.query(que, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

router.delete("/deleteteam/:id", (req, res) => {
  const id = req.params.id;

  const selectQuery = "SELECT TestimPhoto FROM testimonials WHERE TestimID=?";
  connection.query(selectQuery, [id], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching Team members", error: err });
    if (data.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    const imagePath = path.join(__dirname, "..", "public", data[0].TestimPhoto);

    // Delete the image file from the public folder if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error deleting image", error: err });
        }

        // Proceed with deleting the news item from the database
        const deleteQuery = "DELETE FROM testimonials WHERE TestimID = ?";
        connection.query(deleteQuery, [id], (err, data) => {
          if (err) return res.status(500).json("Error");
          return res.json("Deleted successfully");
        });
      });
    } else {
      // If the image doesn't exist, just delete the news item
      const deleteQuery = "DELETE FROM testimonials WHERE TestimID = ? ";
      connection.query(deleteQuery, [id], (err, data) => {
        if (err) return res.status(500).json("Error deleting Testimonial");
      });
    }
  });
});

//Update athe testimonial

// router.patch("/editteam/:id", upload.single("TestimPhoto"), (req, res) => {
//   const { TestimDate, TestimName, TestimInfo, TestimProfile } = req.body;
//   const id = req.params.id;
//   const newImage = req.file ? `/images/team/${req.file.filename}` : null;

//   const selectQuery = "SELECT TestimPhoto FROM testimonials WHERE TestimID = ?";
//   connection.query(selectQuery, [id], (err, data) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ message: "Error fetching testimonial", error: err });
//     }

//     const oldImagePath = data[0]?.TestimPhoto
//       ? path.join(__dirname, "..", "public", data[0].TestimPhoto)
//       : null;
//     const imageToUpdate = newImage || data[0]?.TestimPhoto;

//     const updateQuery =
//       "UPDATE testimonials SET TestimDate=?, TestimName=?, TestimPhoto=?, TestimInfo=?, TestimProfile=? WHERE TestimID=?";
//     const updateValues = [
//       TestimDate,
//       TestimName,
//       imageToUpdate,
//       TestimInfo,
//       TestimProfile,
//       id,
//     ];

//     const updateDatabase = () => {
//       connection.query(updateQuery, updateValues, (err) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ message: "Failed to update testimonial", error: err });
//         }
//         res.status(200).json({ message: "Testimonial updated successfully" });
//       });
//     };

//     // Delete old image if a new one is uploaded
//     if (newImage && oldImagePath && fs.existsSync(oldImagePath)) {
//       fs.unlink(oldImagePath, (err) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ message: "Error deleting old image", error: err });
//         }
//         updateDatabase();
//       });
//     } else {
//       updateDatabase();
//     }
//   });
// });



// Route to update testimonial with image handling
router.patch("/editteam/:id", upload.single("TestimPhoto"), (req, res) => {
  const { TestimName, TestimInfo, TestimDate, TestimProfile } = req.body;
  const testimonialId = req.params.id;
  let TestimPhoto = req.file ? `/images/team/${req.file.filename}` : null;

  // If no new image is uploaded, retain the old image URL
  if (!TestimPhoto) {
    const selectQuery = "SELECT TestimPhoto FROM testimonials WHERE TestimID = ?";
    connection.query(selectQuery, [testimonialId], (err, data) => {
      if (err) {
        console.error("Error fetching testimonial item:", err);
        return res.status(500).json({ message: "Error fetching testimonial item", error: err });
      }

      TestimPhoto = data[0].TestimPhoto;

      const query = "UPDATE testimonials SET TestimName = ?, TestimProfile = ?, TestimInfo = ?, TestimDate = ?, TestimPhoto = ? WHERE TestimID = ?";
      connection.query(query, [TestimName, TestimProfile, TestimInfo, TestimDate, TestimPhoto, testimonialId], (err) => {
        if (err) {
          console.error("Failed to update testimonial:", err);
          return res.status(500).json({ message: "Failed to update testimonial", error: err });
        }
        return res.status(200).json({ message: "Testimonial updated successfully" });
      });
    });
  } else {
    // If a new image is uploaded, delete the old image first
    const selectQuery = "SELECT TestimPhoto FROM testimonials WHERE TestimID = ?";
    connection.query(selectQuery, [testimonialId], (err, data) => {
      if (err) {
        console.error("Error fetching testimonial item:", err);
        return res.status(500).json({ message: "Error fetching testimonial item", error: err });
      }

      const oldImagePath = path.join(__dirname, "..", "public", data[0].TestimPhoto);

      // Delete the old image file if it exists
      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
            return res.status(500).json({ message: "Error deleting old image", error: err });
          }

          // Proceed to update the testimonial with the new image
          const query = "UPDATE testimonials SET TestimName = ?, TestimProfile = ?, TestimInfo = ?, TestimDate = ?, TestimPhoto = ? WHERE TestimID = ?";
          connection.query(query, [TestimName, TestimProfile, TestimInfo, TestimDate, TestimPhoto, testimonialId], (err) => {
            if (err) {
              console.error("Failed to update testimonial:", err);
              return res.status(500).json({ message: "Failed to update testimonial", error: err });
            }
            return res.status(200).json({ message: "Testimonial updated successfully" });
          });
        });
      } else {
        // If the old image doesn't exist, proceed to update without deleting the image
        const query = "UPDATE testimonials SET TestimName = ?, TestimProfile = ?, TestimInfo = ?, TestimDate = ?, TestimPhoto = ? WHERE TestimID = ?";
        connection.query(query, [TestimName, TestimProfile, TestimInfo, TestimDate, TestimPhoto, testimonialId], (err) => {
          if (err) {
            console.error("Failed to update testimonial:", err);
            return res.status(500).json({ message: "Failed to update testimonial", error: err });
          }
          return res.status(200).json({ message: "Testimonial updated successfully" });
        });
      }
    });
  }
});


module.exports = router;
