import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const SpinnerWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
`;

const Spinner = () => {
	return (
		<SpinnerWrapper>
			<Spin />
		</SpinnerWrapper>
	);
};
export default Spinner;
