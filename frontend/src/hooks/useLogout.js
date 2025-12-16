import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
    //dispatch logout action
    dispatch({type:"LOGOUT"})
    //remove user from storage
    localStorage.removeItem('user');
    workoutsDispatch({type:"SET_WORKOUTS",payload:null})
    }
    return {logout}
}
 
export default useLogout;