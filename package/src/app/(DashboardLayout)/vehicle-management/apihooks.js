import { useQuery, useMutation, useQueryClient } from "react-query";
import { requestHttp } from "@/utils/requestHttp";
import { useRouter } from "next/navigation";
import { size } from "lodash";


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
  const router = useRouter();

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
        alert("新增車輛成功！"); // 可視化成功訊息
        router.push(`/vehicle-management`);
        queryClient.invalidateQueries("cars"); // 更新車主列表
      },
      onError: (error) => {
        alert(`新增失敗：${error.message}`); // 可視化錯誤訊息
        console.error("新增車輛失敗：", error);
      },
    }
  );
};

//修改車輛
export const useEditCars = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    async (newCar) => {
      const response = await requestHttp("car/updateCar", {
        method: "POST",
        data: newCar,
      });

      if (response.code === "G_0000") {
        return response; // 成功返回響應
      } else {
        throw new Error(response.message || "修改失敗"); // 如果不是 G_0000，拋出錯誤
      }
    },
    {
      onSuccess: (response) => {
        alert("修改車主成功！"); // 可視化成功訊息
        router.push(`/vehicle-management`);
        queryClient.invalidateQueries("cars"); // 更新車主列表
      },
      onError: (error) => {
        alert(`新增失敗：${error.message}`); // 可視化錯誤訊息
        console.error("修改車主失敗：", error);
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
      //console.log("Car Owner API Response:", response.data);
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
export const useGetInsuranceList = (carLicenseNum) => {
  return useQuery(
    ["insuranceList", carLicenseNum],
    async () => {
      const response = await requestHttp(
        "insuranceFeeSetting/getInsuranceFeeSetting",
        {
          method: "POST",
          data: { carLicenseNum,size,page },
        }
      );

      if (response?.code !== "G_0000") {
        throw new Error(response?.message || "無法獲取保險列表");
      }
      //console.log("Insurance API Response:", response.data);
      return response.data; // 返回保險數據
    },
    {
      enabled: !!carLicenseNum,
      staleTime: 5 * 60 * 1000,
    }
  );
};

// API: 新增保險資料
export const useAddInsurance = (carLicenseNum) => {
  const queryClient = useQueryClient();
  const router = useRouter();

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
      if (response.code === "G_0000") {
        return response; // 成功返回響應
      } else {
        throw new Error(response.message || "新增失敗"); // 如果不是 G_0000，拋出錯誤
      }
    },
    {
      onSuccess: (response) => {
        alert("新增保單成功！"); // 可視化成功訊息
        router.push(`/vehicle-management/${carLicenseNum}/PolicyManagement`);
        queryClient.invalidateQueries(["insuranceList"]);
      },
      onError: (error) => {
        alert(`新增保單失敗：${error.message}`); // 可視化錯誤訊息
        console.error("新增保單失敗：", error);
      },
    }
  );
};

// API: 修改保險資料
export const useEditInsurance = (carLicenseNum) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    async (newInsurance) => {
      const response = await requestHttp(
        "insuranceFeeSetting/updateInsuranceFeeSetting",
        {
          method: "POST",
          data: newInsurance,
        }
      );

      if (response.code === "G_0000") {
        return response; // 成功返回響應
      } else {
        throw new Error(response.message || "修改失敗"); // 如果不是 G_0000，拋出錯誤
      }
    },
    {
      onSuccess: (response) => {
        alert("修改保單成功！"); // 可視化成功訊息
        router.push(`/vehicle-management/${carLicenseNum}/PolicyManagement`);
         queryClient.invalidateQueries(["insuranceList", carLicenseNum]);
      },
      onError: (error) => {
        alert(`修改保單失敗：${error.message}`); // 可視化錯誤訊息
        console.error("修改保單失敗：", error);
      },
    }
  );
};

// API: 作廢保險資料
export const useDeleteInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (deleteInsuranceData) => {
      const response = await requestHttp(
        "insuranceFeeSetting/updateInsuranceFeeSettingStatus",
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

// API: 取得保險公司下拉列表
export const useGetInsuranceComDropDownList = () => {
  return useQuery(
    "InsuranceComDropDownList",
    async () => {
      const response = await requestHttp(
        "insuranceCompany/getInsuranceCompanyDropDown",
        {
          method: "POST",
        }
      );

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
          value: item.companyName,
          name: item.companyName,
        })),
    }
  );
};

// API: 取得保險單筆資料
export const useGetSingleInsuranceFee = (carLicenseNum, insuranceCardNum, mode) => {
  //console.log("licenseNumber", carLicenseNum);
  //console.log("insuranceCardNum", insuranceCardNum);
  //console.log("mode", mode);
  return useQuery(
    ["singleInsuranceFee", carLicenseNum, insuranceCardNum],
    async () => {
      const response = await requestHttp(
        "insuranceFeeSetting/getSingleInsuranceFeeSetting",
        {
          method: "POST",
          data: { carLicenseNum, insuranceCardNum },
        }
      );

      //console.log("singleInsuranceFee API Response:", response);
      return response.data;
    },
    {
      enabled: mode !== "add" && !!carLicenseNum, // 僅當 mode !== "add" 且 licenseNumber 存在時查詢
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
export const useAddOrUpdateCarFee = (carLicenseNum) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    async (carFeeData) => {
      const response = await requestHttp("car/addCarFee", {
        method: "POST",
        data: carFeeData,
      });
      if (response.code === "G_0000") {
        return response; // 成功返回響應
      } else {
        throw new Error(response.message || "新增失敗"); // 如果不是 G_0000，拋出錯誤
      }
    },
    {
      onSuccess: (response) => {
        alert("新增管費成功！"); // 可視化成功訊息
        router.push(`/vehicle-management/${carLicenseNum}/PolicyManagement`);
        queryClient.invalidateQueries("cars"); // 更新車主列表
      },
      onError: (error) => {
        alert(`新增失敗：${error.message}`); // 可視化錯誤訊息
        console.error("新增管費失敗：", error);
      },
    }
  );
};


//車輛總帳
// 取得車輛總帳
export const useGetMonthBill = (params) => {
  //console.log("params", params)
  return useQuery(
    ["monthBill", params],
    async () => {
      const response = await requestHttp("bill/monthBill", {
        method: "POST",
        data: {
          carLicenseNum: params?.carLicenseNum,
          ownerName: '王大帥',
          billDate: params?.billDate,
        },
      });
      //console.log("response", response.data)
      return response.data;
    },
    {
      enabled:!!params?.carLicenseNum && !!params?.ownerName && !!params?.billDate,
    }
  );
};

//貸款設定
// 取得貸款預設資料
export const useGetLoanFee = (carLicenseNum) => {
  return useQuery(
    ["LoanFee", carLicenseNum],
    async () => {
      const response = await requestHttp(
        "loanFeeSetting/queryByCarLicenseNum",
        {
          method: "POST",
          data: { carLicenseNum },
        }
      );
      return response.data.pageList;
    },
    {
      enabled: !!carLicenseNum, // 僅當車牌號碼存在時請求
    }
  );
};

// 新增或修改貸款
export const useAddOrUpdateLoanFee = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (LoanFeeData) => {
      const response = await requestHttp("loanFeeSetting/addLoanFeeSetting", {
        method: "POST",
        data: LoanFeeData,
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["LoanFee"]);
      },
    }
  );
};

//貸款公司下拉列表
//取得貸款公司下拉列表
export const useGetLoanCompanyDropDownList = () => {
  return useQuery(
    "LoanCompanyDropDownList",
    async () => {
      const response = await requestHttp("loanCompany/getLoanCompany", {
        method: "POST",
      });

      if (response.code !== "G_0000") {
        throw new Error(
          response.message || "Failed to fetch car owner dropdown list"
        );
      }
      //console.log("Car Owner API Response:", response.data);
      return response.data.pageList;
    },
    {
      select: (data) =>
        data.map((item) => ({
          key: item.id,
          value: item.companyName,
          name: item.companyName,
        })),
    }
  );
};

//取得車行下拉列表
// API: 取得車主下拉列表
export const useGetCarAgencyDropDownList = () => {
  return useQuery(
    "CarAgencyDropDownList",
    async () => {
      const response = await requestHttp("carAgency/getCarAgency", {
        method: "POST",
        
      });

      if (response.code !== "G_0000") {
        throw new Error(
          response.message || "Failed to fetch car owner dropdown list"
        );
      }
      //console.log("Car Owner API Response:", response.data);
      return response.data.pageList;
    },
    {
      select: (data) =>
        data.map((item) => ({
          key: item.id,
          value: item.agencyName,
          name: item.agencyName,
        })),
    }
  );
};


//取得車主個人資料
// API: 取得車主個人資料
export const useGetCarOwnerInfo = (id) => {
  return useQuery(
    ["carOwnerInfo", id],
    async () => {
      const response = await requestHttp("car/getCarOwnerById", {
        method: "POST",
        data: { id  },
      });

      console.log("Car Owner Info API Response:", response);
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
};

//取得車牌資料
// API: 取得車牌資料
export const useGetCar = (licenseNumber, mode) => {
  return useQuery(
    ["carInfo", licenseNumber],
    async () => {
      const response = await requestHttp("car/getCarByLicenseNum", {
        method: "POST",
        data: { licenseNumber },
      });

      console.log("Car Info API Response:", response);
      return response.data;
    },
    {
      enabled: mode !== "add" && !!licenseNumber, // 僅當 mode !== "add" 且 licenseNumber 存在時查詢
    }
  );
};

//搜尋車牌By車主
// API: 取得車牌資料
export const useGetCarByOwner = (searchName) => {
  return useQuery(
    ["CarByOwner", searchName],
    async () => {
      const response = await requestHttp("car/searchCarByCarOwner", {
        method: "POST",
        data: { searchName },
      });

      console.log("Car Info API Response:", response);
      return response.data.pageList;
    },
    {
      enabled: !!searchName,
    }
  );
};


