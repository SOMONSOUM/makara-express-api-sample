import express, { Request, Response, Router } from 'express'
import { config } from 'dotenv'
import { knexCreateConnection } from './lib/knexConnection'
config()

const port = process.env.PORT || 3000

const app = express()
const router = Router()

//Except JSON
app.use(express.json())

// Route
app.use(router)

router.get('/', (req: Request, res: Response) => {
  return res.send('Hello, World!')
})

router.post('/api/v1/book/create', async (req: Request, res: Response) => {
  const knex = knexCreateConnection().default

  const { title, description, page, author_id, cover_picture } = req.body

  const [createBook] = await knex.table('books').insert({
    title: title,
    description: description,
    page: page,
    author_id: author_id,
    cover_picture: cover_picture,
  })

  if (createBook) {
    return res.status(200).json({
      message: 'Created successfully',
      book: {
        title,
        description,
        page,
        author_id,
        cover_picture,
      },
    })
  } else {
    return res.json({
      message: 'Something wrong',
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
