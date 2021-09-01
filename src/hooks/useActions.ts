import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as UserActionCreators from '../redux/actions/user'
import * as DialogActionCreators from '../redux/actions/dialog'
import * as MessageActionCreators from '../redux/actions/message'
import * as AppActionCreators from '../redux/actions/app'
import * as AlertActionCreators from '../redux/actions/alert'
import * as AlertDialogActionCreators from '../redux/actions/alertDialog'
import * as SocketActionCreators from '../redux/actions/socket'

const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(
        {
            ...UserActionCreators,
            ...DialogActionCreators,
            ...MessageActionCreators,
            ...AppActionCreators,
            ...AlertActionCreators,
            ...AlertDialogActionCreators,
            ...SocketActionCreators
        },
        dispatch
    )
}

export default useActions