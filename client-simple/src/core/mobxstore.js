import { observable, action, runInAction, autorun, computed } from 'mobx'

const host =
    process.env.NODE_ENV === 'development'
        ? 'localhost:5000'
        : window.location.host

class Item {
    @observable id
    @observable title
    @observable poster
    @observable price
    @observable stock
    @observable quantity

    constructor(item) {
        this.id = item.id
        this.title = item.title
        this.poster = item.poster
        this.price = item.price
        this.stock = item.stock
        this.quantity = item.quantity
    }
}

class Basket {
    @observable items = []
    @observable originalMoney

    constructor(originalMoney) {
        this.originalMoney = originalMoney
    }
    @action.bound
    add(i) {
        const item = new Item(i)
        if (this.balance < item.price) return
        const index = this.items.findIndex(n => n.id == item.id)
        if (index == -1) {
            item.quantity = 1
            this.items.push(item)
        } else {
            this.items[index].quantity++
        }
    }
    @action.bound
    remove(item) {
        const index = this.items.findIndex(el => el.id === item.id)
        console.log(index, this.itemsCount)
        const removed = this.items.splice(index, 1)
    }
    @computed
    get itemsCount() {
        return this.items.length
    }
    @computed
    get totalCount() {
        return this.items.reduce((acc, curr) => {
            return (acc += curr.quantity)
        }, 0)
    }
    @computed
    get totalCost() {
        return this.items.reduce((accumulator, current) => {
            return (accumulator += current.price)
        }, 0)
    }
    @computed
    get balance() {
        return this.originalMoney - this.totalCost
    }
    @computed
    get folddedItems() {
        let seenItem = []
        return this.items.reduce((accumulator, current) => {
            if (seenItem.indexOf(current.id) != -1)
                accumulator.find(el => el.id).quantity++
            else {
                seenItem.push(current.id)
                current.quantity = 1
                accumulator.push(current)
            }
            return accumulator
        }, [])
    }
    @action.bound
    checkout(cred) {
        this.originalMoney = this.balance
        this.items = []
    }
}

class UserStore {
    @observable username = 'admin'
    @observable password = 'password'
    @observable privilege = 'admin'
    @observable cart = new Basket(0)
    @observable loggedIn = false

    constructor(username, password) {
        this.username = username
        this.password = password
        console.log('initiate user store')
        window
            .fetch(`http://${host}/login`, {
                method: 'post',
                headers: {
                    Authorization: `Basic ${this.credentials}`
                }
            })
            .then(raw => raw.json())
            .then(rp => {
                this.username = rp.username
                this.password = rp.password
                this.privilege = rp.privilege
                this.loggedIn = true
                this.cart = new Basket(rp.balance)
            })
    }

    @computed
    get credentials() {
        return window.btoa(`${this.username}:${this.password}`)
    }
}

class Store {
    @observable items = []
    @observable user

    constructor() {
        console.log('initiate store')
        try {
            const persistedUser = JSON.parse(
                window.localStorage.getItem('user')
            )
            this.user = new UserStore(
                persistedUser.username,
                persistedUser.password
            )
        } catch (error) {
            console.log(error)
        }

        window
            .fetch(`http://${host}/items/`)
            .then(raw => raw.json())
            .then(response => (this.items = response.map(i => new Item(i))))
    }

    @action
    addMovie(item) {
        let foundIndex = this.items.findIndex(i => i.id === item.id)
        window
            .fetch(`http://${host}/items/${foundIndex != -1 ? item.id : ''}`, {
                method: foundIndex != -1 ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ['Authorization']: `Basic ${this.user.credentials}`
                },
                body: JSON.stringify(item)
            })
            .then(raw => raw.json())
            .then(
                rp =>
                    foundIndex == -1
                        ? this.items.push(new Item(rp))
                        : this.items.splice(foundIndex, 1, rp)
            )
    }
    @action
    deleteMovie(item) {
        window
            .fetch(`http://${host}/items/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ['Authorization']: `Basic ${this.user.credentials}`
                }
            })
            .then(rp => {
                if (rp.status === 200) {
                    this.items.splice(
                        this.items.findIndex(n => n.id === item.id),
                        1
                    )
                }
            })
    }
    @action
    logout() {
        this.user = null
    }
}
export { Item, UserStore, Basket, Store }
