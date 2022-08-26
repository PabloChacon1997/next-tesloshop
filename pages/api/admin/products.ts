import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';

import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

type Data = 
  | { message: string }
  | IProduct[]
  | IProduct

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    case 'PUT':
      return updateProduct(req, res);
  
    default:
      res.status(400).json({
        message: 'Bad Request',
      });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find()
    .sort({ title: 'asc' })
    .lean();
  await db.disconnect();
  // Actualizar las imagenes
  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`;
    });

    return product;
  })

  res.status(200).json(updatedProducts);
}


const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {_id='', images = []} = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'El id del producto no es válido' });
  }

  if(images.length < 2) {
    return res.status(400).json({ message: 'Es necesario almenos 2 imagenes' });
  }

  // TODO: posiblemente tendremos un localhost:3000/products/weere.jpg

  try {
    await db.connect();

    const product = await Product.findById(_id);
    if(!product) {
      await db.disconnect();
      return res.status(400).json({ message: 'No existe producto con ese id' });
    }
    // TODO: eleiminar fotos o imagenes en claudinary
    product.images.forEach(async (image) => {
      if(!images.includes(image)) {
        // borra de claudinary
        const [fileId, extension] = image.substring(image.lastIndexOf('/')+1).split('.');
        console.log({ image, extension, fileId });
        await cloudinary.uploader.destroy(fileId);
      }
    })

    await product.update(req.body);

    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: 'Revisar consola del servidor' });
  }

}

const createProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { images=[] } = req.body as IProduct;
  if(images.length < 2) {
    return res.status(400).json({ message: 'El producto necesita almenos 2 imagenes' });
  }

  // TODO: posiblemente tendremos un localhost:3000/products/weere.jpg

  try {
    await db.connect();
    const productDB = await Product.findOne({ slug: req.body.slug });
    if (productDB) {
      await db.disconnect();
      return res.status(400).json({ message: 'Ya existe un producto con este slug.' });
    }
    const product = new Product(req.body);
    await product.save();
    await db.disconnect();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: 'Error: revisar los logs del servidor' });
  }
}

