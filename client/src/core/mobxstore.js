import { observable, action, runInAction, autorun, computed } from 'mobx'

class MovieStore {
    @observable id
    @observable title
    @observable imageStatic
    @observable imageGif
    @observable price
    @observable imdbScore
    @observable stock
    @observable director
    @observable leadActor

    decreaseStock(amount) {
        if (amount >= this.stock) {
            let temp = this.stock
            this.stock = 0
            return temp
        } else {
            let temp = this.stock
            this.stock -= amount
            return temp - amount
        }
    }
    increaseStock(amount) {
        this.stock += amount
    }
}

class Basket {
    @observable items = []
    @observable originalMoney

    constructor({ originalMoney }) {
        this.originalMoney = originalMoney
    }
    @computed
    get itemsCount() {
        return this.items.length
    }
    @computed
    get totalCost() {
        if (this.itemCount() > 0)
            return items.reduce((accumulator, current) => {
                accumulator += current.price
            }, 0)
        else return 0
    }
    @computed
    get balance() {
        return this.originalMoney - this.totalCost
    }
}

class UserStore {
    @observable username = 'admin'
    @observable password = 'password'
    @observable privilege = 'admin'
    @observable basket = new Basket()
}

export { MovieStore, UserStore }
