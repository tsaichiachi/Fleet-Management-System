"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import CarOwnerSetting from "../../components/form/CarOwnerSetting";

const SamplePage = () => {
  4; // select
  const [searchItems, setSearchItems] = React.useState("1");

  const handleChange = (event: any) => {
    setSearchItems(event.target.value);
  };
  
  return (
    <PageContainer title="車籍資料建立" description="this is Sample page">
      <DashboardCard title="車主資料">
        <CarOwnerSetting />
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
