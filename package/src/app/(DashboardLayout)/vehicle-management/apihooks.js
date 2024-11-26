import { useQuery, useMutation, useQueryClient } from "react-query";
import { requestHttp } from "@/utils/requestHttp";



// API: 取得保險列表
export const useGetInsuranceList = (page, size) => {
  return useQuery({
    queryKey: ["insuranceList", page, size], // 根據 page 和 size 做依賴更新
    queryFn: async () => {
      const response = await requestHttp(
        "insuranceFeeSetting/getInsuranceFeeSetting",
        {
          method: "POST", // 改用 POST 方法
          data: { page, size }, // 傳遞 page 和 size 作為請求體
        }
      );

      if (response?.code !== "G_0000") {
        throw new Error(response?.message || "無法獲取保險列表");
      }

      console.log("保險列表數據：", response.data);
      return response.data; // 返回保險數據
    },
    refetchOnWindowFocus: false, // 避免切回窗口時自動重新加載
    staleTime: 300000, // 設置數據過期時間，單位為毫秒
  });
};

// API: 新增保險資料
export const useAddInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newInsurance) => {
      //console.log(newInsurance);
      const response = await requestHttp(
        "insuranceFeeSetting/addInsuranceFeeSetting",
        {
          method: "POST",
          data: newInsurance,
        }
      );
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["insuranceList"]);
      },
    }
  );
};

// API: 刪除保險資料
export const useDeleteInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (deleteInsuranceData) => {
      const response = await requestHttp(
        "insuranceFeeSetting/deleteInsuranceFeeSetting",
        {
          method: "POST",
          data: deleteInsuranceData,
        }
      );
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["insuranceList"]);
      },
    }
  );
};
