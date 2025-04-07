import { useCallback } from "react";
import { toast } from "react-toastify";

const useCheckExisted = (trigger, setError, user = undefined) => {
  const checkExisted = useCallback(
    async (inputName, inputValue, checkExistedFunc, message) => {
      if (inputValue) {
        const valid = await trigger(inputName);
        if (valid) {
          try {
            const response = await checkExistedFunc(inputValue, user?.id);
            if (response.data.exists) {
              setError(inputName, {
                type: "manual",
                message,
              });
            }
          } catch (error) {
            toast.error(error.message);
          }
        }
      }
    },
    [trigger, setError, user]
  );

  return checkExisted;
};

export default useCheckExisted;
