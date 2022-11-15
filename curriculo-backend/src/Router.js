const Router = require('express').Router()
const { ObjectId } = require('mongodb')
const MongoConnect = require("./dba/MongoConnect")
const fs = require('fs')
const GitlabService = require("./services/GitlabService")
const uuid = require('uuid')

Router.get("/", (req, res) => {

    res.status(200).json({
        state: 'ok'
    })
})

Router.get("/api/v1/users", async (req, res) => {
    const connection = await MongoConnect()
    const users = await connection.find({}).toArray()

    res.status(200).json(users)
})

Router.get("/api/v1/user/:id", async (req, res) => {

    const objectId = new ObjectId(req.params.id)
    const connection = await MongoConnect()
    const user = await connection.findOne(objectId)

    res.status(200).json(user)
})

Router.post("/api/v1/insert", async (req, res) => {

    const body = req.body
    const imageBase64 = req.body.image
    const idImage = uuid.v4()

    delete body.image

    const connection = await MongoConnect()

    const gitLabService = new GitlabService()
    gitLabService.saveFileInGitLab(idImage, imageBase64, "jpg")
        .then(response => console.log(response))
        .catch(error => console.log(error))

    const urlImage = gitLabService.createUrlFile(idImage, "jpg")

    body["image"] = urlImage
    const insertUser = await connection.insertOne(body)

    insertUser["urlImage"] = urlImage

    res.status(200).json(insertUser)
})

Router.put("/api/v1/update/:id", async (req, res) => {

    const connection = await MongoConnect()
    const updateUser = await connection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })

    res.status(200).json(updateUser) 
})

module.exports = Router 