exports.calculateTotal = async group => {
    return (group.priceID.price - group.priceID.price * group.priceID.discount * 0.01)*100;
}

exports.removeItem = async (arr, value) => {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}