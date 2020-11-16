const express = require('express')
const router = new express.Router()
const Tree = require('../models/tree')

router.post('/trees', async (req, res) => {
    const tree = new Tree(req.body)

    try {
        await tree.save()
        res.status(201).send(tree)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/trees', async (req, res) => {
    try {
        const trees = await Tree.find({})
        res.send(trees)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/trees/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const tree = await Tree.findById(_id)

        if (!tree) {
            return res.status(404).send()
        }

        res.send(tree)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/trees/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'scientificName', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const tree = await Tree.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!tree) {
            return res.status(404).send()
        }

        res.send(tree)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/trees/:id', async (req, res) => {
    try {
        const tree = await Tree.findByIdAndDelete(req.params.id)

        if (!tree) {
            res.status(404).send()
        }

        res.send(tree)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router