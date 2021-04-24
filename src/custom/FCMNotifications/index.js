import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import { setDeviceToken } from '../../Redux/Slices/Main/appUser';

export async function requestUserPermission() {
    const dispatch = useDispatch()
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        const token = await messaging().getToken();
        dispatch(setDeviceToken({ token }))
    } else {
        try {
            await messaging().requestPermission();
            const token = await messaging().getToken();
            dispatch(setDeviceToken({ token }))
        } catch (error) {
            const token = await messaging().getToken();
            dispatch(setDeviceToken({ token }))
            console.log('error token:', token);
            console.log('error FCM: ', error);
        }
    }
}


// import firebase from '@react-native-firebase/app';
// import { Platform } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
// export const getFCMToken = async () => {
//     const enabled = await firebase.messaging().hasPermission();

//     if (enabled) {
//         // user has permissions
//         return await firebase.messaging().getToken();
//     } else {
//         // user doesn't have permission
//         try {
//             await firebase.messaging().requestPermission();
//             // User has authorised
//             return await firebase.messaging().getToken();
//         } catch (error) {
//             return await firebase.messaging().getToken();
//             // User has rejected permissions
//         }
//     }

//     //for testing
//     // const enabled = await firebase.messaging().hasPermission();
//     // if (enabled) {
//     //   const fcmToken = await firebase.messaging().getToken();
//     //   alert('enabled');
//     //   r.log('tok', fcmToken);
//     //   firebase.notifications().onNotification(notification => {
//     //   });
//     // } else {
//     //   try {
//     //     firebase.messaging().requestPermission();
//     //   } catch (e) {
//     //     alert('no perm');
//     //   }
//     // }
// };

// export const configure = async () => {
//     try {
//         const fcmToken = await getFCMToken();
//         if (fcmToken) {
//             console.log("FCM_Token: ", fcmToken)
//             setNotificationsListeners();
//         }
//     } catch (e) { }
// };

// const setNotificationsListeners = async () => {
//     const channel = new firebase.notifications.Android.Channel(
//         'ecommerce_channel',
//         'ECommerce Channel',
//         firebase.notifications.Android.Importance.Max,
//     ).setDescription('A channel for ECommerce to show notifications');

//     // Create the channel
//     firebase.notifications().android.createChannel(channel);

//     firebase
//         .notifications()
//         .onNotification(notification => viewNotification(notification));
// };

// const viewNotification = async notification => {
//     // Notification is received while app being in foreground
//     if (Platform.OS == 'android') {
//         const constructedNotification = new firebase.notifications.Notification({
//             sound: 'default',
//             show_in_foreground: true,
//         })
//             .setNotificationId(notification._notificationId)
//             .setTitle(notification._title)
//             .setBody(notification._body)
//             .setData(notification._data)
//             .android.setChannelId('ecommerce_channel');

//         if (notification.android._bigPicture) {
//             constructedNotification.android.setBigPicture(
//                 notification.android._bigPicture.picture,
//             );
//             constructedNotification.android.setLargeIcon(
//                 notification.android._bigPicture.picture,
//             );
//         }
//         if (notification.android._largeIcon) {
//             constructedNotification.android.setLargeIcon(
//                 notification.android._largeIcon,
//             );
//         }

//         firebase.notifications().displayNotification(constructedNotification);
//     } else if (Platform.OS == 'ios') {
//         const constructedNotification = new firebase.notifications.Notification()
//             .setTitle(notification._title)
//             .setBody(notification._body)
//             .setData(notification._data);

//         const imageUrl = notification.data
//             ? notification.data.fcm_options
//                 ? notification.data.fcm_options.image
//                     ? notification.data.fcm_options.image
//                     : null
//                 : null
//             : null;

//         //to view notification image in notification if the app in foreground the image must be downloaded locally first

//         if (imageUrl) {
//             let res = await RNFetchBlob.config({
//                 fileCache: true,
//                 appendExt: 'jpg',
//             }).fetch('GET', imageUrl);
//             constructedNotification.ios.addAttachment('image', res.path());
//         }

//         firebase.notifications().displayNotification(constructedNotification);
//     }

//     firebase.notifications().onNotificationOpened(notification => {
//         // User clicked notification while app being in foreground or background
//     });
// };

// export const checkInitialNotification = async () => {
//     const initialNotification = await firebase
//         .notifications()
//         .getInitialNotification();

//     if (initialNotification) {
//         // User opened app after being closed by clicking a notification

//         return initialNotification;
//     }
// };
