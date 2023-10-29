// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Accedemos a las cookies de la request 
  const cookies = req.cookies
  console.log(cookies)
  res.status(200).json({ name: 'John Doe' , ...cookies})
}
