import React from 'react'
import classes from './navbar.module.css'
import { Link } from 'react-router-dom'
import avt from '../../assets/avt.jpg'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth) // Lấy thông tin user từ Redux store

  const handleLogout = () => {
    dispatch(logout()) // Gọi action logout từ Redux
    // Thực hiện các bước logout khác nếu cần
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to='/'>Blog Fact</Link>
        </div>
        <nav>
          <ul className={classes.center}>
            <li className={classes.listItem}><a href='/' className={classes.listItem}>Home</a></li>
            <li className={classes.listItem}><a href='#About' className={classes.listItem}>About</a></li>
            <li className={classes.listItem}><a href='#Newsletter' className={classes.listItem}>Contacts</a></li>
            <li className={classes.listItem}><a href='#Categories' className={classes.listItem}>Categories</a></li>
          </ul>
        </nav>
        <div className={classes.right}>
          <img onClick={() => setShowModal(prev => !prev)} src={avt} className={classes.img} />
          {user && <span>{user.username}</span>} {/* Hiển thị username nếu user tồn tại */}
          {showModal &&
            <div className={classes.modal}>
              <Link to='/create'>Create</Link>
            {/* <span>logout</span> */}
            <span onClick={handleLogout}>Logout</span> {/* Gọi handleLogout khi click vào Logout */}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar