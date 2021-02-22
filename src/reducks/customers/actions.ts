import { CustomersActionTypes, CustomersType } from "./types";
import { actionTypes } from "../actionTypes";

export const deleteCustomerAction = (
  customers: CustomersType
): CustomersActionTypes => {
  return {
    type: actionTypes.DELETE_CUSTOMER,
    payload: customers,
  };
};

export const editCustomerAction = (
  customers: CustomersType
): CustomersActionTypes => {
  return {
    type: actionTypes.EDIT_CUSTOMER,
    payload: customers,
  };
};

export const fetchCustomersAction = (
  customers: CustomersType
): CustomersActionTypes => {
  return {
    type: actionTypes.FETCH_CUSTOMERS,
    payload: customers,
  };
};
