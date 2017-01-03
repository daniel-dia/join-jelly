declare var WindowsInappsService; 

class InAppPurchaseServices {

    private Cocoon: any;
    private initialized: boolean = false;
    private WindowsInappsService: any;


    private products: Array<InAppPurchaseServices.ProductInfo>;
    private productsIds: Array<string>;
    private inappsService;

    // on purchase start callback
    public onError: () => any;
    public onProductsLoaded: (products) => any;

    private onPurchaseStart: (productId) => any;
    private onPurchaseError: (productId, error) => any;
    private onPurchaseComplete: (productId) => any;

    constructor(productsIds: Array<string>) {

        // if there are no store avaliable
        if (typeof Cocoon != "undefined") this.inappsService = Cocoon.InApp;
        else if (typeof Windows != "undefined") this.inappsService = WindowsInappsService;
        else {
            if (this.onError) this.onError();
            return;
        }

        // Service initialization
        this.productsIds = productsIds;

        this.inappsService.initialize({ autofinish: true }, (error) => {
            if (error) {
                console.log("initialized Store " + error)
                return;
            }

            this.inappsService.fetchProducts(this.productsIds, (products: Array<InAppPurchaseServices.ProductInfo>, error) => {

                if (error) {
                    console.log("product loading error " + error)
                    return;
                }

                this.products = products;
                if (this.onProductsLoaded) this.onProductsLoaded(products);
            });

        });


    }

    public purchaseProduct(productId: string, quantity: number, callback: (error: string) => void) {
        this.inappsService.purchase(productId, quantity, callback);
    }

    public restorePurchases() {
        this.inappsService.restore();
    }
}

module InAppPurchaseServices {

    export interface ProductInfo {
        productId: string;
        title: string;
        description: string;
        localizedPrice: string;
    }

    export interface ProductListItem {

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
