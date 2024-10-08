import { ButtonType } from "@/utils/types";

const Button = ({ buttonText, onClick }: ButtonType) => {
  return (
    <button
      className="bg-white p-1 border border-1 m-1 border-zinc-900 rounded-md text-zinc-900 min-w-[80px] h-fit outline-none hover:bg-zinc-900 hover:text-white"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
