import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import getMyBasicProfile from "@/config/queries/getMyBasicProfile";
import updateMyProfile from "@/config/actions/updateMyProfile";
import toggleIsProfileSearchable from "@/config/actions/toggleIsProfileSearchable";
import ChangeDisplayNameInput from "@/components/usercards/ChangeDisplayNameInput";

const SettingsPage = async () => {
  const myData = await getMyBasicProfile();

  return (
    <div>
      <h2>My Settings</h2>
      <label htmlFor="displayname">Update Your Display Name</label>
      <ChangeDisplayNameInput existingName={myData.profile.displayname} />
      <form
        action={updateMyProfile}
        className="flex flex-col bg-gray-300 border-gray-500 p-5 m-5"
      >
        <label htmlFor="name">Update Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={myData.profile.name}
        />

        <label htmlFor="Bio">Update Your Bio</label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={myData.profile.bio}
        ></textarea>
        <button
          className="bg-red-300 p-3 w-2/5 transition duration-300 text-center hover:bg-red-600 hover:text-white"
          type="submit"
        >
          Update
        </button>
      </form>

      <div className="flex flex-col bg-gray-300 border-gray-500 p-5 m-5">
        <h3>Options</h3>
        <div>
          <p>Make my profile show up in search results</p>
          <form action={toggleIsProfileSearchable}>
            <button type="submit">
              {myData.options.isProfileSearchable ? (
                <FaToggleOn className="text-lg text-blue-600" />
              ) : (
                <FaToggleOff className="text-lg text-red-600" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
