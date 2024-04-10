// import { useSelector, useDispatch } from "react-redux";
// import { selectPostIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from "./postsSlice";

const PostsList = () => {

    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('getPosts')

    // const orderedPostIds = useSelector(selectPostIds);
    // const postStatus = useSelector(getPostsStatus);

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        // const orderedPostIds = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        
        content = posts.ids.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default PostsList