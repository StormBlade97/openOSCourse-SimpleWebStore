import { User, Item } from '../models'
import Chance from 'chance'
import { range } from 'lodash'

const chance = new Chance()

const seed = async ({ numberOfCustomer, numberOfItem }) => {
  const admin = {
    username: 'admin',
    password: 'admin',
    privilege: 'admin',
    transaction: null
  }
  const staffs = range(3).map(el => ({
    username: chance.name(),
    password: `staff_password`,
    privilege: 'staff',
    transaction: null
  }))
  const customers = range(numberOfCustomer).map(el => ({
    username: chance.name(),
    password: `customerpassword`,
    privilege: 'customer',
    transaction: null
  }))

  const items = range(numberOfItem).map(el => ({
    name: chance.word(),
    price: chance.natural({ min: 10, max: 50 }),
    image: 'http://cafmp.com/wp-content/uploads/2012/11/Avatar-608x900.jpg',
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
