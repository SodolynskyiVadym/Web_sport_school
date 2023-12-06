exports.calculateTotal = async group => {
    return (group.priceID.price - group.priceID.price * group.priceID.discount * 0.01)*100;
}