/*
//format for shars to be passed into user
const shares = {

    {
        "symbol": "",
        "price": 19
    },

{
*/
function user(sharesOwned) {
    const account = {
        "cashHoldings": 0,
        "stocks": sharesOwned,
    };
    /**
     *
     * @param symbol
     * @returns {*}
     */
    const getStock = (symbol) => currentShares.find(currentShares.stocks["symbol"] === symbol);
    /**
     * Check is user owns a certain stock symbol
     * @param symbol The symbol to check whether <code>user</code> owns stock.
     * @returns {boolean} {@code true}
     */
    const ownsSymbol = (symbol) => getStock(symbol) !== undefined;

    /**
     * Sell a stock of specified symbol and the amount of stock to sell.
     *
     * @param symbol the symbol of the stock you wish to sell
     * @param amount The amount of stock you wish to sell for symbol, default is 1.
     * @returns {boolean} <code>True</code> if stock sell is successful and <code> False</code> is stock sell fails for one of the following
     * reasons:
     * <ul>
     *     <li> User does not own stock symbol </li>
     *     <li> User owns less of stock than the amount chosen to sell </li>
     * </ul>
     */
    function sellStock(symbol?: String, amount = 1) {
        if(ownsSymbol(symbol)) {
            let stock = getStock(symbol);
            // have less stock of symbol than the amount chosen to sell.
            if (stock.amount < amount) {
                return false;
            }

            stock.amount -= amount;
            let price = stock.price;

            let sellPrice = price * amount;
            account.cashHoldings += sellPrice;
            return true;
        }
        // have no amount of chosen symbol to sell
        return false;
    }

    function buyStock(symbol?: String, amount = 1) {

    }

}