import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import slugify from "slugify";
import formidable from "formidable";
import * as bcrypt from "bcrypt";
import { createToken } from "../utils/authentication";
import * as fs from "fs";
import cloudinary from "../cloudinary";
import { v4 as uuid } from 'uuid';

const createAccount = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { email } = body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error("Email already exists");
      res.status(409).json({ error: error.message });
      return;
    }

    const username = slugify(req.body.username, "");
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      const error = new Error("Username is not available");
      res.status(409).json({ error: error.message });
      return;
    }

    const user = new User(body);
    user.password = bcrypt.hashSync(body.password, 12);
    user.username = username;
    await user.save();
    res.status(201).send({
      ok: true,
      user,
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) res.status(401).send({ msg: "email not found" });

    if (!bcrypt.compareSync(body.password, user.password)) {
      res.status(401).send({ msg: "passwords do not match" });
      return;
    }
    const token = createToken({ id: user._id });
    console.log(token);

    res.status(200).json({
      status: true,
      user,
      token,
      msg: "User authenticated",
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

const profile = async (req: Request, res: Response) => {
  res.json(req.user);
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description, links } = req.body;
    const username = slugify(req.body.username, "");
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist && usernameExist.email !== req.user.email) {
      const error = new Error(`User ${username} is not available`);
      res.status(409).json({ error: error.message });
    }
    req.user.description = description;
    req.user.username = username;
    req.user.links = links;

    await req.user.save();
    res.send({ msg: "Profile updated" });
  } catch (e) {
    const error = new Error("Error updating profile");
    res.status(500).json({ error: e.message });
  }
};

const upload = async (req: Request, res: Response) => {
    const form = formidable({multiples: false});
  try {
    form.parse(req, (error, fields, files) => {

    })
    if (!req.file) {
      res.status(400).send({ msg: "File not found" });
      return;
    }

    const fileName = req.file.originalname;
    const fileSplit = fileName.split(".");
    const fileExt = fileSplit[1].toLowerCase();
    const validExt = ["png", "jpg", "jpeg", "gif"];

    if (!validExt.includes(fileExt)) {
      fs.unlink(req.file.path, () => {
        res.status(400).json({
          ok: false,
          message: "Invalid file extension",
        });
      });
      return;
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ msg: "User not found" });
      return;
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "DevTree",
      public_id: uuid(),
      use_filename: true,
      unique_filename: true,
    });
    fs.unlinkSync(req.file.path);

    user.image = result.secure_url;
    await user.save();

    res.json({
      ok: true,
      user,
      image: result.secure_url,
    });

    return;
  } catch (error) {
    res.status(500).json({
        error,
        message: error.message
    })
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({username}).select('-_id -__v -password -email');

    if(!user) res.status(404).json({message: 'User not found'})
    res.json({
    user
    })
    return;
  } catch (e) {
    const error =  new Error("Error")
    res.status(500).json({error: error.message})
    return
  }
}

const searchByUsername = async (req: Request, res: Response) => {
  try {
    const {username} = req.body
    const user = await User.findOne({username});
    if(user) {
      const error = new Error(`${username} is not available`);
      res.status(409).json({
        error: error.message
      })
      return
    }

    res.send(`${username} is available`);
    return
  } catch (e) {
    const error =  new Error("Error")
    res.status(500).json({error: error.message})
    return
  }
}
export {
    createAccount,
    login,
    profile,
    updateProfile,
    upload,
    getUser,
    searchByUsername
};
