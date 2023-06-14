// Create ToDo Reducer
import {
  TODO_ADD_ERROR,
  TODO_ADD_REQ,
  TODO_ADD_SUCCESS,
  TODO_CANCEL_COMPLETE_SUCCESS,
  TODO_CANCEL_FAILED,
  TODO_CANCEL_PENDING_SUCCESS,
  TODO_COMPLETE_CANCEL_SUCCESS,
  TODO_COMPLETE_FAILED,
  TODO_COMPLETE_PENDING_SUCCESS,
  TODO_DELETE_FAILED,
  TODO_DELETE_SUCCESS_CANCEL,
  TODO_DELETE_SUCCESS_COMPLETE,
  TODO_DELETE_SUCCESS_PENDING,
  TODO_FAILED,
  TODO_GET_ERROR,
  TODO_GET_REQ,
  TODO_GET_SUCCESS,
  TODO_PENDING_CANCEL_SUCCESS,
  TODO_PENDING_COMPLETE_SUCCESS,
  TODO_PENDING_FAILED,
} from './actionType';
import { initialState } from './initialState';

export const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TODO_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case TODO_GET_REQ:
      return {
        ...state,
        loading: true,
      };

    case TODO_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        cancel: payload.filter((item) => item.type === 'cancel'),
        pending: payload.filter((item) => item.type === 'pending'),
        complete: payload.filter((item) => item.type === 'complete'),
      };

    case TODO_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case TODO_ADD_REQ:
      return {
        ...state,
        loading: true,
      };

    case TODO_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        pending: [...state.pending, payload],
      };

    case TODO_ADD_ERROR:
      return {
        ...state,

        loading: false,
        error: payload,
      };

    case TODO_CANCEL_PENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        pending: [...state.pending, payload],
        cancel: state.cancel.filter((item) => item.id !== payload.id),
      };

    case TODO_COMPLETE_PENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        pending: [...state.pending, payload],
        complete: state.complete.filter((item) => item.id !== payload.id),
      };

    case TODO_PENDING_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case TODO_CANCEL_COMPLETE_SUCCESS:
      return {
        ...state,
        loading: false,
        complete: [...state.complete, payload],
        cancel: state.cancel.filter((item) => item.id !== payload.id),
      };

    case TODO_PENDING_COMPLETE_SUCCESS:
      return {
        ...state,
        loading: false,
        complete: [...state.complete, payload],
        pending: state.pending.filter((item) => item.id !== payload.id),
      };

    case TODO_COMPLETE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case TODO_PENDING_CANCEL_SUCCESS:
      return {
        ...state,
        loading: false,
        cancel: [...state.cancel, payload],
        pending: state.pending.filter((item) => item.id !== payload.id),
      };

    case TODO_COMPLETE_CANCEL_SUCCESS:
      return {
        ...state,
        loading: false,
        cancel: [...state.cancel, payload],
        complete: state.complete.filter((item) => item.id !== payload.id),
      };

    case TODO_CANCEL_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case TODO_DELETE_SUCCESS_CANCEL:
      return {
        ...state,
        loading: false,
        cancel: state.cancel.filter((item) => item.id !== payload),
      };

    case TODO_DELETE_SUCCESS_PENDING:
      return {
        ...state,
        loading: false,
        pending: state.pending.filter((item) => item.id !== payload),
      };

    case TODO_DELETE_SUCCESS_COMPLETE:
      return {
        ...state,
        loading: false,
        complete: state.complete.filter((item) => item.id !== payload),
      };

    case TODO_DELETE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
