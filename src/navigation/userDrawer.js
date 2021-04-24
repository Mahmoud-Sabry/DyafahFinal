import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

// components 
import CustomDrawer from '../custom/UserDrawer';
import Home from '../user/home';
import Cars from '../user/CarsPage';
import Product from '../user/ProductView';
import ChooseDate from '../user/ChooseDate';
import ConfirmProduct from '../user/ConfirmProduct';
import UserInfo from '../user/UserInfo';
import Comments from '../user/Comments';
import WorkHelper from '../user/WorkHelper';
import Workers from '../user/Workers';
import WorkerView from '../user/WorkerView';
import ConfirmWorker from '../user/ConfirmWorker';
import SearchFilter from '../user/SearchFilter';
import UserProfile from '../user/UserProfile';
import Cart from '../user/Cart';
import Favorites from '../custom/Favorites';
import SearchResults from '../user/SearchResults';
import About from '../user/About';
import Places from '../user/Places';
import PlaceView from '../user/PlaceView';
import ConfirmPlace from '../user/ConfirmPlace';
import FoodLists from '../user/FoodLists';
import FoodItem from '../user/FoodItem';
import PastOrders from '../custom/PastOrders'; // '../user/PastOrders'
import OrderView from '../custom/PastOrders/orderView'; // '../user/PastOrders/orderView'
import Register from '../user/Register';
import Login from '../user/Login';
import ConfirmEmail from '../custom/ForgetPassword/confirmEmail';
import ConfirmCode from '../custom/ForgetPassword/confirmCode';
import ChangePassword from '../custom/ForgetPassword/changePass';
import NormalSearch from '../custom/NormalSearch'
import GoogleMaps from '../custom/GoogleMaps';
// 

const UserDrawer = () => {
    return (
        <Drawer.Navigator drawerPosition='right' drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Cars" component={Cars} />
            <Drawer.Screen name="Product" component={Product} />
            <Drawer.Screen name="ChooseDate" component={ChooseDate} />
            <Drawer.Screen name="ConfirmProduct" component={ConfirmProduct} />
            <Drawer.Screen name="UserInfo" component={UserInfo} />
            <Drawer.Screen name="Comments" component={Comments} />
            <Drawer.Screen name="WorkHelper" component={WorkHelper} />
            <Drawer.Screen name="Workers" component={Workers} />
            <Drawer.Screen name="WorkerView" component={WorkerView} />
            <Drawer.Screen name="ConfirmWorker" component={ConfirmWorker} />
            <Drawer.Screen name="SearchFilter" component={SearchFilter} />
            <Drawer.Screen name="UserProfile" component={UserProfile} />
            <Drawer.Screen name="Cart" component={Cart} />
            <Drawer.Screen name="Favorites" component={Favorites} />
            <Drawer.Screen name="SearchResults" component={SearchResults} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Places" component={Places} />
            <Drawer.Screen name="PlaceView" component={PlaceView} />
            <Drawer.Screen name="ConfirmPlace" component={ConfirmPlace} />
            <Drawer.Screen name="FoodLists" component={FoodLists} />
            <Drawer.Screen name="FoodItem" component={FoodItem} />
            <Drawer.Screen name="PastOrders" component={PastOrders} />
            <Drawer.Screen name="OrderView" component={OrderView} />
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="UserForget" component={ConfirmEmail} />
            <Drawer.Screen name="UserConfirmCode" component={ConfirmCode} />
            <Drawer.Screen name="UserChangePass" component={ChangePassword} />
            <Drawer.Screen name="NormalSearch" component={NormalSearch} />
            <Drawer.Screen name="GoogleMaps" component={GoogleMaps} />
        </Drawer.Navigator>
    )
}

export default UserDrawer
