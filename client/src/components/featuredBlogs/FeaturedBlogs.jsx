import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../utils/fetchApi'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import classes from './featuredBlogs.module.css'
import {MdOutlinePreview} from 'react-icons/md'
import {AiFillLike} from 'react-icons/ai'

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  const firstHighestBlog = filteredBlogs[0];
  const secondHighestBlog = filteredBlogs[1];
  const thirdHighestBlog = filteredBlogs[2];

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

    const sortedBlogs = blogs.sort((a, b) => b.views - a.views);

    setFilteredBlogs(sortedBlogs.slice(0, 3)); 

  }, [activeCategory, blogs]);


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>Featured Blogs</h3>
        <div className={classes.blogs}>
          <div className={classes.left}>
          {filteredBlogs?.length > 0 ?
            <div className={classes.mainBlog}>
                <div key={firstHighestBlog._id} className={classes.blog}>
                  <Link to={`/blogDetails/${firstHighestBlog?._id}`}>
                    <img src={`http://localhost:5000/images/${firstHighestBlog?.photo}`} />
                  </Link>
                  <div className={classes.mainBlogData}>
                    <div className={classes.categoryAndMetadata}>
                      <span className={classes.category}>{firstHighestBlog?.category}</span>
                      <div className={classes.metadata}>
                        <MdOutlinePreview /> {firstHighestBlog.views} views
                      </div>
                      <div className={classes.metadata}>
                        <AiFillLike /> {firstHighestBlog?.likes?.length} likes
                      </div>
                    </div>
                    <h4>{firstHighestBlog?.title}</h4>
                    {/* <p className={classes.blogDesc}>
                        {firstHighestBlog?.desc}
                    </p> */}
                    <div className={classes.authorAndCreatedAt}>
                        <span><span>Author:</span> {firstHighestBlog?.userId?.username}</span>
                        <span><span>Created:</span> {format(firstHighestBlog?.createdAt)}</span>
                    </div>
                  </div>
              </div>
            </div>
            : <h3 className={classes.noBlogsMessage}>No blogs</h3>}
          </div>
          <div className={classes.right}>
          {filteredBlogs?.length > 1 ?
            <div className={classes.secondaryBlog}>
              <div key={secondHighestBlog._id} className={classes.blog}>
                  <Link to={`/blogDetails/${secondHighestBlog?._id}`}>
                    <img src={`http://localhost:5000/images/${secondHighestBlog?.photo}`} />
                  </Link>               
                  <div className={classes.secondaryBlogData}>
                    <h4>{secondHighestBlog?.title}</h4>
                      {/* <p className={classes.desc}>
                        {secondHighestBlog?.desc}
                      </p> */}
                      <div className={classes.authorAndCreatedAt}>
                        <span><span>Author:</span> {secondHighestBlog?.userId?.username}</span>
                        <span><span>Created:</span> {format(secondHighestBlog?.createdAt)}</span>
                    </div>
                  </div> 
              </div>
            </div>
            : <h3 className={classes.noBlogsMessage}>No blogs</h3>}
            {filteredBlogs?.length > 2 ?
            <div className={classes.secondaryBlog}>
              <div key={thirdHighestBlog._id} className={classes.blog}>
                  <Link to={`/blogDetails/${thirdHighestBlog?._id}`}>
                    <img src={`http://localhost:5000/images/${thirdHighestBlog?.photo}`} />
                  </Link>                
                  <div className={classes.secondaryBlogData}>
                    <h4>{thirdHighestBlog?.title}</h4>
                      {/* <p className={classes.desc}>
                        {thirdHighestBlog?.desc}
                      </p> */}
                      <div className={classes.authorAndCreatedAt}>
                        <span><span  className={classes.author} >Author:</span> {thirdHighestBlog?.userId?.username}</span>
                        <span><span>Created:</span> {format(thirdHighestBlog?.createdAt)}</span>
                    </div>
                </div>
              </div>
            </div>
            : <h3 className={classes.noBlogsMessage}>No blogs</h3>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedBlogs