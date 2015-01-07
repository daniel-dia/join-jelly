var InAppPurchases = (function () {
    function InAppPurchases() {
    }
    InAppPurchases.requestProductList = function (callback) {
        setTimeout(function () {
            if (callback)
                callback([
                    { ProductId: "time3x", Name: "3x Time", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "fast3x", Name: "3x Fast", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "revive3x", Name: "3x Revive", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "clean3x", Name: "3x Clean", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "pack3x", Name: "Item Pack 3x", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$4,99", },
                    { ProductId: "pack9x", Name: "Item Pack 9x", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$8,99", },
                    { ProductId: "lucky", Name: "Lucky Clover", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$3,99", },
                ]);
        }, 1000);
    };
    InAppPurchases.purchaseProductRequest = function (productId, callback) {
        setTimeout(function () {
            if (callback)
                callback(productId, true);
        }, 2000);
    };
    InAppPurchases.reportProductFullfillment = function (productId, callback) {
        setTimeout(function () {
            if (callback)
                callback();
        }, 2000);
    };
    return InAppPurchases;
})();
//# sourceMappingURL=InAppPurchases.js.map