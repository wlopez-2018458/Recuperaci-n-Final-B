'use strict'

const mongoose = require('mongoose');

exports.init = () => {
    const uriMongo = 'mongodb://127.0.0.1:27017/ABCProject'
    mongoose.Promise = global.Promise

    mongoose.connection.on('error', () => {
        console.log('MongoDB | could not be connect to mongodb')
        mongoose.disconnect()
    })
    mongoose.connection.on('connecting', () => {
        console.log('MongoDB | try connecting')
    })
    mongoose.connection.on('connected', () => {
        console.log('MongoDB | connected to mongodb')
    })
    mongoose.connection.once('open', () => {
        console.log('MongoDB | connected to database')
    })
    mongoose.connection.on('reconnected', () => {
        console.log('MongoDB | reconnected to mongodb')
    })
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB | disconnected')
    })

    mongoose.connect(uriMongo, {
        connectTimeoutMS: 2500,
        maxPoolSize: 50,
        useNewUrlParser: true
    }).catch(err => console.log(err))
} 