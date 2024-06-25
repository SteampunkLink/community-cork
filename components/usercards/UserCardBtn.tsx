interface IUserCardBtnParams {
  btnText: string;
}

const UserCardBtn = ({ btnText }: IUserCardBtnParams) => {
  return (
    <button className="bg-slate-400 p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300">
      {btnText}
    </button>
  );
};

export default UserCardBtn;
