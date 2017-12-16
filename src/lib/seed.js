import { User, Item } from '../models'
import Chance from 'chance'
import { range } from 'lodash'
import { env } from './env'
import fetch from 'node-fetch'

const chance = new Chance()

const seed = async ({ numberOfCustomer, numberOfItem }) => {
    const admin = {
        username: 'admin',
        password: 'admin',
        privilege: 'admin',
        transaction: null,
        avatar: 'https://media.giphy.com/media/9vVCPK87Aw6v6/giphy.gif'
    }

    // populate staffs
    const staffs = await Promise.all(
        range(3).map(async el =>
            fetch(
                `https://api.giphy.com/v1/gifs/search?q=queen&api_key=${
                    env.GIPHY_API_KEY
                }&limit=1`
            )
                .then(raw => raw.json())
                .then(rs => rs.data[0].images.downsized.url)
                .then(avatar => ({
                    username: `staff_${el}`,
                    password: `staff_password`,
                    privilege: 'staff',
                    transaction: null,
                    avatar: avatar
                }))
        )
    )

    // populate customers
    const customers = await Promise.all(
        range(3).map(async el =>
            fetch(
                `https://api.giphy.com/v1/gifs/search?q=cat&api_key=${
                    env.GIPHY_API_KEY
                }&limit=1`
            )
                .then(raw => raw.json())
                .then(rs => rs.data[0].images.downsized.url)
                .then(avatar => ({
                    username: `customer_${el}`,
                    password: `customer_password`,
                    privilege: 'staff',
                    transaction: null,
                    avatar: avatar
                }))
        )
    )

    const fetchedMovies = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
            env.TMDB_API_KEY
        }&sort_by=popularity.desc`
    )
        .then(raw => raw.json())
        .then(rs => rs.results)

    const items = fetchedMovies.map(el => ({
        title: el.title,
        price: chance.natural({ min: 10, max: 50 }),
        poster: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/w500/${el.backdrop_path}`,
        stock: chance.natural({ min: 0, max: 10000 })
    }))

    await Promise.all([
        User.create([admin].concat(staffs, customers)),
        Item.create(items)
    ])
}

const purge = async () => {
    await Promise.all([User.remove(), Item.remove()])
}

export { seed, purge }
