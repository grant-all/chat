import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as UserActionCreators from '../redux/actions/user'
import * as DialogActionCreators from '../redux/actions/dialog'


const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(
        {
            ...UserActionCreators,
            ...DialogActionCreators
        },
        dispatch
    )
}

export default useActions