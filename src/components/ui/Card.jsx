// components/ui/Card.jsx
export const Card = ({ children, title }) => {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
      {title && (
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};