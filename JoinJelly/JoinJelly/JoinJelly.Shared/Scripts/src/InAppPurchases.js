var InAppPurchases = (function () {
    function InAppPurchases() {
    }
    InAppPurchases.requestProductList = function (callback) {
        setTimeout(function () {
            if (callback)
                callback([
                    { ProductId: "time5x", Name: "5x Time", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "fast5x", Name: "5x Fast", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "revive5x", Name: "5x Revive", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "clean5x", Name: "5x Clean", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "pack5x", Name: "Item Pack 3x", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$4,99", },
                    { ProductId: "pack10x", Name: "Item Pack 9x", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$6,99", },
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
var ProductAvaliability;
(function (ProductAvaliability) {
    ProductAvaliability[ProductAvaliability["AVALIABLE"] = 0] = "AVALIABLE";
    ProductAvaliability[ProductAvaliability["PURCHASED"] = 1] = "PURCHASED";
    ProductAvaliability[ProductAvaliability["NOTAVALIABLE"] = 2] = "NOTAVALIABLE";
})(ProductAvaliability || (ProductAvaliability = {}));
//# sourceMappingURL=InAppPurchases.js.map