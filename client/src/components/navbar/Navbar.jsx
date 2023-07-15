import React from 'react'
import classes from './navbar.module.css'
import { Link } from 'react-router-dom'
import avt from '../../assets/avt.jpg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout()) // Gọi action logout từ Redux
    // Thực hiện các bước logout khác nếu cần
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to='/'>Blog Note</Link>
        </div>
        <ul className={classes.center}>
          <li className={classes.listItem}><Link to='/' className={classes.listItem}>Home</Link></li>
          <li className={classes.listItem}><Link to='/FeaturedBlogs' className={classes.listItem}>About</Link></li>
          <li className={classes.listItem}><Link to='/Newsletter' className={classes.listItem}>Contacts</Link></li>
          <li className={classes.listItem}><Link to='/Categories' className={classes.listItem}>Categories</Link></li>
        </ul>
        <div className={classes.right}>
          <img onClick={() => setShowModal(prev => !prev)} src={avt} className={classes.img} />
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