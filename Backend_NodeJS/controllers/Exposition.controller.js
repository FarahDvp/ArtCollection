const ExpositionModel = require("../models/Exposition.model");

const Create = (async (req, res) => {
    try {
        let data = req.body

        let exposition = new ExpositionModel({
            type: data.type,
            lieu: data.lieu,
            contrainte: data.contrainte,
            titre: data.titre,
            dateDebut: data.dateDebut,
            dateFin: data.dateFin,
            autreInfo: data.autreInfo
        })

        let expositionFormDb = await exposition.save()
        res.status(200).json({
            Message: "exposition created suucessfully",
            Success: true,
            data: expositionFormDb,
        });

    } catch (error) {
        res.status(400).send({ message: 'exposition not added', error })
    }

})



const Delete = async (req, res) => {
    try {
        const { _id } = req.params;
        const remove = await ExpositionModel.deleteOne({ _id });

        if (!remove) {
            return res.status(400).json({ Message: "Failed to delete exposition" });
        }
        return res.status(200).json({ Message: "Exposition deleted successfully" });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};

const GetAllExposition = async (req, res) => {
    try {
        const Expositions = await ExpositionModel.find();
        return res
            .status(200)
            .json({ Message: "Expositions found successfully ", data: Expositions });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};

const GetOne = async (req, res) => {
    try {
        const { _id } = req.params;

        const Exposition = await ExpositionModel.findOne({ _id });
        return res
            .status(200)
            .json({ Message: " found successfully ", data: Exposition });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};



const UpdateGeneralInfos = async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedExposition = await ExpositionModel.findOneAndUpdate(
            { _id },
            {
                $set: req.body,
            },
            { new: true }
        );
        if (!updatedExposition) {
            return res.status(400).json({
                Message: "Failed to update",
                Success: false,
            });
        }
        return res.status(200).json({ Message: "Exposition updated", data: updatedExposition });
    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
};

module.exports = {
    Create,
    Delete,
    GetAllExposition,
    GetOne,
    UpdateGeneralInfos,
};
