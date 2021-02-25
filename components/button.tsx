interface CustomProps {
  variant: 'primary';
  type?: 'button' | 'submit';
}

type Props = CustomProps & React.HTMLProps<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  variant,
  type = 'button',
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className="bg-spotify-green hover:bg-spotify-light-green transition duration-200 text-white py-4 px-10 rounded-full uppercase tracking-widest font-bold"
    >
      {children}
    </button>
  );
};

export default Button;
