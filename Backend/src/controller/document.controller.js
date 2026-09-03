import documentModel from "../models/document.model.js";

export const getMyDocuments = async (req, res) => {
  const documents = await documentModel
    .find({ owner: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    documents,
  });
};

export const uploadDocument = async (req,res)=>{
     const { name, category } = req.body;
     if (!req.file) {
    return res.status(400).json({
      message: "Please upload a file",
    });
  }
   const document = await documentModel.create({
    owner: req.user._id,
    name,
    category,
    fileName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    fileData: req.file.buffer, 
  });
  res.status(201).json({
    message: "Document uploaded successfully",
    document,
  });
}

export const viewDocument = async (req, res) => {
  const document = await documentModel.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!document) {
    return res.status(404).json({
      message: "Document not found",
    });
  }

  res.set("Content-Type", document.mimeType);
  res.set(
    "Content-Disposition",
    `inline; filename="${document.fileName}"`
  );

  res.send(document.fileData);
};

export const deleteDocument = async (req, res) => {
  const document = await documentModel.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!document) {
    return res.status(404).json({
      message: "Document not found",
    });
  }

  res.status(200).json({
    message: "Document deleted successfully",
  });
};

export const updateDocument = async (req, res) => {
  const { name, category } = req.body;

  const document = await documentModel.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id,
    },
    { name, category },
    { new: true }
  );

  if (!document) {
    return res.status(404).json({
      message: "Document not found",
    });
  }

  res.status(200).json({
    message: "Document updated successfully",
    document,
  });
};