import { useQuery, useMutation, useQueryClient } from "react-query";
import { requestHttp } from "@/utils/requestHttp";

export interface CarOwner {
  id: number;
  licenseNumber: string;
  ownerName: string;
}

/**
 * API: 取得所有車主
 */
export const useGetCarOwners = () => {
    //console.log("Inside useQuery context");
  return useQuery("carOwners", async () => {
    const response = await requestHttp("car/carInfo", {
      method: "POST",
    });
    console.log("Car Owners API Response:", response);
    return response;
  });
};

/**
 * API: 新增車主
 */
export const useAddCarOwner = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newCarOwner: any) => {
      const response = await requestHttp("car/addCar", {
        method: "POST",
        data: newCarOwner,
      });
      return response;
    },
    {
      onSuccess: () => {
        // 當成功新增車主時，自動重新取得車主列表
        queryClient.invalidateQueries("carOwners");
      },
    }
  );
};
