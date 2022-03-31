
const path = require("path");

const multer = require("multer");

const res = require("express/lib/response");

const storage = multer.diskStorage({
  destination: function (req, file, callback) 
  {
    callback(null, path.join(__dirname, "../my-uploads"))
  },
  filename: function (req, file, callback) 
  {
    const uniquePrefix = Date.now();
    callback(null, uniquePrefix + "-" + file.originalname)
  },
});

const fileFilter = (req, file, callback) => 
{
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") 
  {
    callback(null, true);
  } 
  else 
  {
    callback(new Error("Incorrect mime type"), false);
  }
};

const options = 
{
  storage : storage,
  fileFilter : fileFilter,
  limits: 
  {
    fileSize: 1024 * 1024 * 5,
  },
};

const Uploads = multer(options);

const UploadFiles = (formKey,method) =>
{
    // formKey = "profilePic"
    // method = "single" or "multiple"
    return function (req,res,next)
    {
        let uploadedItem;
        if(method == "single")
        {
            uploadedItem = Uploads.single(formKey);
        }
        else if(method == "multiple")
        {
            uploadedItem = Uploads.any(formKey);
        }
        // const uploadedItem = Uploads.single(formKey);
        return uploadedItem(req,res,function(error)
        {
            // instanceof --> Checking error is in object of multer.MulterError class
            if(error instanceof multer.MulterError)
            {
                return res.status(500).send({message : error.message})
            }
            else if(error)
            {
                return res.status(501).send({message : error.message})
            }

            // req.filePath = req.file.path;
            // next();
            return next();
        })
    }
}

module.exports = {UploadFiles};