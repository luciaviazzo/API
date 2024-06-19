import express from 'express';
import {PÀINTINGS} from './data.js';
import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

const app = express();