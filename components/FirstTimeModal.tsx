import Modal from "./Modal";
import ChangeDisplayNameInput from "./usercards/ChangeDisplayNameInput";

const FirstTimeModal = () => {
  return (
    <Modal>
      <>
        <h2>Hey there, new in town?</h2>
        <p>
          Before you start, you're going to want to have a unique display name.
          Don't worry, you can always change this later.
        </p>
        <ChangeDisplayNameInput existingName={""} />
      </>
    </Modal>
  );
};

export default FirstTimeModal;
