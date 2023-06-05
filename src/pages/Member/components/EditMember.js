import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAuth } from '@/store/slice/authSlice';
import { apiUser } from '@/api';

const initUser = {
  email: '',
  name: '',
  sex: 'male',
  mobile: '',
  birth: '',
  hobby: [],
};

const { getProfile, patchProfile } = apiUser;

const EditMember = () => {
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

  const handleSubmit = async () => {
    try {
      await patchProfile({ data: { ...user } });
      await fetchUserProfile();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      const { data } = await getProfile(email);
      if (data.status === 'success') {
        const formattedBirth = !!data.data.birth ? new Date(data.data.birth).toISOString().split('T')[0] : '';
        setUser((pre) => ({ ...pre, ...data.data, birth: formattedBirth }));
      }
    } catch (error) {
      console.error(error);

      navigate('/');
    }
  }, [email, navigate]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          電子信箱
        </label>
        <input type="email" className="form-control" autoComplete="off" disabled id="email" value={user.email} />
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          姓名
        </label>
        <input
          type="text"
          className="form-control"
          autoComplete="off"
          id="name"
          placeholder="請填寫姓名"
          value={user.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <p className="form-label">性別</p>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="sex"
            id="male"
            checked={user.sex === 'male'}
            onChange={handleSex}
          />
          <label className="form-check-label" htmlFor="male">
            男性
          </label>
        </div>
        <div className="form-check form-check-inline">
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
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="sex"
            id="unspecified"
            checked={user.sex === 'unspecified'}
            onChange={handleSex}
          />
          <label className="form-check-label" htmlFor="unspecified">
            不提供
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="birth" className="form-label">
          出生日期
        </label>
        <input type="date" className="form-control" id="birth" onChange={handleChange} value={user.birth} />
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

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
          修改個人資料
        </button>
      </div>
    </form>
  );
};

export default EditMember;