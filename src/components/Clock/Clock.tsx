import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import moment from 'moment-timezone';

const styles = StyleSheet.create({
  label: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

type ClockProps = {
  city: string;
  timeZone: string;
};

function Clock({city, timeZone}: ClockProps) {
  const [time, setTime] = useState(new Date());
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime(new Date());
  //   }, 250);
  //   return () => clearInterval(timer);
  // }, []);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const updateClock = () => {
      const now = new Date();
      setTime(now);
      const delay = 1000 - now.getMilliseconds();
      timer = setTimeout(updateClock, delay);
    };
    updateClock();
    return () => clearTimeout(timer);
  }, []);
  // const hours = String(time.getHours()).padStart(2, '0');
  // const minutes = String(time.getMinutes()).padStart(2, '0');
  // const seconds = String(time.getSeconds()).padStart(2, '0');
  const formattedTime = moment(time).tz(timeZone).format('HH:mm:ss');
  return (
    // <Text style={styles.clock}>
    //   {hours}:{minutes}:{seconds}
    // </Text>
    <View>
      <View style={styles.label}>
        <Text style={styles.text}>{city}</Text>
      </View>
      <View style={styles.label}>
        <Text style={styles.text}>{formattedTime}</Text>
      </View>
    </View>
  );
}

export default Clock;
