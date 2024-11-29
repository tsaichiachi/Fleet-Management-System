import { useQuery, useMutation, useQueryClient } from "react-query";
import { requestHttp } from "@/utils/requestHttp";


// API: 取得所有車輛
export const useGetCars = () => {
  return useQuery("cars", async () => {
    const response = await requestHttp("car/carInfoDropDownList", {
      method: "POST",
    });
    //console.log("Cars API Response:", response);

    // 檢查 API 響應的成功與否
    if (response.code !== "G_0000") {
      throw new Error(response.message || "Failed to fetch cars");
    }

    // 返回所需的數據部分
    return response.data; 
  });
};


//  API: 新增車輛
export const useAddCars = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newCar) => {
      const response = await requestHttp("car/addCar", {
        method: "POST",
        data: newCar,
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
        queryClient.invalidateQueries("cars"); // 更新車主列表
      },
      onError: (error) => {
        alert(`新增失敗：${error.message}`); // 可視化錯誤訊息
        console.error("新增車主失敗：", error);
      },
    }
  );
};

// API: 取得車主下拉列表
export const useGetCarOwnerDropDownList = () => {
  return useQuery(
    "carOwnerDropDownList",
    async () => {
      const response = await requestHttp("car/carOwnerDropDownList", {
        method: "POST",
      });

      if (response.code !== "G_0000") {
        throw new Error(
          response.message || "Failed to fetch car owner dropdown list"
        );
      }
      console.log("Car Owner API Response:", response.data);
      return response.data;
    },
    {
      select: (data) =>
        data.map((item) => ({
          key: item.id,
          value: item.name,
          name: item.name,
        })),
    }
  );
};

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


//管費設定
// 取得管費表單預設資料
export const useGetCarFee = (carLicenseNum) => {
  return useQuery(
    ["carFee", carLicenseNum],
    async () => {
      const response = await requestHttp("car/getCarFee", {
        method: "POST",
        data: { carLicenseNum },
      });
      return response.data;
      
    },
    {
      enabled: !!carLicenseNum, // 僅當車牌號碼存在時請求
    }
  );
};

// 新增或修改管費
export const useAddOrUpdateCarFee = () => {
  const queryClient = useQueryClient();

  return useMutation(async (carFeeData) => {
    const response = await requestHttp("car/addCarFee", {
      method: "POST",
      data: carFeeData,
    });
    return response;
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["carFee"]);
    },
  });
};
