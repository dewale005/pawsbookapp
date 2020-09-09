import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screen/pages/Profile';
import Editprofile from '../screen/pages/Editprofile';

const Drawer = createDrawerNavigator();

const SideDrawer = () => {
    return (
        <Drawer.Navigator drawerPosition="right" drawerType="back" >
            <Drawer.Screen name="profile" component={Profile} />
            {/* <Drawer.Screen name="editprofile" component={Editprofile} /> */}
        </Drawer.Navigator>
    )
}

export default SideDrawer;
