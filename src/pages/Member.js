import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAuth } from '@/store/slice/authSlice';
import { apiUser } from '@/api';

const initUser = {
  username: '',
  sex: 'man',
  mobile: '',
  birth: '',
};

const { getProfile } = apiUser;

const Member = () => {
  const navigate = useNavigate();
  const { email } = useSelector(selectAuth);
  const [user, setUser] = useState(initUser);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((pre) => ({ ...pre, [id]: value }));
  };

  const handleSex = (e) => {
    const { id } = e.target;
    setUser((pre) => ({ ...pre, sex: id }));
  };

  const handleTel = (e) => {
    const { id, value } = e.target;
    if (/^\d*$/.test(value)) {
      setUser((pre) => ({ ...pre, [id]: value }));
    }
  };

  const handleSubmit = () => {};

  useEffect(() => {
    getProfile(email)
      .then(({ data }) => {
        if (data.status === 'success') {
          setUser((pre) => ({ ...pre, ...data.data }));
        }
      })
      .catch(() => {
        navigate('/');
      });
  }, [email, navigate]);

  return (
    <div className="container">
      <h1 className="text-center">會員中心</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            姓名
          </label>
          <input
            type="text"
            className="form-control"
            autoComplete="off"
            id="username"
            placeholder="請填寫姓名"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">性別</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sex"
              id="male"
              checked={user.sex === 'man'}
              onChange={handleSex}
            />
            <label className="form-check-label" htmlFor="male">
              男性
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sex"
              id="female"
              checked={user.sex === 'female'}
              onChange={handleSex}
            />
            <label className="form-check-label" htmlFor="female">
              女性
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            行動電話
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            autoComplete="off"
            value={user.mobile}
            onChange={handleTel}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="birth" className="form-label">
            出生日期
          </label>
          <input type="date" className="form-control" id="birth" onChange={handleChange} value={user.birth} />
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
            修改個人資料
          </button>
        </div>
      </form>
    </div>
  );
};

export default Member;
