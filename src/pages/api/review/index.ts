import mongoose from 'mongoose';
import { success } from 'lib/mongoose/response';
import createHandler from 'lib/mongoose/createHandler';

const handler = createHandler();
const { User, Review, Product } = mongoose.models;

handler.get(async (req, res) => {
  const reviews = await Review.find({});
  success(res, reviews);
});

handler.post(async (req, res) => {
  const {
    body: { productId, userId, rating, content }
  } = req;
  const { _id } = await new Review({
    productId,
    userId,
    rating,
    content
  }).save();
  await Promise.all([
    User.findByIdAndUpdate(userId, { $push: { reviews: _id } }),
    Product.findByIdAndUpdate(productId, { $push: { reviews: _id } })
  ]);
  success(res);
});

export default handler;
