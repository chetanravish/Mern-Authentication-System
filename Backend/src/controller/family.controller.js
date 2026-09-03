import familyModel from "../models/family.model.js";

export const addFamilyMember = async(req,res)=>{
    const{name,relation} = req.body;

    if(!name || !relation){
        return res.status(400).json({
            message:"Name and Relation are required"
        })
    }

    const count  = await familyModel.countDocuments({
        owner:req.user._id,
    })
    
    if(count>=10){
     return res.status(400).json({
        message:"Maximum 10 family members are allowed",
     })
    }

    if(relation === "Father" || relation === "Mother"){
        const existing = await familyModel.findOne({
            owner:req.user._id,
            relation
        })
    

    if(existing){
        return res.status(400).json({
            message:`only one ${relation} can be added`
        })
    }}
    const member = await familyModel.create({
        owner : req.user._id,
        name,
        relation
    })

     return res.status(201).json({
    message: "Family member added successfully",
    member,
  });
}

export const getFamilyMembers = async (req, res) => {
  const members = await familyModel
    .find({ owner: req.user._id })
    .sort({ createdAt: 1 });

  if (members.length === 0) {
    return res.status(200).json({
      message: "No family members found",
      members: [],
    });
  }

  return res.status(200).json({
    members,
  });
};

export const deleteFamilyMember = async(req,res)=>{
    const member = await familyModel.findOneAndDelete({
        owner:req.user._id,
        _id:req.params.id
    })

    if(!member){
        return res.status(404).json({
            message:"Family member not found"
        })
    }

    return res.status(200).json({
        message:"Member deleted successfully"
    })
}