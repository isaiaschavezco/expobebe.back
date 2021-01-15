/**
 * @Date:   2020-09-10T15:45:20-05:00
 * @Last modified time: 2020-09-10T15:52:51-05:00
 */



const express = require("express");
const app = express();
const multer = require("multer");
const MulterSharpResizer = require("multer-sharp-resizer");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

const multerStorage = multer.memoryStorage();

// Filter files with multer
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// *****  Multer .fields() *****
const uploadProductImages = upload.fields([
  { name: "cover", maxCount: 2 },
  { name: "gallery", maxCount: 4 },
]);

// *****  Multer .array() *****
// const uploadProductImages = upload.array("gallery", 4);

// *****  Multer .single() *****
// const uploadProductImages = upload.single("cover");

const resizerImages = async (req, res, next) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");

  // Used by multer .array() or .single
  // const filename = `gallery-${Date.now()}`;

  // Used by multer .fields and filename must be same object prop
  const filename = {
    cover: `cover-${Date.now()}`,
    gallery: `gallery-${Date.now()}`,
  };

  const sizes = [
    {
      path: "original",
      width: null,
      height: null,
    },
    {
      path: "large",
      width: 800,
      height: 950,
    },
    {
      path: "medium",
      width: 300,
      height: 450,
    },
    {
      path: "thumbnail",
      width: 100,
      height: 250,
    },
  ];

  const uploadPath = `./public/uploads/${year}/${month}`;

  const fileUrl = `${req.protocol}://${req.get(
    "host"
  )}/uploads/${year}/${month}`;

  // sharp options
  const sharpOptions = {
    fit: "contain",
    background: { r: 255, g: 255, b: 255 },
  };

  // create a new instance of MulterSharpResizer and pass params
  const resizeObj = new MulterSharpResizer(
    req,
    filename,
    sizes,
    uploadPath,
    fileUrl,
    sharpOptions
  );

  // call resize method for resizing files
  await resizeObj.resize();
  const getDataUploaded = resizeObj.getData();

  // Get details of uploaded files: Used by multer fields
  req.body.cover = getDataUploaded.cover;
  req.body.gallery = getDataUploaded.gallery;

  // Get details of uploaded files: Used by multer .array() or .single()
  // req.body.cover = getDataUploaded;
  // req.body.gallery = getDataUploaded;

  next();
};

const createProduct = async (req, res, next) => {
  res.status(201).json({
    status: "success",
    cover: req.body.cover,
    gallery: req.body.gallery,
  });
};

// route for see results of uploaded images
app.post("/products", uploadProductImages, resizerImages, createProduct);

const port = 8000;
app.listen(port, () => console.log(`app running on port ${port}...`));
