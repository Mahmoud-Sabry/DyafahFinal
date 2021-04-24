
import { Toast } from 'native-base';

const ShowToast = (_text, _type = 'danger') => {
    console.log("ShowToast: ", _text, ' ', _type)
    Toast.show({ text: _text, type: _type })
}
export default ShowToast;