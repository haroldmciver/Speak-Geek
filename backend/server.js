import mongoose from 'mongoose'
import express from 'express'
import bcrypt from 'bcrypt' 
import cors from 'cors'
import jwt from "jsonwebtoken"
import * as speech from '@google-cloud/speech';

const client = new speech.SpeechClient();
const app = express()
app.use(express.json())

const mongoURI = 'mongodb+srv://test:test123@data.23manba.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))



  app.listen(3000, () => {
    console.log('Server is running on port 3000')
});