const {
  Book,
  Author,
  Category,
  Image,
  sequelize,
} = require('../models');
const helper = require('../utils/helper');

// const service = require('../services');

const publishBook = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    req.body.userId = req.user.user.id;
    req.body.categoryId = req.body.category.id;
    req.body.authorId = req.body.author.id;
    const { author, category, images } = req.body;
    delete req.body.author;
    delete req.body.category;
    delete req.body.images;
    const newBook = await Book.create(req.body, { transaction: t });
    await Author.upsert(author, { transaction: t });
    await Category.upsert(category, { transaction: t });
    await Image.bulkCreate(images.map((image) => ({
      imageType: image.imageType,
      url: image.url,
      bookId: newBook.id,
    })), { transaction: t });
    await t.commit();
    return helper.OK(res, 'Book is published successfully');
  } catch (err) {
    next(err);
  }
};

const getPublishedBooks = async (req, res, next) => {
  try {
    const bookCount = await Book.count({
      where: {
        userId: req.user.user.id,
      },
    });
    const pageData = {
      total: bookCount,
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
    };
    const books = await Book.findAll({
      where: {
        userId: req.user.user.id,
      },
      limit: pageData.limit,
      offset: pageData.offset,
      include: [{
        model: Author,
        as: 'author',
      }, {
        model: Category,
        as: 'category',
      }, {
        model: Image,
        as: 'images',
      }],
    });

    return helper.OK(res, 'Book is published successfully', { books, ...pageData });
  } catch (err) {
    next(err);
  }
};

const getBookDetails = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      where: {
        id: req.params.bookId,
      },
      include: [{
        model: Author,
        as: 'author',
      }, {
        model: Category,
        as: 'category',
      }, {
        model: Image,
        as: 'images',
      }],
    });

    return helper.OK(res, 'Book is published successfully', book);
  } catch (err) {
    next(err);
  }
};

const uploadImage = async (req, res) => {
  const images = req.files.map((file) => ({
    url: file.location,
    mimeType: file.mimetype,
    contentType: file.contentType,
  }));
  helper.OK(res, 'image(s) are uploaded successfully', { images });
};

const deleteImage = async (req, res, next) => {};

const updateBookDetails = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    req.body.userId = req.user.user.id;
    req.body.categoryId = req.body.category.id;
    req.body.authorId = req.body.author.id;
    req.body.id = +req.params.bookId;
    const { author, category, images } = req.body;
    delete req.body.author;
    delete req.body.category;
    delete req.body.images;
    await Book.upsert(req.body, { transaction: t });
    await Author.upsert(author, { transaction: t });
    await Category.upsert(category, { transaction: t });
    await Image.destroy({
      where: {
        bookId: req.body.id,
      },
    }, { transaction: t });
    await Image.bulkCreate(images.map((image) => ({
      imageType: image.imageType,
      url: image.url,
      bookId: req.body.id,
    })), { transaction: t });
    await t.commit();
    return helper.OK(res, 'Book is updated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  publishBook,
  getPublishedBooks,
  getBookDetails,
  uploadImage,
  updateBookDetails,
};
