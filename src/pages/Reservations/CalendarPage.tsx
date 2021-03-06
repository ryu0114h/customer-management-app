import React, { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button } from "antd";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ja";

import { RootState } from "../../reducks/store/store";
import { fetchReservations } from "../../reducks/reservations/operations";
import CalendarFormModal from "../../modal/CalendarFormModal";

type Event = {
  id?: number;
  staff_id?: number;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
  title?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
};

type EventList = Event[];

const CalendarPage: React.FC = () => {
  const reservations = useSelector((state: RootState) => state.reservations);
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [eventList, setEventList] = useState<EventList>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const localizer = momentLocalizer(moment);
  const formats = {
    dateFormat: "D",
    dayFormat: "D(ddd)",
    monthHeaderFormat: "YYYY年M月",
    dayHeaderFormat: "M月D日(ddd)",
  };

  const closeEditModal = () => {
    setSelectedEvent(null);
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchReservations());
  }, []);

  useEffect(() => {
    setEventList(
      reservations.map((reservation) => ({
        id: reservation.id,
        staff_id: reservation.staff_id,
        user_id: reservation.user_id,
        title: `${users.find((user) => user.id === reservation.user_id)?.lastName} ${
          users.find((user) => user.id === reservation.user_id)?.firstName
        }`,
        allDay: reservation.all_day,
        start: reservation.start_datetime && new Date(reservation.start_datetime),
        end: reservation.end_datetime && new Date(reservation.end_datetime),
      }))
    );
  }, [reservations, users]);

  return (
    <>
      <CalendarFormModal
        isEditModalVisible={isEditModalVisible}
        closeEditModal={closeEditModal}
        selectedEvent={selectedEvent}
      />
      <Calendar
        localizer={localizer}
        events={eventList}
        formats={formats}
        style={{ height: 600 }}
        views={["month", "week", "day"]}
        onSelectEvent={(event: Event) => {
          setSelectedEvent(event);
          setIsEditModalVisible(true);
        }}
      />
      <div style={styles.createButtonContainer}>
        <Button type="primary" onClick={() => setIsEditModalVisible(true)} style={styles.createButton}>
          追加
        </Button>
      </div>
    </>
  );
};
export default CalendarPage;

const styles: { [key: string]: CSSProperties } = {
  createButtonContainer: {
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
  },
  createButton: {
    width: 300,
    padding: 5,
    borderRadius: 10,
  },
};
