import axios from 'axios';
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import MovieVersion from "./MovieVersion";

export default function TimeTable({ theaterInfo }) {
  const [selectionDates, setSelectionDates] = useState([]);
  const [selectionLocations, setSelectionLocations] = useState([]);
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [timetableInfo, setTimetableInfo] = useState([]);
  useEffect(() => {
    setSelectionDates(theaterInfo.map(item => { return item.datetime }));
    // setSelectionLocations(theaterInfo.map(item => { return item.theaterInfo }));
  }, [theaterInfo]);
  useEffect(() => {
    const getAllTheaters = async () => {
      try {
        const theaters = await axios.get("https://movie-service-d1vx.onrender.com/api/theaters");
        setSelectionLocations(theaters.data.data.map(theater => { return theater.name }));
      } catch (error) {
        console.error(error)
      }
    }
    getAllTheaters();
  }, [theaterInfo]);
  const weekday = {
    0: '週日',
    1: '週一',
    2: '週二',
    3: '週三',
    4: '週四',
    5: '週五',
    6: '週六',
  }
  function handleSelectDatetime(e) {
    setDatetime(e.target.value);
    setLocation('all');
  }
  function handleSelectLocation(e) {
    setLocation(e.target.value)
  }

  useEffect(() => {
    let tempTimetablesInfos = [];
    if (datetime) {
      tempTimetablesInfos = theaterInfo.find(item => new Date(item.datetime).toLocaleDateString() === new Date(datetime).toLocaleDateString()).theaterInfo;
    }
    if (location && location !== 'all') {
      tempTimetablesInfos = [tempTimetablesInfos.find(item => item.name === location)];
    }
    setTimetableInfo(tempTimetablesInfos)
  }, [datetime, location, theaterInfo]);

  return (<>
    <Container className="mb-5">
      <Form className="mb-5">
        <Row>
          <Col xs={6} md={5}>
            <Form.Group>
              <Form.Select value={datetime} onChange={handleSelectDatetime}>
                <option>選擇日期</option>
                {selectionDates.map(date => (
                  <option key={date} value={date}>{new Date(date).toLocaleDateString()}&emsp;
                    {new Date(date).toLocaleDateString() === new Date(Date.now()).toLocaleDateString() ? '當日' : weekday[new Date(date).getDay()]}
                  </option>))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={6} md={3}>
            <Form.Group>
              <Form.Select value={location} onChange={handleSelectLocation}>
                <option>選擇區域</option>
                <option value="all">全部區域</option>
                {selectionLocations.map(theater => (
                  <option key={theater} value={theater}>{theater}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div>
        {
          timetableInfo.map((area, index) => (
            <div key={area.name}>
              {index !== 0 && <hr />}
              <div className="d-flex gap-3">
                <p className='fs-1 fw-semibold'>{area.name}</p>
                <p className="fs-6 text-muted py-3">{area.address}</p>
              </div>
              <MovieVersion timeInfos={area.timeInfo} />
            </div>
          ))
        }
      </div>
    </Container>
  </>)
};
