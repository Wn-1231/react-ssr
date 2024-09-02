import { Link, Outlet, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../store/counter';
import { asyncGetUserData } from '../../store/user';
import React from 'react';

const Home = () => {
  const params = useParams();
  const count = useSelector((state) => state.counter.count);
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  console.log('wangning1213')
  localStorage.setItem('wangning', 'wangning')

  navigator.userAgent.includes('Chrome')

  document.cookie = 'name=wangning'

  console.log(navigator.maxTouchPoints)
    .
    return(
      <div>
        <div>params参数: {JSON.stringify(params)}</div>
        <div>名字：{name}</div>
        <div>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <span>{count}</span>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>

        <h1>首页</h1>
        <br />
        <div>
          <Link to="/login">跳转到登录页</Link>
        </div>
        <div>
          <Link to="/login/e1e1e1">跳转到404</Link>
        </div>
        <br />
        <Outlet></Outlet>
        <button onClick={() => console.log('click me')}>点击</button>
      </div>
    );
};

Home.getInitData = async (store, ctx) => {
  return Promise.all([
    store.dispatch(asyncGetUserData),
    store.dispatch(increment()),
  ]);
};

export default Home;
