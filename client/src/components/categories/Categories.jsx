import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../utils/fetchApi'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import classes from './categories.module.css'
import { MdOutlinePreview } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { FiArrowRight } from 'react-icons/fi'

const Categories = () => {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const categories = [
    'all',
    'nature',
    'music',
    'travel',
    'design',
    'programming',
    'univer',
    'fashion'
  ]
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(4);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await request('/blog/getAll', 'GET')
        setBlogs(data)
        setFilteredBlogs(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs((prev) => {
        const filteredBlogs = blogs.filter((blog) => blog.category.toLowerCase() === activeCategory.toLowerCase())

        return filteredBlogs
      })
    }
  }, [activeCategory])

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>Select a category</h3>
        <div className={classes.categoriesAndBlogs}>
          <div className={classes.categories}>
            {categories.map((category) => (
              <span
                key={category}
                className={`${classes.category} ${activeCategory === category && classes.active}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </span>
            ))}
          </div>
          {filteredBlogs?.length > 0 ? (
            <>
              <div className={classes.blogs}>
                {currentBlogs.map((blog) => (
                  <div key={blog._id} className={classes.blog}>
                    <Link to={`/blogDetails/${blog?._id}`}>
                      <img src={`http://localhost:5000/images/${blog?.photo}`} alt={blog?.title} />
                    </Link>
                    <div className={classes.blogData}>
                      <div className={classes.categoryAndMetadata}>
                        <span className={classes.category}>{blog?.category}</span>
                        <div className={classes.metadata}>
                          <MdOutlinePreview /> {blog.views} views
                        </div>
                        <div className={classes.metadata}>
                          <AiFillLike /> {blog?.likes?.length} likes
                        </div>
                      </div>
                      <div className={classes.intro}>
                        <h3>{blog?.title}</h3>
                        {/* <p className={classes.blogDesc}>
                          {blog?.desc}
                        </p> */}
                        <div className={classes.authorAndCreatedAt}>
                          <span><span>Author:</span> {blog?.userId?.username}</span>
                          <span><span>Created:</span> {format(blog?.createdAt)}</span>
                        </div>
                      </div>
                      <Link
                        to={`/blogDetails/${blog._id}`}
                        className={classes.readMore}
                        onClick={(e) => {
                          // Scroll the container back to the top
                          e.document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Read More <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.pagination}>
                {blogs.length > blogsPerPage && (
                  <ul className={classes.paginationList}>
                    {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }).map((_, index) => (
                      <li key={index}>
                        <button
                          className={`${classes.paginationButton} ${currentPage === index + 1 && classes.active}`}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <h3 className={classes.noBlogsMessage}>No blogs</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories;
