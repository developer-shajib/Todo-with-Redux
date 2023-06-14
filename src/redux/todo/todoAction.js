import axios from 'axios';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
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

// ToDo Get Request
export const getTodo = () => async (dispatch) => {
  try {
    dispatch({ type: TODO_GET_REQ });
    await axios
      .get('http://localhost:5050/todos')
      .then((res) => {
        dispatch({ type: TODO_GET_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: TODO_GET_ERROR, payload: error.message });
      });
  } catch (error) {
    dispatch({ type: TODO_FAILED, payload: error.message });
  }
};

// ToDo Get Request
export const addTodo = (input) => async (dispatch) => {
  try {
    if (!input) {
      toast('Input Field Are Required! Try Again', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      });
    } else {
      dispatch({ type: TODO_ADD_REQ });
      await axios
        .post('http://localhost:5050/todos', { name: input, type: 'pending' })
        .then((res) => {
          toast('ToDo Create Successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            type: 'success',
          });
          dispatch({ type: TODO_ADD_SUCCESS, payload: res.data });
        })
        .catch((error) => {
          dispatch({ type: TODO_ADD_ERROR, payload: error.message });
        });
    }
  } catch (error) {
    dispatch({ type: TODO_FAILED, payload: error.message });
  }
};

// Pending Btn Handler
export const addPending = (id, type) => (dispatch) => {
  try {
    axios
      .patch(`http://localhost:5050/todos/${id}`, { type: 'pending' })
      .then((res) => {
        toast('ToDo Added Pending List', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          type: 'success',
        });
        if (type === 'cancel') {
          dispatch({
            type: TODO_CANCEL_PENDING_SUCCESS,
            payload: res.data,
          });
        }
        if (type === 'complete') {
          dispatch({
            type: TODO_COMPLETE_PENDING_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: TODO_PENDING_FAILED,
          error: `Data Can't Updated! Try Again!`,
        });
      });
  } catch (error) {
    dispatch({ type: TODO_FAILED, payload: error.message });
  }
};

// Complete Btn Handler
export const addComplete = (id, type) => (dispatch) => {
  try {
    axios
      .patch(`http://localhost:5050/todos/${id}`, { type: 'complete' })
      .then((res) => {
        toast('ToDo Added Complete List', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          type: 'success',
        });

        if (type === 'cancel') {
          dispatch({
            type: TODO_CANCEL_COMPLETE_SUCCESS,
            payload: res.data,
          });
        }
        if (type === 'pending') {
          dispatch({
            type: TODO_PENDING_COMPLETE_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: TODO_COMPLETE_FAILED,
          error: `Data Can't Updated! Try Again!`,
        });
      });
  } catch (error) {
    dispatch({ type: TODO_FAILED, payload: error.message });
  }
};

// Complete Btn Handler
export const addCancel = (id, type) => (dispatch) => {
  try {
    axios
      .patch(`http://localhost:5050/todos/${id}`, { type: 'cancel' })
      .then((res) => {
        toast('ToDo Added Cancel List', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          type: 'success',
        });
        if (type === 'pending') {
          dispatch({
            type: TODO_PENDING_CANCEL_SUCCESS,
            payload: res.data,
          });
        }
        if (type === 'complete') {
          dispatch({
            type: TODO_COMPLETE_CANCEL_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: TODO_CANCEL_FAILED,
          error: `Data Can't Updated! Try Again!`,
        });
      });
  } catch (error) {
    dispatch({ type: TODO_FAILED, payload: error.message });
  }
};

// Delete ToDo
export const deleteTodo = (id, type) => (dispatch) => {
  try {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5050/todos/${id}`)
          .then((res) => {
            toast('ToDo Delete Successful', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
              type: 'success',
            });

            if (type === 'cancel') {
              dispatch({ type: TODO_DELETE_SUCCESS_CANCEL, payload: id });
            }
            if (type === 'pending') {
              dispatch({ type: TODO_DELETE_SUCCESS_PENDING, payload: id });
            }
            if (type === 'complete') {
              dispatch({ type: TODO_DELETE_SUCCESS_COMPLETE, payload: id });
            }
          })
          .catch((error) => {
            dispatch({
              type: TODO_DELETE_FAILED,
              payload: `ToDo Delete Failed`,
            });
          });
      }
    });
  } catch (error) {
    dispatch({ type: TODO_FAILED, payload: error.message });
  }
};
