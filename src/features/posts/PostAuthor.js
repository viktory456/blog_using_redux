import { useSelector } from "react-redux";
// import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from '../users/usersSlice'

const PostAuthor = ({ userId }) => {

    // const { users,
    //     isLoading: isLoadingUser,
    //     isSuccess: isSuccessUser,
    //     isError: isErrorUser,
    //     error: errorUser
    // } = useGetUsersQuery()

    // const users = useSelector(selectAllUsers)

    // const author = users.find(user => user.id === userId);

    const { user: author } = useGetUsersQuery('getUsers', {
        selectFromResult: ({ data, isLoading }) => ({
            user: data?.entities[userId]
        }),
    })

    return <span>by {author
         ? <Link to={`/user/${userId}`}>{author.name}</Link>
          : 'Unknown author'}</span>
}
export default PostAuthor