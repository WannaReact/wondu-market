import mongoose from 'mongoose';
import { send } from 'lib/mongoose/utils/response';
import createHandler from 'lib/mongoose/utils/createHandler';

const handler = createHandler();
const { Product } = mongoose.models;

handler.get(async (req, res) => {
  const {
    query: { id }
  } = req;
  const product = await Product.findById(id, '-reviews -inquiries -updatedAt')
    .lean()
    .exec();
  send(res, product);
});

handler.put(async (req, res) => {
  const {
    query: { id },
    body: {
      productName,
      option,
      images,
      price,
      discountRate,
      stock,
      categories,
      description
    }
  } = req;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      option,
      images,
      price,
      discountRate,
      stock,
      categories,
      description
    },
    { new: true, select: '-reviews -inquiries -updatedAt' }
  )
    .lean()
    .exec();
  send(res, product);
});

handler.delete(async (req, res) => {
  const {
    query: { id }
  } = req;
  const product = await Product.findByIdAndDelete(id, {
    select: '-reviews -inquiries -updatedAt'
  })
    .lean()
    .exec();
  send(res, product);
});

export default handler;
