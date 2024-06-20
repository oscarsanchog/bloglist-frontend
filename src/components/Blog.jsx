import BlogDetail from "./BlogDetail"
import Togglabe from "./Togglabe"

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.user.username}
    <Togglabe >
      <BlogDetail blog={blog} />
      
      
    </Togglabe>
  </div>  
)

export default Blog