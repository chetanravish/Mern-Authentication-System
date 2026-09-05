import documentModel from "../models/document.model.js";
import familyModel from "../models/family.model.js";
import { PutObjectCommand, GetObjectCommand ,DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { s3 } from "../config/AwsS3.js";
import config from "../config/config.js";

export const getMyDocuments = async (req, res) => {
  const documents = await documentModel
    .find({ owner: req.user._id })
    .populate("member", "name relation")
    .sort({ createdAt: -1 });

  res.status(200).json({
    documents,
  });
};

export const uploadDocument = async (req, res) => {
  const { name, category, memberId } = req.body;
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload a file",
    });
  }

  const member = await familyModel.findOne({
    _id: memberId,
    owner: req.user._id,
  });

  if (!member) {
    return res.status(404).json({
      message: "Family member not found",
    });
  }
  const safeName = req.file.originalname.replace(/\s+/g, "-");

  const s3Key = `documents/${req.user._id}/${randomUUID()}-${safeName}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: config.AWS_BUCKET_NAME,
      Key: s3Key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }),
  );

  const document = await documentModel.create({
    owner: req.user._id,
    member: memberId,
    name,
    category,
    fileName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    s3Key,
  });
  const populated = await document.populate("member", "name relation isOwner");
  return res.status(201).json({
    message: "Document uploaded successfully",
    document: populated,
  });
};

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

  const command = new GetObjectCommand({
    Bucket: config.AWS_BUCKET_NAME,
    Key: document.s3Key,
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 60, 
  });

  return res.status(200).json({
    url: signedUrl,
  });
};

export const deleteDocument = async (req, res) => {
  const document = await documentModel.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!document) {
    return res.status(404).json({
      message: "Document not found",
    });
  }

    await s3.send(
    new DeleteObjectCommand({
      Bucket: config.AWS_BUCKET_NAME,
      Key: document.s3Key,
    })
  );

    await document.deleteOne();


  res.status(200).json({
    message: "Document deleted successfully",
  });
};

export const updateDocument = async (req, res) => {
  const { name, category } = req.body ;

  const document = await documentModel.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id,
    },
    { name, category },
    { new: true },
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

export const downloadDocument = async(req,res)=>{
  const document = await documentModel.findOne({
    _id:req.params.id,
    owner:req.user._id
  })

  if(!document){
    return res.status(404).json({
      message:"Document not found !"
    })  }

    const command = new GetObjectCommand({
      Bucket:config.AWS_BUCKET_NAME,
      Key:document.s3Key,
      ResponseContentDisposition:`attachment; filename="${document.fileName}"`,
    })

    const signedUrl = await getSignedUrl(s3,command,{
      expiresIn:60,
    })

    return res.status(200).json({
      url:signedUrl,
    })
}