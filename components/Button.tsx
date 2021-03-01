import classnames from 'classnames';

interface CustomProps {
  variant: 'primary';
  buttonSize?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  href?: string;
}

type Props = CustomProps & React.HTMLProps<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  variant,
  type = 'button',
  children,
  href,
  buttonSize = 'medium',
  ...props
}) => {
  const className = classnames(
    'bg-spotify-green hover:bg-spotify-light-green transition duration-200 text-white rounded-full uppercase tracking-widest font-bold',
    {
      'py-3 px-6 text-xs': buttonSize === 'small',
      'py-4 px-10 text-base': buttonSize === 'medium',
    },
  );

  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

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
