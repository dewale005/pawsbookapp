import { createRef } from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = createRef();

export const navigate = (name, params) => {
    navigationRef.current?.navigate(name, params);
};

export const goBack = async () => {
    navigationRef.current?.dispatch(StackActions.pop());
  };