import { useQuery, useMutation, useQueryClient } from "react-query";
import { requestHttp } from "@/utils/requestHttp";

/**
 * API: 取得所有車主
 */
export const useGetCarOwners = (fetchParams) => {
  console.log("fetchParams:", fetchParams);
  const { page, size, name } = fetchParams;
  return useQuery("carOwners", async () => {
    const response = await requestHttp("car/getCarOwner", {
      method: "POST",
      data: {
        page: page,
        size: size,
        searchName: name || "",
      },
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
    async (newCarOwner) => {
      const response = await requestHttp("car/addCarOwner", {
        method: "POST",
        data: newCarOwner,
      });

      if (response.code === "G_0000") {
        return response; // 成功返回響應
      } else {
        throw new Error(response.message || "新增失敗"); // 如果不是 G_0000，拋出錯誤
      }
    },
    {
      onSuccess: (response) => {
        alert("新增車主成功！"); // 可視化成功訊息
        queryClient.invalidateQueries("carOwners"); // 更新車主列表
      },
      onError: (error) => {
        alert(`新增失敗：${error.message}`); // 可視化錯誤訊息
        console.error("新增車主失敗：", error);
      },
    }
  );
};

export const useEditCarOwner = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (carOwner) => {
      const response = await requestHttp("car/updateCarOwner", {
        method: "POST",
        data: carOwner,
      });
      if (response.code === "G_0000") {
        return response; // 成功返回響應
      } else {
        throw new Error(response.message || "新增失敗"); // 如果不是 G_0000，拋出錯誤
      }
    },
    {
      onSuccess: (response) => {
        alert("修改車主成功！"); // 可視化成功訊息
        queryClient.invalidateQueries("carOwners"); // 更新車主列表
      },
      onError: (error) => {
        alert(`修改失敗：${error.message}`); // 可視化錯誤訊息
        console.error("修改車主失敗：", error);
      },
    }
  );
};
