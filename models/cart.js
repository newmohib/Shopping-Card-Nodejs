

function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (item, id) => {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0 }
        }
        storedItem.qty++
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.generateArray = () => {
        let arr = [];
        let serial = 1
        for (const id in this.items) {
            let newItem = this.items[id];
            newItem.serial = serial;
            serial++
            arr.push(newItem);
        }
        return arr;
    }
}


module.exports = Cart;