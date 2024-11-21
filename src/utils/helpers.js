export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  export const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };