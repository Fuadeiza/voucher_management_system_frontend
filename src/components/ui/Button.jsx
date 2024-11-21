export const Button = ({ children, variant = 'primary', ...props }) => {
    const baseStyles = 'px-4 py-2 rounded-md font-semibold transition-colors';
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    };
  
    return (
      <button
        className={`${baseStyles} ${variants[variant]}`}
        {...props}
      >
        {children}
      </button>
    );
  };