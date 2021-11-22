import React, { useEffect, useState } from "react";

import { Row, Col, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "antd";

import PolicyDetailTable from "./PolicyDetailTable";
import SearchInput from "./SearchInput";
import ZoomableTimelineChart from "../general/ZoomableTimelineChart";
import { dispatchPolicyTimelineData } from "../../actions/policy/policy-action-creator";
import LoadingSkeleton from "../general/LoadingSkeleton";
import { getRegionData } from "../../actions/policy/policy-api";
import DataSelection from "../general/DataSelection";

const { Option } = Select;
const { Title } = Typography;

export default function PolicyDetailContainer() {
  const dispatch = useDispatch();
  const { policyTimeline } = useSelector((state) => state.policyReducer);
  const [regions, setRegions] = useState([]);

  useEffect(async () => {
    dispatch(dispatchPolicyTimelineData({}));
    const regionsResponse = await getRegionData();
    setRegions(regionsResponse);
  }, []);

  const createOptions = () => {
    return regions.map((ele) => (
      <Option key={ele.region} value={ele.region}>
        {ele.region}
      </Option>
    ));
  };

  const handleRegionSelection = async (region) => {
    dispatch(dispatchPolicyTimelineData({ region }));
  };

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Title level={5}>Policy Details</Title>
          <div className="container">
            <Row gutter={[16, 16]}>
              <Col span={4} offset={20}>
                <SearchInput />
              </Col>
              <Col span={24}>
                <PolicyDetailTable />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <Title level={5}>Monthly Policies Bought</Title>
          <div className="container">
            <Row gutter={[16, 16]}>
              <Col span={5} offset={19}>
                <DataSelection
                  placeholder={"Select region"}
                  options={createOptions()}
                  handleSelection={handleRegionSelection}
                />
              </Col>
              {policyTimeline.loading ? (
                <LoadingSkeleton />
              ) : (
                <Col span={24}>
                  <ZoomableTimelineChart data={policyTimeline.data} />
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}
