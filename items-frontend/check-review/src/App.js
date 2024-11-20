import { Stage, Layer, Rect, Image } from "react-konva";
import { Col, Row } from 'antd';
import useImage from 'use-image';
import './App.css';
import invice1 from './assets/invoice1.jpg';
function App() {

  const SingleImage = ({ src, x, y }) => {
    const [image] = useImage(src); // 加载图片
    return <Image image={image} x={x} y={y} width={800} height={400} />;
  };
  return (
    <Row gutter={16} style={{ height: window.innerHeight, width: window.innerWidth, backgroundColor: '#fff' }}>
      <Col span={12} className="gutter-row" >
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {/* <Rect
              x={50}
              y={50}
              width={100}
              height={100}
              fill="blue"
              draggable
              onDragEnd={(e) => {
                console.log("New position:", e.target.x(), e.target.y());
              }}
            /> */}
            <SingleImage src={invice1} x={50} y={50} />
          </Layer>
        </Stage>
      </Col>
      <Col span={12} style={{ backgroundColor: '#F4F6FC' }}>
        {/* <img src={invice1} alt="" /> */}
      </Col>
    </Row>
  );
}

export default App;
