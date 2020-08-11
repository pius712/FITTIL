import React from 'react';
import MainNotes from './MainNotes';
import WorkoutRecords from './WorkoutRecords';

const MainContents = ({ targetname }) => {
	return (
		<>
			<MainNotes targetname={targetname}></MainNotes>
			<WorkoutRecords></WorkoutRecords>
		</>
	);
};

export default MainContents;
