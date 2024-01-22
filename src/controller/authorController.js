import { authors } from "../model/author.js";

class authorController {

  static listAuthors = async (req, res) => {
    try {
      const authorsList = await authors.find({});
      res.status(200).json(authorsList);
    } catch(error){
      res.status(500).json(`${error} - error on execute request to find all authors`);
    }   
  }

  static addAuthor = async (req, res) => {
    try{
      await authors.create(req.body);
      res.status(201).json({message: "author created successfullys"});
    } catch (error){
      res.status(500).json({message: `${error.message} - error when attempt to add author: ${req.body}`});
    }
  }

  static findAuthorById = async (req, res) => {
    try {
      const id = req.params.id;
      const authorFound = await authors.findById(id);
      res.status(200).json(authorFound);
    } catch(error){
      res.status(500).json(`${error.message} - error on attempt to search author by id: ${req.params.id}`);
    }
  }

  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndUpdate(id, req.body);
      res.status(200).send("the author has been updated successfully");
    } catch(error){
      res.status(500).json(`${error.message} - error on attempt to update author: ${req.body}`);
    }
  }

  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(200).send("author has been deleted successfully");
    } catch (error){
      res.status(500).json(`${error.message} - error on attempt to delete author by id: ${req.params.id}`);
    }
  }
}

export default authorController;