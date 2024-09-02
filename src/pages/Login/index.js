import { Link, Outlet, useParams } from 'react-router-dom';
const Login = () => {
  const params = useParams();
  console.log(params, '113331');
  return (
    <div>
      <h1>登录页</h1>
      <br />
      <Link to="/HOmE/H1">跳转到首页</Link>
      <Outlet />
    </div>
  );
};

export default Login;
