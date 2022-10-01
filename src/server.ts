import { config } from './config/config'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import Logging from './library/Logging'

const router = express()

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected')
    })
    .catch((error) => {
        Logging.info(error)
    })
