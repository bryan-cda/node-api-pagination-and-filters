import { authors } from '../model/author.js'

class authorController {
  static listAuthors = async (req, res) => {
    try {
      const authorsList = await authors.find({})
      res.status(200).json(authorsList)
    } catch (error) {
      res.status(500).json({ error_message: `${error.message}`, details: process.env.LIST_ALL_AUTHORS_ERRO })
    }
  }

  static addAuthor = async (req, res) => {
    try {
      await authors.create(req.body)
      res.status(201).json({ message: 'author created successfully' })
    } catch (error) {
      res.status(500).json({ error_message: `${error.message}`, details: process.env.ADD_NEW_AUTHOR_ERROR })
    }
  }

  static findAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id
      const authorFound = await authors.findById(id)
      res.status(200).json(authorFound)
    } catch (error) {
      next(error)
    }
  }

  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id
      await authors.findByIdAndUpdate(id, req.body)
      res.status(200).send('the author has been updated successfully')
    } catch (error) {
      res.status(500).json(`${error.message} - error when attempt to update author: ${req.body}`)
    }
  }

  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id
      await authors.findByIdAndDelete(id)
      res.status(200).send('author has been deleted successfully')
    } catch (error) {
      res.status(500).json(`${error.message} - error when attempt to delete author by id: ${req.params.id}`)
    }
  }
}

export default authorController
