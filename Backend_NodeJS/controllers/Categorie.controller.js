const categorieModel = require("../models/Categorie.model");

const Create = (async (req, res) => {
    try {
        let data = req.body

        let categorie = new categorieModel({
            nom: data.nom
        })

        let categorieFormDb = await categorie.save()
        res.status(200).json({
            Message: "Categorie created suucessfully",
            Success: true,
            data: categorieFormDb,
        });

    } catch (error) {
        res.status(400).send({ message: 'Categorie not added', error })
    }

})


const Delete = async (req, res) => {
    try {
        const { _id } = req.params;
        const remove = await categorieModel.deleteOne({ _id });

        if (!remove) {
            return res.status(400).json({ Message: "Failed to delete Categorie" });
        }
        return res.status(200).json({ Message: "Categorie deleted successfully" });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};


const GetAllCategorie = async (req, res) => {
    try {
        const Categories = await categorieModel.find();
        return res
            .status(200)
            .json({ Message: "Categories found successfully ", data: Categories });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};


const GetOne = async (req, res) => {
    try {
        const { _id } = req.params;

        const Categorie = await categorieModel.findOne({ _id });
        return res
            .status(200)
            .json({ Message: " found successfully ", data: Categorie });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};



const UpdateGeneralInfos = async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedCategorie = await categorieModel.findOneAndUpdate(
            { _id },
            {
                $set: req.body,
            },
            { new: true }
        );
        if (!updatedCategorie) {
            return res.status(400).json({
                Message: "Failed to update",
                Success: false,
            });
        }
        return res.status(200).json({ Message: "Categorie updated", data: updatedCategorie});
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};


module.exports = {
    Create,
    Delete,
    GetAllCategorie,
    GetOne,
    UpdateGeneralInfos,
};

