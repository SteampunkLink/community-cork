import addPost from "@/config/actions/addPost";
import PostSubmitBtn from "./PostSubmitBtn";

const PostForm = () => {
  return (
    <form
      action={addPost}
      className="flex flex-col items-center justify-between w-[250px] h-[200px] bg-zinc-300 border-zinc-600 m-5 border-2"
    >
      <header className="font-bold w-full px-3 bg-zinc-400">
        <h3>Create Post</h3>
      </header>
      <div className="">
        <textarea
          id="body"
          name="body"
          className="border w=9/12"
          placeholder="Enter your post here."
          rows={4}
          aria-label="Enter your post here."
          required
        ></textarea>
      </div>
      <div className="">
        <select
          id="color"
          name="color"
          className="border w=9/12"
          aria-label="Select note color."
          required
        >
          <option>Select Note Color</option>
          <option value="emerald">Emerald</option>
          <option value="sky">Sky</option>
          <option value="rose">Rose</option>
          <option value="violet">Violet</option>
        </select>
      </div>
      <PostSubmitBtn />
    </form>
  );
};

export default PostForm;
