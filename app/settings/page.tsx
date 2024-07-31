import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import getMyBasicProfile from "@/config/queries/getMyBasicProfile";
import updateMyProfile from "@/config/actions/updateMyProfile";
import toggleIsProfileSearchable from "@/config/actions/toggleIsProfileSearchable";
import ChangeDisplayNameInput from "@/components/usercards/ChangeDisplayNameInput";

const SettingsPage = async () => {
  const myData = await getMyBasicProfile();

  return (
    <div className="text-black">
      <h2 className="text-white font-bold">My Settings</h2>
      <div className="flex flex-row justify-center gap-[10px] bg-gray-300 border-gray-500 p-5 m-5">
        <label htmlFor="displayname">
          Update Your Display Name (Must be unique)
        </label>
        <ChangeDisplayNameInput existingName={myData.profile.displayname} />
      </div>

      <form
        action={updateMyProfile}
        className="flex flex-col bg-gray-300 border-gray-500 p-5 m-5"
      >
        <label htmlFor="name">
          Update Your Name (This is searchable, but not displayed on your
          profile.)
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={myData.profile.name}
          className="mb-[10px]"
        />

        <label htmlFor="Bio">Update Your Bio</label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={myData.profile.bio}
          className="mb-[10px]"
        ></textarea>
        <button
          className="bg-red-300 p-3 w-2/5 transition duration-300 text-center hover:bg-red-600 hover:text-white"
          type="submit"
        >
          Update
        </button>
      </form>

      <div className="flex flex-row gap-[15px] bg-gray-300 border-gray-500 p-5 m-5">
        <div>Make my profile show up in search results</div>
        <form action={toggleIsProfileSearchable}>
          <button type="submit">
            {myData.options.isProfileSearchable ? (
              <FaToggleOn className="text-2xl text-blue-600" />
            ) : (
              <FaToggleOff className="text-2xl text-red-600" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
