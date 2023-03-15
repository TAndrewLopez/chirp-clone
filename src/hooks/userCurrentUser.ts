import useSWR from "swr";
import fetcher from "@/libs/fetcher";

/*
    THIS HOOK WILL USE SWR TO FETCH FROM /API/CURRENT AND STORE INFORMATION IN GLOBAL STORE
*/

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
