Cocoon.Store.nativeAvailable = true;
Cocoon.nativeAvailable = true;
Cocoon.App.nativeAvailable = true;
// #region -------------------Binding Layer -------------------------------------------------------

var ext = ext || {};

// able to do native calls
Cocoon.callNative = function (nativeExtensionObjectName, command, arguments) {
    if (WindowsNativeFunctions[nativeExtensionObjectName] &&
        WindowsNativeFunctions[nativeExtensionObjectName][command])
        WindowsNativeFunctions[nativeExtensionObjectName][command](arguments);
}

// regustar a new listener
// Todo, listeners are not accumulative
var WindowsNativeListeners = {};
ext.IDTK_SRV_STORE = ext.IDTK_APP = {
    addEventListener: function (nativeEventName, listener) {
        WindowsNativeListeners[nativeEventName] = listener;
    },
    addEventListenerOnce: function (nativeEventName, listener) {
        WindowsNativeListeners[nativeEventName] = listener;
    },
    removeEventListenerOnce: function () { },//TODO 
    makeCall: function (callId) { return WindowsNativeFunctions.IDTK_APP[callId](); },
}

// execute a native callback
function WindowsDoNativeCallback(nativeEventName){
    if (WindowsNativeListeners[nativeEventName])
        return WindowsNativeListeners[nativeEventName];
    return function(){console.log(nativeEventName +" not implemented")};
}
// #endregion 

var licenseInformation;
var currentApp;

WindowsNativeFunctions = {
    IDTK_APP: {
        showMessageBox: function (arguments){
            var message = Windows.UI.Popups.MessageDialog(arguments[1], arguments[0]);
            message.commands.append(new Windows.UI.Popups.UICommand(arguments[2], function () {
                WindowsDoNativeCallback("onmessageboxdenied")()
            }));
            message.commands.append(new Windows.UI.Popups.UICommand(arguments[3], function () {
                WindowsDoNativeCallback("onmessageboxconfirmed")()
            }));
            message.showAsync()
        },
        getDeviceInfo: function (arguments) {
            return {
                os: "windows",
                version: "",
                dpi: "",
                brand: "",
                model: "",
                imei: "",
                platformId: "",
                odin: "",
                openudid: "",
            }
        }
    },
    IDTK_SRV_STORE: {
        requestInitialization: function (arguments) {
            currentApp = Windows.ApplicationModel.Store.CurrentAppSimulator || Windows.ApplicationModel.Store.CurrentApp;
                licenseInformation = currentApp.licenseInformation;
        },
        fetchProductsFromStore: function (arguments) {
            var products = arguments[0];
            // send start callback
            WindowsDoNativeCallback("onProductsFetchStarted")();
            currentApp.loadListingInformationAsync().then(
            function (listing) {
                var productListing = [];
                //create a new products array
                for (var p in listing.productListings)
                    //if is a product
                    if (listing.productListings[p].productId) {
                        var product = listing.productListings[p];
                        productListing.push({
                            productId: product.productId,
                            productAlias: product.name,
                            productType: product.productType,
                            title: product.name,
                            description: product.description,
                            localizedPrice: product.formattedPrice,
                            price: "",
                            downloadURL: "",
                        })
                    }

                //send sucess callback
                WindowsDoNativeCallback("onProductsFetchCompleted")(productListing);
            },
            function (error) {
                //send error callback
                WindowsDoNativeCallback("onProductsFetchStarted")(error.message);
            }
            );

        },
        purchaseFeature: function (arguments) {
            var productId = arguments[0]
            // call purchase started
            WindowsDoNativeCallback("onProductPurchaseStarted")(productId);
            currentApp.requestProductPurchaseAsync(productId, false).then(
                function (purchaseResults) {
                    // call purchase complete
                    if (purchaseResults)
                        var purchaseInfo = { productId: productId, quantity: 1, transactionId: purchaseResults.transactionId }
                    else
                        var purchaseInfo = { productId: productId, quantity: 1 };

                    WindowsDoNativeCallback("onProductPurchaseCompleted")(purchaseInfo)
                },
                function (error) {
                    // call purchased failed
                    WindowsDoNativeCallback("onProductPurchaseFailed")(error.message);
                }
            )
        },
        consumePurchase: function (arguments) {
            transactionId=arguments[0];
            productId = arguments[1]
            // call purchase started
            if (!transactionId) return;

            WindowsDoNativeCallback("onConsumePurchaseStarted")(transactionId);

            currentApp.reportConsumableFulfillmentAsync(productId, transactionId).then(
                function(fulfillmentResult){
                    // call purchase started
                    WindowsDoNativeCallback("onConsumePurchaseCompleted")(transactionId);
                },
                function(error){
                    // call purchase started
                    WindowsDoNativeCallback("onConsumePurchaseFailed")(transactionId, error.message);
            
                })
        },
        restorePurchases: function (arguments) { // PAREI AQUI
        
            // call purchase started
            WindowsDoNativeCallback("onRestorePurchasesStarted")();
      

            WindowsDoNativeCallback("onRestorePurchasesFailed")("not implemented");
               
            var licenses = licenseInformation.ProductLicenses;
            if (licenses.Count >0)
            {
                //WindowsDoNativeCallback("onRestorePurchasesCompleted")(); 
            }
        }
    }
}


Cocoon.App.exitCallback = function (appShouldFinishCallback) {

    var hardwareButtons = Windows.Phone.UI.Input.HardwareButtons;
    hardwareButtons.addEventListener("backpressed", function (e) {
        // Navigate back in your webview. 
        e.handled = true; // Notifies OS that you've handled the back button event.
        appShouldFinishCallback();
    });
}
