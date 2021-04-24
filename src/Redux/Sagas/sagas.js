// export { watchGetCarsList } from './Cars';
// export { setCarsDetails } from './Cars/setCarsDetails';
export { watchSetLanguage, getLanguage } from './Main/language'
export { watchGetAppUser, watchSetAppUser } from './Main/appUser'
/////////// Auth ///////////
export { watchRegisterCarProvider } from './Auth/registerCar';
export { watchRegisterProvider } from './Auth/registerProvider';
export { watchLogin } from './Auth/login';
/////////// Auth Functions
export { watchChangeProfilePhoto } from './Auth/ChangePhoto'
export { watchGetProfile } from './Auth/getProfile'
export { watchEditProfile } from './Auth/editProfile'
export { watchChangeAccountPassword } from './Auth/changePass'
///////////
export {
    watchGetWorkerHome,
    watchGetWorkerRates,
    watchGetWorkerInfo,
    watchGetWorkerNewOrders,
    watchGetWorkerWaitingOrders,
    watchGetWorkerCompletedOrders,
    watchSetWorkerUser
} from './Worker/info'
export { watchEditWorkerInfo } from './Worker/editWorkerInfo'
export { watchChangeWorkerHomeStatus } from './Worker/changeStatus'
///////////
export {
    watchSetProviderInfo,
    watchGetNewOrders,
    watchGetPreparingOrders,
    watchGetFinishedOrders,
    watchGetNewProducts,
    watchGetOffers
} from './Provider/info'
///////////
export { watchAddCarProduct } from './Provider/addCarProduct'
export { watchEditCarProduct } from './Provider/editCarProduct'
///////////
export { watchGetProductDetails } from './Provider/productDetails'
export { watchDeleteProviderProduct } from './Provider/deleteProduct'
///////////
export { watchAddOffer } from './Provider/addNewOffer'
export { watchUpdateOffer } from './Provider/updateOffer'
export { watchDeleteProviderOffer } from './Provider/deleteOffer'
///////////
export { watchAddPlaceProduct } from './Provider/Places/addPlace'
export { watchEditPlaceProduct } from './Provider/Places/editPlace'
///////////
export { watchAddEatingProduct } from './Provider/Eating/addEating'
export { watchEditEatingProduct } from './Provider/Eating/editEating'
///////////
export { watchAcceptRefuseOrder } from './Provider/Orders/acceptRefuse'
export { watchChangeOrderStatus } from './Provider/Orders/changeStatus'
export { watchGetProviderRates } from './Provider/ProviderRates'
///////////
export { watchAcceptRefuse } from './Worker/Orders/acceptRefuse'
export { watchChangeStatus } from './Worker/Orders/changeStatus'
//
export { watchGetBottomSliderData } from './User/Home/bottomSlider'
export { watchGetTopSliderData } from './User/Home/topSlider'
export { watchGetCarProductsData } from './User/Home/carProducts'
export { watchGetKashtaProducts, watchGetPopularProducts } from './User/Home/eatingProducts'
export { watchGetChefWorkersData, watchGetCoffeeWorkesData } from './User/Home/workers'
export { watchGetPlacesData } from './User/Home/getPlaces'
export { watchGetProductDetailsData } from './User/Home/productDetails'
export { watchGetReviewsData } from './User/Home/getReviews'
export { watchGetDatesData } from './User/Home/getDates'
export { watchGetSearchResults } from './User/Home/search'
export { watchChangeUserPhoto } from './User/Home/changePhoto'
export { watchRegisterNewUser } from './User/Auth/register'
export { watchLoginCustomerUser } from './User/Auth/login'
export { watchSendConfirmEmail } from './User/Auth/confirmEmail'
export { watchSendConfirmCode } from './User/Auth/confirmCode'
export { watchResetPassword } from './User/Auth/changePassword'
export { watchChangeProfilePassword } from './User/Home/changeProfilePass'
export { watchChangeUserCover } from './User/Home/changeCover'
export { watchDeleteUserCover } from './User/Home/deleteCover'
//
export { watchAddToFavorite } from './Main/addToFavorite'
export { watchGetSettingsData } from './Main/getSettings'
export { watchGetUserProfile } from './Main/getUserProfile'
export { watchGetFavoritesData } from './Main/getFavorites'
export { watchGetPastOrdersData } from './Main/pastOrders'
export { watchGetPastOrderDetails } from './Main/orderDetails'
export { watchRatePastOrder } from './Main/rateOrder'
export { watchCheckTokenAuth } from './Main/checkAuth'
export { watchGetCartFromStorage, watchSetCartToStorage } from './Main/cart'
export { watchSendToken } from './Main/sendToken'
export { watchGetCartDetailsData } from './Main/showCart'
export { watchSendInvoice } from './Main/sendInvoice'
export { watchRatingProduct } from './Main/rateProduct'
export { watchProductCommenting } from './Main/addingComment'
export { watchCreateOrder } from './Main/createOrder'
export { watchUpdateUserProfile } from './Main/updateUserProfile'
