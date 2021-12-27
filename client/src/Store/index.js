import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { 
    resDeleteReducer, 
    resDetailsReducer, 
    resListReducer, 
    resSaveReducer 
} from '../reducers/reservationReducer';
import { 
    restauDeleteReducer, 
    restauDetailsReducer, 
    restauListReducer, 
    restauSaveReducer 
} from '../reducers/restauReducer';
import { 
    tableDeleteReducer,
    tableSaveReducer 
} from '../reducers/tableReducer';
import { 
    userDeleteReducer,
    userRegisterReducer, 
    userSaveReducer, 
    userSigninReducer 
} from '../reducers/userReducer';



const rootReducer = combineReducers({
        tableSave:tableSaveReducer,
        tableDelete:tableDeleteReducer,
        resList:resListReducer,
        resDetails:resDetailsReducer,
        resDelete:resDeleteReducer,
        resSave:resSaveReducer,
        restauList:restauListReducer,
        restauDelete:restauDeleteReducer,
        restauDetails:restauDetailsReducer,
        restauSave:restauSaveReducer,
        userSignin:userSigninReducer,
        userRegister:userRegisterReducer,
        userSave:userSaveReducer,
        userDelete:userDeleteReducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['tableSave','tableDelete','resList','resDetails',
    'resDelete','resSave','restauList','restauDelete',
    'restauDetails','restauSave','userRegister','userSave','userDelete'] // navigation will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)))
export const persistor =  persistStore(store) 

