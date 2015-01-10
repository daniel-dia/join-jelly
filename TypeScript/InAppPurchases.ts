class InAppPurchases {

    public static requestProductList(callback: (products:Array<ProductListing>) => void) {
        setTimeout(() => {
            if (callback) callback([
                { ProductId: "time3x", Name: "3x Time", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99",      },
                { ProductId: "fast3x", Name: "3x Fast", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99",      },
                { ProductId: "revive3x", Name: "3x Revive", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99",  },
                { ProductId: "clean3x", Name: "3x Clean", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99",    },
                { ProductId: "pack3x", Name: "Item Pack 3x", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$4,99",    },
                { ProductId: "pack9x", Name: "Item Pack 9x", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$8,99",   },
                { ProductId: "lucky", Name: "Lucky Clover", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$3,99",  },
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