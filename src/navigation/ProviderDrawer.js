import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

// components 
import ProviderMenu from '../custom/ProviderDrawer';
import Orders from '../Provider/Orders';
import Profile from '../Provider/Profile';
import Settings from '../Provider/Settings';
import Products from '../Provider/Products';
import AddCar from '../Provider/AddProduct/addCar';
import AddPlace from '../Provider/AddProduct/AddPlace';
import Offers from '../Provider/Offers';
import ChooseProduct from '../Provider/Offers/ChooseProduct';
import EditProduct from '../Provider/EditProduct';
import EditOffer from '../Provider/EditOffer';
import AddEating from '../Provider/AddProduct/AddEating';
import Favorites from '../custom/Favorites';
import PastOrders from '../custom/PastOrders';
import ProviderComments from '../Provider/Comments';
//

//  Components for Search
import SearchFilter from '../user/SearchFilter';
import SearchResults from '../user/SearchResults';
import WorkerView from '../user/WorkerView';
import ChooseDate from '../user/ChooseDate';
import Comments from '../user/Comments';
import Product from '../user/ProductView';
import ConfirmProduct from '../user/ConfirmProduct';
import ConfirmWorker from '../user/ConfirmWorker';
import ConfirmPlace from '../user/ConfirmPlace';
import UserInfo from '../user/UserInfo';
import PlaceView from '../user/PlaceView';
import Cart from '../user/Cart'
import NormalSearch from '../custom/NormalSearch'
import OrderView from '../custom/PastOrders/orderView';
import GoogleMaps from '../custom/GoogleMaps';
import FoodItem from '../user/FoodItem';
// 

const ProviderDrawer = (props) => {
    // console.log("ProviderDrawer props ", props)
    return (
        <Drawer.Navigator drawerPosition='right' drawerContent={props => <ProviderMenu {...props} />}>
            <Drawer.Screen name="Orders" component={Orders} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Products" component={Products} />
            <Drawer.Screen name="AddCar" component={AddCar} />
            <Drawer.Screen name="AddPlace" component={AddPlace} />
            <Drawer.Screen name="AddEating" component={AddEating} />
            <Drawer.Screen name="Offers" component={Offers} />
            <Drawer.Screen name="ChooseProduct" component={ChooseProduct} />
            <Drawer.Screen name="EditProduct" component={EditProduct} />
            <Drawer.Screen name="EditOffer" component={EditOffer} />
            <Drawer.Screen name="Favorites" component={Favorites} />
            <Drawer.Screen name="PastOrders" component={PastOrders} />
            <Drawer.Screen name="ProviderComments" component={ProviderComments} />
            {/* Components for Search Bar */}
            <Drawer.Screen name="SearchFilter" component={SearchFilter} />
            <Drawer.Screen name="SearchResults" component={SearchResults} />
            <Drawer.Screen name="WorkerView" component={WorkerView} />
            <Drawer.Screen name="ChooseDate" component={ChooseDate} />
            <Drawer.Screen name="Comments" component={Comments} />
            <Drawer.Screen name="Product" component={Product} />
            <Drawer.Screen name="ConfirmProduct" component={ConfirmProduct} />
            <Drawer.Screen name="ConfirmWorker" component={ConfirmWorker} />
            <Drawer.Screen name="ConfirmPlace" component={ConfirmPlace} />
            <Drawer.Screen name="UserInfo" component={UserInfo} />
            <Drawer.Screen name="PlaceView" component={PlaceView} />
            <Drawer.Screen name="Cart" component={Cart} />
            <Drawer.Screen name="NormalSearch" component={NormalSearch} />
            <Drawer.Screen name="OrderView" component={OrderView} />
            <Drawer.Screen name="GoogleMaps" component={GoogleMaps} />
            <Drawer.Screen name="FoodItem" component={FoodItem} />
            {/*  */}
        </Drawer.Navigator>
    )
}

export default ProviderDrawer
