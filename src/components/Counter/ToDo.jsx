import React, { useEffect, useState } from 'react';
import { BiTrash, BiStopCircle, BiCheck, BiX } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';

import { addCancel, addComplete, addPending, addTodo, deleteTodo, getTodo } from '../../redux/todo/todoAction';
import './ToDo.scss';
import 'react-toastify/dist/ReactToastify.css';

const ToDo = () => {
  const { cancel, pending, complete, loading } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  // Handle Add Btn
  const handleAddBtn = () => {
    dispatch(addTodo(input));
    setInput('');
  };

  // Handle Pending Btn
  const handlePendingBtn = (id, type) => {
    dispatch(addPending(id, type));
  };

  // Handle Complete Btn
  const handleCompleteBtn = (id, type) => {
    dispatch(addComplete(id, type));
  };

  // Handle Cancel Btn
  const handleCancelBtn = (id, type) => {
    dispatch(addCancel(id, type));
  };

  // Handle Delete btn
  const handleDeleteBtn = (id, type) => {
    dispatch(deleteTodo(id, type));
  };

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  return (
    <>
      {loading && (
        <div className="loading">
          <GridLoader color="#ffff" size={19} />
        </div>
      )}

      <div className=" container mt-5 ">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card-wrapper">
              <div className="card-body-main">
                <h2 className="animate__animated animate__bounce anim-1">ToDo App</h2>
                <div className="form d-flex animate__animated animate__flipInX anim-2 ">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Type Your ToDo"
                    name=""
                    id=""
                  />
                  <button onClick={handleAddBtn}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-4 animate__animated animate__bounceInLeft anim-3">
            <div className="cancel">
              <h2>
                <button className="cancel-display-icon">
                  <BiX />
                </button>{' '}
                Cancel
              </h2>
              <ul className="list-ul ">
                {cancel.length > 0 ? (
                  cancel.map((item, index) => {
                    return (
                      <li className=" d-flex justify-content-between" key={index}>
                        {item.name}{' '}
                        <div className="action-btn d-flex gap-1 ">
                          <button onClick={() => handlePendingBtn(item.id, 'cancel')} className="pending">
                            <BiStopCircle />
                          </button>
                          <button onClick={() => handleCompleteBtn(item.id, 'cancel')} className="success">
                            <BiCheck />
                          </button>
                          <button className="delete" onClick={() => handleDeleteBtn(item.id, 'cancel')}>
                            <BiTrash />
                          </button>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className=" d-flex justify-content-center">No Item Here</li>
                )}
              </ul>
            </div>
          </div>

          <div className="col-md-4 animate__animated animate__bounceInUp anim-4">
            <div className="pending">
              <h2>
                <button className="pending-display-icon">
                  <BiStopCircle />
                </button>{' '}
                Pending
              </h2>
              <ul className="list-ul ">
                {pending.length > 0 ? (
                  pending.map((item, index) => (
                    <li className=" d-flex justify-content-between" key={index}>
                      {item.name}{' '}
                      <div className="action-btn d-flex gap-1">
                        <button onClick={() => handleCancelBtn(item.id, 'pending')} className="cancel">
                          <BiX />
                        </button>
                        <button onClick={() => handleCompleteBtn(item.id, 'pending')} className="success">
                          <BiCheck />
                        </button>
                        <button onClick={() => handleDeleteBtn(item.id, 'pending')} className="delete">
                          <BiTrash />
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className=" d-flex justify-content-center">No Item Here</li>
                )}
              </ul>
            </div>
          </div>

          <div className="col-md-4 animate__animated animate__bounceInRight anim-5">
            <div className="complete">
              <h2>
                <button className="complete-display-icon">
                  <BiCheck />
                </button>{' '}
                Complete
              </h2>
              <ul className="list-ul ">
                {complete.length > 0 ? (
                  complete.map((item, index) => (
                    <li className=" d-flex justify-content-between" key={index}>
                      {item.name}{' '}
                      <div className="action-btn d-flex gap-1">
                        <button className="cancel" onClick={() => handleCancelBtn(item.id, 'complete')}>
                          <BiX />
                        </button>
                        <button onClick={() => handlePendingBtn(item.id, 'complete')} className="pending">
                          <BiStopCircle />
                        </button>
                        <button onClick={() => handleDeleteBtn(item.id, 'complete')} className="delete">
                          <BiTrash />
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className=" d-flex justify-content-center">No Item Here</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
