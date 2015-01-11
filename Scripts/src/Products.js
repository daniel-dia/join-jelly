var InAppPurchases = (function () {
    function InAppPurchases() {
    }
    InAppPurchases.requestProductList = function (callback) {
        setTimeout(function () {
            callback([
                { productId: "time3x", name: "3x Time", description: "desc", price: "R$1,99", icon: "" },
                { productId: "fast3x", name: "3x Fast", description: "desc", price: "R$1,99", icon: "" },
                { productId: "revive3x", name: "3x Revive", description: "desc", price: "R$1,99", icon: "" },
                { productId: "clean3x", name: "3x Clean", description: "desc", price: "R$1,99", icon: "" },
                { productId: "pack", name: "Item Pack", description: "desc", price: "R$4,99", icon: "" },
                { productId: "lucky", name: "Lucky Clover", description: "desc", price: "R$3,99", icon: "" },
            ]);
        }, 1000);
    };
    InAppPurchases.purchaseProductRequest = function (productId, callback) {
    };
    InAppPurchases.reportProductFullfillment = function (productId, callback) {
    };
    return InAppPurchases;
})();
//# sourceMappingURL=Products.js.map