const porukeRouter = require('express').Router()
const Poruka = require('../models/poruka')
const Korisnik = require('../models/korisnik')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const dohvatiToken = req => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
  }
  return null
}

porukeRouter.get('/', async (req, res) => {
  const poruke = await Poruka.find({})
    .populate('korisnik', { username: 1, ime: 1 })
  res.json(poruke)
})

porukeRouter.get('/:id', (req, res, next) => {
  Poruka.findById(req.params.id)
    .then(poruka => {
      if (poruka) {
        res.json(poruka)
      } else {
        res.status(404).end()
      }

    })
    .catch(err => next(err))
})

porukeRouter.delete('/:id', async (req, res) => {
  console.log("Brisem poruku")
  const token = dohvatiToken(req)
  const dekToken = jwt.verify(token, process.env.SECRET)
  if (!token || !dekToken.id){
    return res.status(401).json({error: 'Neispravni token'})
  }
  console.log("ID KORISNIKA", dekToken.id)
  //res.status(204).end()

  /* Poruka.findOneAndDelete({korisnik: ObjectId("dekToken.id") }) */
  const rez = await Poruka.findOneAndDelete({_id:  mongoose.Types.ObjectId(req.params.id) ,korisnik: mongoose.Types.ObjectId(dekToken.id) })
  console.log(rez)
  if(rez)
    res.send(rez)
  else
    res.status(204).send({message: "Ne postoji traženi podatak"})

/*   Poruka.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err)) */
})

porukeRouter.put('/:id', (req, res) => {
  const podatak = req.body
  const id = req.params.id

  const poruka = {
    sadrzaj: podatak.sadrzaj,
    vazno: podatak.vazno
  }

  Poruka.findByIdAndUpdate(id,poruka, {new: true})
  .then( novaPoruka => {
    res.json(novaPoruka)
  })
  .catch(err => next(err))

})

porukeRouter.post('/', async (req, res, next) => {
  const podatak = req.body
  const token = dohvatiToken(req)

  const dekToken = jwt.verify(token, process.env.SECRET)
  if (!token || !dekToken.id){
    return res.status(401).json({error: 'Neispravni token'})
  }
  const korisnik = await Korisnik.findById(dekToken.id)

  const poruka = new Poruka({
    sadrzaj: podatak.sadrzaj,
    vazno: podatak.vazno || false,
    datum: new Date(),
    korisnik: korisnik._id
  })

  const spremljenaPoruka = await poruka.save()
  korisnik.poruke = korisnik.poruke.concat(spremljenaPoruka._id)
  await korisnik.save()

  res.json(spremljenaPoruka)

})

module.exports = porukeRouter