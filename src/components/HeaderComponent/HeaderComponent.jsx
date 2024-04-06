import { Col, Row } from "antd";

const HeaderComponent = () => {
  return (
    <div>
      <Row>
        <Col span={6}>Left</Col>
        <Col span={12}>Mid</Col>
        <Col span={6}>Right</Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
