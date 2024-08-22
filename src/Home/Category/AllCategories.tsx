import { useGetCategoryQuery } from "../../redux/api/categoryApi";

export const AllCategories = () => {
  const { data, isLoading, error } = useGetCategoryQuery(undefined); // Adjust the hook and arguments as needed

  if (isLoading) {
    return "Loading..."; // or return a loading spinner component if needed
  }

  if (error) {
    return error;
  }

  if (data) {
    return data.data; // Return the actual data object/array
  }

  return "No data found"; // Default case if no data is found
};
