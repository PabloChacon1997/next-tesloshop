import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product,Order, User } from '../../../models';

type Data = 
   | {
      numberOfOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberOfClients: number;
      numberOfProducts: number;
      productsWithNoInventory: number;
      lowInventory: number;
    }

    | {message: string }

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
  
  switch (req.method) {
    case 'GET':
      return getInformation(req, res);

    default:
      return res.status(400).json({
        message: 'Bad Request',
      });
  }
}

const getInformation = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory
  ] = await Promise.all([
    Order.countDocuments(),
    Order.count({ isPaid: true }),
    User.count({ role: 'client' }),
    Product.countDocuments(),
    Product.count({ inStock: 0 }),
    Product.count({ inStock: { $lte: 10 } }),
  ]);
  await db.disconnect();
  


  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders: numberOfOrders-paidOrders,
  });
}
