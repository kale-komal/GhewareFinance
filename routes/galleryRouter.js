const express = require("express");
const router = new express.Router();
const connection = require("../config/db");
const multer = require("multer");
const path = require("path");

const fs = require("fs");

const imageDir = path.join(__dirname, "../public/images/events");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the directory exists
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }
    cb(null, imageDir); // Set the directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the file's extension
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage });

router.get("/getgalleries", (req, res) => {
  const sql = "SELECT * FROM galleries";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get("/getgalleries/:id", (req, res) => {
  const galleryId = req.params.id;
  const sql = "SELECT * FROM galleries WHERE id = ?";
  connection.query(sql, [galleryId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get("/getgalleyimg/:id", (req, res) => {
  const galleryId = req.params.id;
  const sql = "SELECT * FROM gimages WHERE gallery_id = ?";
  connection.query(sql, [galleryId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/getallgalleries', (req, res) => {
  const sql = `
   SELECT g.id, g.title, MIN(gi.images) AS first_image
FROM galleries g
LEFT JOIN gimages gi ON g.id = gi.gallery_id
GROUP BY g.id;

  `;
  
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// In your backend router file
router.get('/geteventdetails/:id', (req, res) => {
  const eventId = req.params.id;
  const sql = `
    SELECT g.id, g.title, g.description, g.date, gi.images
    FROM galleries g
    LEFT JOIN gimages gi ON g.id = gi.gallery_id
    WHERE g.id = ?
  `;
  connection.query(sql, [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Event not found' });

    // Group photos for the specific event
    const eventDetails = {
      id: results[0].id,
      title: results[0].title,
      description: results[0].description,
      date: results[0].date,
      photos: results.map(result => result.images),
    };

    res.json(eventDetails);
  });
});



router.post("/creategalleries", upload.none(), (req, res) => {
  const { title, description, date } = req.body;
  const sql =
    "INSERT INTO galleries (title, description, date) VALUES (?, ?, ?)";
  connection.query(sql, [title, description, date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, description, date });
  });
});

router.post("/creategalleries/:id/images", upload.single("img"), (req, res) => {
  const galleryId = req.params.id;

  if (!galleryId)
    return res.status(400).json({ error: "Gallery ID is required" });

  // Check if the file is uploaded
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imagePath = `/images/events/${req.file.filename}`; // Save the relative path for the database

  const sql = "INSERT INTO gimages (gallery_id, images) VALUES (?, ?)";

  connection.query(sql, [galleryId, imagePath], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, gallery_id: galleryId, image: imagePath });
  });
});

router.patch("/editgalleries/:id", (req, res) => {
  const galleryId = req.params.id;
  const { title, description, date } = req.body;
  const sql =
    "UPDATE galleries SET title = ?, description = ?, date = ? WHERE id = ?";
  connection.query(
    sql,
    [title, description, date, galleryId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Gallery not found" });
      res.json({ message: "Gallery updated successfully" });
    }
  );
});

router.patch("/editgalleries/:galleryId/images/:imageId", (req, res) => {
  const { galleryId, imageId } = req.params;
  const { images } = req.body;
  const sql = "UPDATE gimages SET url = ? WHERE id = ? AND gallery_id = ?";
  connection.query(sql, [images, imageId, galleryId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Image not found" });
    res.json({ message: "Image updated successfully" });
  });
});

router.delete("/deletegalleries/:id", (req, res) => {
  const galleryId = req.params.id;
  const sql = "DELETE FROM galleries WHERE id = ?";
  connection.query(sql, [galleryId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Gallery not found" });
    res.json({ message: "Gallery deleted successfully" });
  });
});

router.delete("/deletegalleries/:galleryId/images/:imageId", (req, res) => {
  const { galleryId, imageId } = req.params;
  const sqlSelect =
    "SELECT images FROM gimages WHERE id = ? AND gallery_id = ?";

  // Step 1: Get the image path from the database
  connection.query(sqlSelect, [imageId, galleryId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ error: "Image not found" });

    // Construct the full image path
    const imagePath = path.join(__dirname, "..", "public", result[0].images);
    console.log("Attempting to delete file at path:", imagePath); // Debugging log

    // Step 2: Check if the file exists
    if (!fs.existsSync(imagePath)) {
      console.error("File not found:", imagePath);
      return res.status(404).json({ error: "Image file not found on server" });
    }

    // Step 3: Delete the image file from the filesystem
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("File deletion error:", err); // Debugging log
        return res.status(500).json({ error: "Failed to delete image file" });
      }

      // Step 4: Delete the record from the database
      const sqlDelete = "DELETE FROM gimages WHERE id = ? AND gallery_id = ?";
      connection.query(sqlDelete, [imageId, galleryId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0)
          return res.status(404).json({ error: "Image not found" });

        res.json({ message: "Image deleted successfully" });
      });
    });
  });
});

module.exports = router;
