const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const Mailer = require("../functions/mail/MailSneder");
const GeneratePassword = require("../functions/GeneratePassword");

const CreateAdmin = async (req, res) => {
  try {
    const {
      phoneNumber,
      email,
      nom,
      prenom,
      lastName,
      birthDate,
      profilImage,
      sex,
      userName,
    } = req.body;
    const existUser = await UserModel.findOne({
      $or: [{ email }, { userName }],
    });
    if (existUser)
      return res.status(409).json({
        Message: "user already exists with that phoneNumber or email",
        Success: false,
      });

    const salt = Number(process.env.SALT);
    const password = GeneratePassword();
    const cryptedMdp = await bcrypt.hash(password.toString(), salt);

    const newUser = new UserModel({
      ...req.body,
      password: cryptedMdp,
      role: "ADMIN",
    });
    const createdUser = await newUser.save();

    let subject = "Authentication information";
    let content = `
      <div>
      <h2>Welcome ${nom} ${prenom} to our plateforme</h2>
      <p>here you will find the informations about new account</p>
      <p>your login is : <b>${userName}</b> </p>
      <p>your M-D-P is : <b>${password}</b> </p>
      <p>please make sure to change your password after you access to your account</p>
      </div>`;
    await Mailer.Mail_Sender(email, content, subject);

    return res.status(200).json({
      Message: "user created suucessfully",
      Success: true,
      data: createdUser,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const DeleteAdmin = async (req, res) => {
  try {
    const { _id } = req.params;
    const removeAdmin = await UserModel.deleteOne({ _id });

    if (!removeAdmin) {
      return res.status(400).json({ Message: "Failed to delete Admin" });
    }
    return res.status(200).json({ Message: "Admin deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllAdmin = async (req, res) => {
  try {
    const Admins = await UserModel.find();
    return res
      .status(200)
      .json({ Message: "Admins found successfully ", data: Admins });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const Admin = await UserModel.findOne({ _id });
    return res
      .status(200)
      .json({ Message: " found successfully ", data: Admin });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ChangePassword = async (req, res) => {
  try {
    const _id = req.user._id;
    const { password, oldpassword, confpassword } = req.body;

    const passMatch = await bcrypt.compare(oldpassword, req.user.password);
    if (!passMatch) {
      return res.status(400).json({
        Message: "old password is not correct",
        Success: false,
      });
    }

    if (password !== confpassword) {
      return res
        .status(400)
        .json({ Message: "Confirm your Password", Success: false });
    }

    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const updateUser = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          password: cryptedMdp,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "updated successfully", data: updateUser });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ Message: "email is required", Success: false });
    }
    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return res.status(400).json({
        Message: "there's no user with that email",
        Success: false,
      });
    }

    const password = GeneratePassword.GeneratePass();
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const updateUser = await UserModel.findOneAndUpdate(
      { _id: existUser._id },
      {
        $set: {
          password: cryptedMdp,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }

    // SENDING THE LOGIN AND PASSWORD TO USER WITH MAIL
    let subject = "Password Recover";
    let content = `
          <div>
          <h2>Welcome ${existUser.nom} ${existUser.prenom} to our plateforme</h2>
          <p>we recieved a request to recover your password</p>
          <p>your new password is : <b>${password}</b> </p>
          <p>please make sure to change your password after you access to your account</p>
          </div>`;
    await Mailer.Mail_Sender(existUser.email, content, subject);

    return res
      .status(200)
      .json({ Message: "new password sent to your mail box" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateGeneralInfos = async (req, res) => {
  try {
    const { _id } = req.user;
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res.status(200).json({ Message: "User updated", data: updatedUser });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  CreateAdmin,
  DeleteAdmin,
  GetAllAdmin,
  GetOne,
  ForgotPassword,
  ChangePassword,
  UpdateGeneralInfos,
};
