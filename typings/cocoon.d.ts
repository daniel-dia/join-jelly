declare module Cocoon {

    export module Store {

        export function addProduct(product: Cocoon.Store.ProductInfo);
        export function addPurchase(purchase: Cocoon.Store.PurchaseInfo);
        export function canPurchase();
        export function consume(transactionId, productId: string);
        export function finish(transactionId: string);
        export function getProducts();
        export function getPurchases();
        export function getStoreType();
        export function initialize(parameters?: Cocoon.Store.InitializatoinParameters);
        export function isProductPurchased(productId: string);
        export function loadProducts(products: Array<string>);
        export function purchase(productId);
        export function removeProduct(productI: string);
        export function removePurchase(transactionId: string);
        export function restore();
        export function on(event: string, callbacks: any);

        export interface InitializatoinParameters {
            sandbox: boolean;
            managed: boolean;
        }

        export class ProductInfo {
            productId: string;// The id of the product.
            productAlias: string;// The alias of the product.
            productType: ProductType;// The product type.
            title: string;// The title of the product.
            description: string;// The description of the product.
            price: string;// The price of the product.
            localizedPrice: string; // The localized price of the product.
            downloadURL: string; // The URL of the asset to be downloaded for this purchase.
        }

        export class PurchaseInfo {
            transactionId: string;// The transaction id of a purchase.
            purchaseTime: string; // The time when the purchase was done in seconds since 1970.
            purchaseState: PurchaseState;// The state of the purchase.
            productId: string; // The product id related to this purchase.
            quantity: string; // The number of products of the productId kind purchased in this transaction.
        }

        export enum PurchaseState {
            PURCHASED, // The product has been successfully purchased.The transaction has ended successfully.
            CANCELED, // The purchase has been canceled.
            REFUNDED, // The purchase has been refunded.
            EXPIRED, // The purchase(subscriptions only) has expired and is no longer valid.
        }

        export enum ProductType {
            CONSUMABLE,
            NON_CONSUMABLE,
            AUTO_RENEWABLE_SUBSCRIPTION,
            FREE_SUBSCRIPTION,
            NON_RENEWABLE_SUBSCRIPTION
        }

        export enum object {
            APP_STORE,  // Apple AppStore./
            PLAY_STORE,  // Android Play Store.
            MOCK_STORE,  // Mock Store (Used for testing).
            CHROME_STORE,  // Chrome AppStore.
            AMAZON_STORE, // Amazon AppStore.
            NOOK_STORE,  // Nook Store.
        }

    }

    export module Social {
        export class Facebook extends Interface { //Not Completed

            static api();
            static getAuthResponse();
            static getLoginStatus();
            static getPermissions();
            static getSocialInterface();
            static init(any);
            static login();
            static logout();
            static requestAdditionalPermissions();
            static showFriendPicker();
            static showShareDialog();
            static subscribe();
            static ui();
            static unsubscribe();
            static uploadPhoto();
        }

        export class GameCenter  {  //Not Completed

            static getLocalPlayer();
            static getMultiplayerInterface();
            static getSocialInterface();
            static loadAchievementDescriptions(callback: (error) => void);
            static loadAchievements(callback: (error) => void);
            static loadFriends(callback: (error) => void);
            static loadPlayers(playerIDs: string, callback: (error) => void);
            static loadScores(callback: (error) => void, query: Cocoon.Social.GameCenter.Leaderboard);
            static login();
            static resetAchievements(callback: (error) => void);
            static showAchievements(callback: (error) => void);
            static showLeaderboards(callback: (error) => void, query: Cocoon.Social.GameCenter.Leaderboard);
            static submitAchievements(achievements: Array<Cocoon.Social.GameCenter.Achievement>, callback: (error) => void);
            static submitScore(score: Cocoon.Social.GameCenter.Score, callback: (error) => void);

        }

        export module GameCenter {
            export interface Achievement {
                identifier: string;
                percentComplete: number;//Percentage of achievement complete (from 0 to 100).
                lastReportedDate: number;
            }
            export interface AchievementDescription {
                identifier: string;
                title: string;
                achievedDescription: string;
                unachievedDescription: string;
                maximumPoints: number;
            }
            export interface Leaderboard {

                category: string;
                playerIDs: Array<any>;
                timeScope: Cocoon.Social.GameCenter.TimeScope;
                playerScope: Cocoon.Social.GameCenter.PlayerScope;
                rangeStart: number;
                rangeLength: number;
                scores: Array<any>;
                localPlayerScore: Cocoon.Social.GameCenter.Score;
                localizedTitle: string;



            }
            export interface LocalPlayer {
                playerID: string;
                alias: string;
                isAuthenticated: boolean;

            }
            export interface Player {
                playerID: string;
                alias: string;
                isFriend: boolean;
            }
            export interface Score {
                userID: string
                score: number
                userName: string
                imageURL: string
                leaderboardID: string
                rank: number

            }
            export enum TimeScope {
                TODAY,
                WEEK,
                ALL_TIME
            }
            export enum PlayerScope {
                GLOBAL,
                FRIENDS
            }
        }

        export class GooglePlayGames  {
            static init(params?);
            static getSocialInterface(): Cocoon.Social.Interface;
            static getMultiplayerInterface():any //Cocoon.Multiplayer.MultiplayerService;
        }

        export class Interface {
            getLoggedInUser();
            hasPublishPermissions(callback: () => void);
            isLoggedIn();
            login(callback: (loggedIn: boolean, error) => void);
            logout(callback: (error) => void);
            publishMessage(message: Cocoon.Social.Message, callback: (error) => void);
            publishMessageWithDialog(message: Cocoon.Social.Message, callback: (error) => void);
            requestAchievements(callback: (achievements:Array<Cocoon.Social.Achievement> , error) => void, userId?: string);
            requestAllAchievements(callback: (error) => void);
            requestFriends(callback: (error) => void, userID: string);
            requestPublishPermissions(callback: (error) => void);
            requestScore(callback: (error) => void, params: Cocoon.Social.ScoreParams);
            requestUser(callback: (error) => void, userID: string);
            requestUserImage(callback: (error) => void, userID: string, imageSize: Cocoon.Social.ImageSize);
            resetAchievements(callback: (error) => void);
            setAchievementsMap(map:any);
            setTemplates(leaderboardsTemplate: string, achievementsTemplate: string)
            showAchievements(callback?: (error) => void);
            showLeaderboard(params?: Cocoon.Social.ScoreParams, callback?: (error) => void);
            submitAchievement(achievementID: string, callback: (error) => void);
            submitScore(score: number, callback?: (error) => void, params?: Cocoon.Social.ScoreParams);
        }

        export class Achievement {
            achievementID: string // The id of the achievement info.
            customID: string // The optional custom id of the achievement defined by the user.
            title: string // The title of the achievement.
            description: string // The description of the achievement.
            imageURL: string // The url to the image representing the achievement.
            points: number // The points value of the achievement.
        }
        export class Message {
            constructor(description: string, icon: string, website: string, title: string, caption: string)
            message: string; // The message to be published.
            mediaURL: string; // An URL to a media (image, video, ...).
            linkURL: string;// An URL to add to the message so the user can click on that link to get more information.
            linkText: string;// The text that will appear in the message link.
            linkCaption: string; // The text caption that will appear in the message link.
        }
        export interface Score {
            userID: string; // The user id.
            score: number; // The score of the user.
            userName: string; // The name of the user.
            imageURL: string; // imageURL The url of the user image.
            leaderboardID: number; // The id of the leaderboard the score belongs to.

        }
        export interface ScoreParams {
            userID?: string; // The user id. If no userID is specified the current logged in user is assumed.
            leaderboardID?: number; // The leaderboard ID. If no leaderboard is specified the default leaderboard is assumed.
            friends?: boolean; // If enabled the query will get only scores from friends in the social network.
            timeScope?: Cocoon.Social.TimeScope; // The time scope for the scores.
        }
        export interface User {
            userID: string; //The id of the user.
            userName?: string; //The user name of the user.
            userImage?: string; //If the image URL is not provided by default, fetch it using requestUserImage method.
        }

        export enum TimeScope {
            ALL_TIME,
            WEEK,
            TODAY,
        }
        export enum ImageSize {
            THUMB,
            SMALL,
            MEDIUM,
            LARGE
        }
    }

    export module Dialog {
        enum keyboardType {
            TEXT,
            NUMBER,
            PHONE,
            EMAIL,
            URL,
        }

        export function confirm(params: any, callback?: any);
        export function prompt(params: any, callback?: any);
    }

    export module Device {

        export function getDeviceInfo(): DeviceInfo;

        export class DeviceInfo {
            os: string;
            version: string;
            dpi: string;
            brand: string;
            model: string;
            imei: string;
            platformId: string;
            odin: string;
            openudid: string;
        }

    }
}