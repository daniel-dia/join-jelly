class InAppPurchases {

    public static requestProductList(callback: (products:Array<ProductListing>) => void) {
        setTimeout(() => {
            if (callback) callback([
                { ProductId: "time5x", Name: "5x Snow", Description: "Freeze Screen \nfor 5 seconds", FormattedPrice: "R$1,99",      },
                { ProductId: "fast5x", Name: "5x Magnet", Description: "Join jellies on \nscreen", FormattedPrice: "R$1,99",      },
                { ProductId: "revive5x", Name: "5x Revive", Description: "Give you another \nchance to continue", FormattedPrice: "R$1,99",  },
                { ProductId: "clean5x", Name: "5x Clean", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                { ProductId: "evolve5x", Name: "5x Evolve", Description: "Evolve one random\njelly", FormattedPrice: "R$1,99", },
                { ProductId: "pack5x", Name: "Item Pack 3x", Description: "5 of each item", FormattedPrice: "R$4,99",    },
                { ProductId: "pack10x", Name: "Item Pack 9x", Description: "10 of each item", FormattedPrice: "R$6,99",   },
                { ProductId: "lucky", Name: "Lucky Clover", Description: "Doubles chance for \nfinding a item", FormattedPrice: "R$3,99",  },
            ])
        }, 1000);
    }

    public static purchaseProductRequest(productId: string, callback: (productId: string,sucess:boolean) => void) {
        setTimeout(() => {
            if (callback) callback(productId,true)
        }, 2000);
    }

    public static reportProductFullfillment(productId: string, callback?: () => void) {
        setTimeout(() => {
            if(callback) callback()
        }, 2000);
    }
 
}

enum ProductAvaliability {
    AVALIABLE,
    PURCHASED,
    NOTAVALIABLE,

}

interface ProductListing {
    ProductId: string;
    Name: string;
    Description: string;
    FormattedPrice: string;
    ImageUri?: string;
    ProductType?: string;
    Tag?: string;
    avaliability?: boolean;
}