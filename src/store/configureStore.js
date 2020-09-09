import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Modereducer from './reducers/ui.reducer';
import Authreducer from './reducers/auth.reducer';
import Userreducer from './reducers/user.reducer';
import Postreducer from './reducers/post.reducer';
import { allUserReducers } from './reducers/allUser.reducer';
import { chatListReducer } from './reducers/chatsListReducer';

const rootReducer = combineReducers({
  mode: Modereducer,
  auth: Authreducer,
  user: Userreducer,
  post: Postreducer,
  users: allUserReducers,
  chatlist: chatListReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
