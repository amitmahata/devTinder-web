import { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className='flex flex-wrap gap-5 justify-center my-5'>
        <UserCard user={feed[0]} />
      </div>
    )
  );
}

export default Feed