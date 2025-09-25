import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
// import bcrypt from 'bcrypt';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import paintRoutes from './routes/paint.js';
// import userRoutes from './routes/users.js';
import { paintWall } from './controllers/paint.js';
import { verifyToken } from './middlewares/verifyToken.js';
import Save from "./models/Save.js"
// import { register } from './controllers/auth.js';
// import { createPost } from './controllers/posts.js';

/* CONFIGURATIONS  */
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = path.resolve('../assets')

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({        // Multer GitHub repo
  destination: function(req, file, cb) {
    cb(null, "public/original_images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});         // this is how you can save files anytime someone uploads a file on the website then the server will save the file at the destination('public/assets') mentioned with the filename
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post('/paint/wall', upload.single('picture'), paintWall);

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/paint', paintRoutes);
// app.use('/users', userRoutes);

// SAVE
app.post('/save', async (req, res) => {
  const { userId, paintId, path } = req.body;
  try {
    const saved = new Save({
      userId,
      paintId,
      path,
    })

    const response = await saved.save()
    return res.status(201).json({ message: "Successfully saved!" });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: error.message });
  }
}); 

app.get('/save/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await Save.find({ userId }).populate("userId").populate("paintId");
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json ({ error: error.message });
  }
});


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;

try {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database is connected...');
  
  app.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`);
  });
} catch (error) {
  console.log('Database not connected...')
}