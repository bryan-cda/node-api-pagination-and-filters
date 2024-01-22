import book from '../model/book.js'
import { authors } from '../model/author.js'

class bookController {
  static listBooks = async (req, res) => {
    try {
      const books = await book.find({})
      res.status(200).json({ books })
    } catch (error) {
      res.status(500).json({ error_message: `${error}`, error_details: process.env.LIST_ALL_BOOKS_ERROR_MESSAGE })
    }
  }

  static addBook = async (req, res) => {
    const bookRequest = req.body

    try {
      const foundAuthor = await authors.findById(bookRequest.author)

      if (foundAuthor !== null) {
        const newBook = await book.create({
          ...bookRequest,
          author: {
            name: foundAuthor?.name,
            biography: foundAuthor?.biography
          }
        })
        const createdBook = await book.create(newBook)
        res.status(201).json({ message: process.env.BOOK_CREATED_MESSAGE, book: createdBook })
      } else {
        book.create(bookRequest)
      }
    } catch (error) {
      res.status(500).json({ error_message: `${error.message}`, error_detail: process.env.ADD_BOOK_ERROR_MESSAGE })
    }
  }

  static findBookById = async (req, res, next) => {
    try {
      const id = req.params.id
      const bookFound = await book.findById(id)
      res.status(200).json({ book: bookFound })
    } catch (error) {
      next(error)
    }
  }

  static updateBook = async (req, res) => {
    const bookRequest = req.body
    try {
      const foundAuthor = await authors.findById(bookRequest.author)
      const id = req.params.id

      if (foundAuthor !== null) {
        await book.findByIdAndUpdate(id, {
          ...bookRequest,
          author: {
            name: foundAuthor?.name,
            biography: foundAuthor?.biography
          }
        })
      } else {
        await book.findByIdAndUpdate(id, req.body)
      }
      res.status(200).send({ message: process.env.BOOK_UPDATED_SUCCESSFULLY_MESSAGE })
    } catch (error) {
      res.status(500).json({ error_message: `${error.message}`, error_detail: process.env.UPDATE_BOOK_ERROR_MESSAGE })
    }
  }

  static async deleteBook (req, res) {
    try {
      const id = req.params.id
      await book.findByIdAndDelete(id)
      res.status(200).send({ message: process.env.BOOK_DELETED_MESSAGE })
    } catch (error) {
      res.status(500).json({ error_message: `${error.message}`, error_detail: process.env.DELETE_BOOK_ERROR_MESSAGE })
    }
  }

  static async findBookByPublishCompany (req, res) {
    const publishingCompany = req.query.publishing_company
    try {
      const foundBooks = await book.find({ publishingCompany })
      res.status(200).json({ book_found: foundBooks })
    } catch (error) {
      res.status(500).send({ error_message: `${error}`, error_detail: process.env.FIND_BOOK_BY_PUBLISH_COMPANY })
    }
  }
}

export default bookController
