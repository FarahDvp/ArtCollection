const materielModel = require("../models/Materiel.model");

const Create = (async (req, res) => {
    try {
        let data = req.body

        let materiel = new materielModel({
            nom: data.nom
        })

        let materielFormDb = await materiel.save()
        res.status(200).json({
            Message: "materiel created suucessfully",
            Success: true,
            data: materielFormDb,
        });

    } catch (error) {
        res.status(400).send({ message: 'materiel not added', error })
    }

})


const Delete = async (req, res) => {
    try {
        const { _id } = req.params;
        const remove = await materielModel.deleteOne({ _id });

        if (!remove) {
            return res.status(400).json({ Message: "Failed to delete materiel" });
        }
        return res.status(200).json({ Message: "Materiel deleted successfully" });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};


const GetAllMateriel = async (req, res) => {
    try {
        const Materiels = await materielModel.find();
        return res
            .status(200)
            .json({ Message: "Materiels found successfully ", data: Materiels });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};



const UpdateGeneralInfos = async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedMateriel = await materielModel.findOneAndUpdate(
            { _id },
            {
                $set: req.body,
            },
            { new: true }
        );
        if (!updatedMateriel) {
            return res.status(400).json({
                Message: "Failed to update",
                Success: false,
            });
        }
        return res.status(200).json({ Message: "Materiel updated", data: updatedMateriel });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};


module.exports = {
    Create,
    Delete,
    GetAllMateriel,
    UpdateGeneralInfos,
};

