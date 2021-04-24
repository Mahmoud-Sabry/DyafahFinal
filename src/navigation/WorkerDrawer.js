import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

// components 
import WorkerMenu from '../custom/WorkerDrawer';
import Home from '../Worker/Home';
import Orders from '../Worker/Orders';
import NewDetails from '../Worker/OrderDetails/NewDetails';
import WaitingDetails from '../Worker/OrderDetails/WaitingDetails';
import FinishedDetails from '../Worker/OrderDetails/FinishedDetails';
import Profile from '../Worker/Profile';
import Settings from '../Worker/Settings';
import EditProfile from '../Worker/EditProfile';
import Favorites from '../custom/Favorites';
import PastOrders from '../custom/PastOrders';
import WorkerComments from '../Worker/Comments';

//  Components for Search
import SearchFilter from '../user/SearchFilter';
import SearchResults from '../user/SearchResults';
import WorkerView from '../user/WorkerView';
import ChooseDate from '../user/ChooseDate';
import Comments from '../user/Comments'
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

const WorkerDrawer = () => {
    return (
        <Drawer.Navigator drawerPosition='right' drawerContent={props => <WorkerMenu {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Orders" component={Orders} />
            <Drawer.Screen name="NewDetails" component={NewDetails} />
            <Drawer.Screen name="WaitingDetails" component={WaitingDetails} />
            <Drawer.Screen name="FinishedDetails" component={FinishedDetails} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="EditProfile" component={EditProfile} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Favorites" component={Favorites} />
            <Drawer.Screen name="PastOrders" component={PastOrders} />
            <Drawer.Screen name="WorkerComments" component={WorkerComments} />
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

export default WorkerDrawer
