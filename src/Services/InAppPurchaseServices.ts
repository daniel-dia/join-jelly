class InAppPurchaseServices {

    private static Cocoon: any;
    private static initialized: boolean = false;
    private static WindowsInappsService: any;

    /* 
    private products: any;
    private productsIds: Array<string>;
    private inappsService;

    public showLoading: () => any;
    public showError: () => any;
    public fillProducts: (products, inappsService) => any;


    // on purchase start callback
    private onPurchaseStart: (productId) => any;
    private onPurchaseError: (productId, error) => any;
    private onPurchaseComplete: (productId) => any;

    // show that product is consumed
    private fullFillPurchase: (productId: string, transactionId: string, inAppsService) => boolean;

    // initialize product listing
    private initializeStore(productsIds: Array<string>) {
        this.productsIds = productsIds;

        // show loading info
        this.showLoading();

        // if there are no store avaliable
        if (typeof Cocoon != "undefined")
            this.inappsService = Cocoon.InApp;
        else if (typeof Windows != "undefined")
            this.inappsService = WindowsInappsService;
        else {
            this.showError();
            return;
        }

        // Service initialization
        this.inappsService.initialize({ autofinish: true }, (error) => { this.onStoreInitializated(error) });

        this.inappsService.on("purchase", {
            start: (productId) => { this.onPurchaseStart(productId); },
            error: (productId, error) => { this.onPurchaseError(productId, error) },
            complete: (purchaseInfo) => { this.onPurchaseComplete(purchaseInfo) }
        });
    }

    // on store initalizated callback
    private onStoreInitializated(error) {
        console.log("initialized Store" + error)
        this.inappsService.fetchProducts(this.productsIds, (products, error) => { this.onFetchProducts(products, error); });
    }

    // on fetch productscallback
    private onFetchProducts(products, error) {
        console.log("fetchProducts" + error)
        this.products = {};
        for (var p in products) this.products[products[p].productId] = products[p];
        this.fillProducts(products, this.inappsService);
    }

    // on purchase complete callback
    private onPurchaseComplete(purchaseInfo) {

        this.fullFillPurchase(purchaseInfo.productId, purchaseInfo.transactionId, this.inappsService);
        this.updateUI();
        this.unlockUI();

        this.getProductListItem(purchaseInfo.productId).setPurchased(true);

        // Analytics
        // FlipPlusGame.counterData.increaseCounter("purchases");
        // var transaction_num = FlipPlusGame.counterData.getCounter("purchases");
        // FlipPlusGame.analytics.purchaseParts("parts", purchaseInfo.productId, this.products[purchaseInfo.productId].price, this.products[purchaseInfo.productId].localizedPrice, transaction_num);

        // Story
        // FlipPlusGame.storyData.setStoryPlayed("purchased");

    }

    // verify product avaliability
    private updateProductsAvaliability() {

    }
    */
}

module InAppPurchaseServices {
    interface ProductListItem {

        constructor(productId: string, name: string, description: string, localizedPrice: string);

        setPurchasing();
        setPurchased(timeOut: boolean);
        setNotAvaliable();
        setNormal();
        setAvaliable();

        loading();
        enable();
        disable();
    }
}
