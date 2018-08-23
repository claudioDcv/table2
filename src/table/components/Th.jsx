import React, { PureComponent } from 'react';
import { CLASS_NAME } from '../const.js';

class Th extends PureComponent {
	render() {
		const { reverse, onSort, element, index, sortBy } = this.props;
		return (
			<th
				key={index}
				className={
					element.accessor === sortBy ? `${CLASS_NAME.ACTIVE} ${reverse ? CLASS_NAME.SORT_UP : CLASS_NAME.SORT_DOWN}`: ''}
			>
				{element.accessor ? (<button
					onClick={() => onSort(element.accessor, element.isNumeric)}
				>
					{element.headerProps.title + (element.accessor !== sortBy ? '<>' : '')}
					{element.accessor === sortBy && (reverse ? '<-' : '->')}
				</button>
				) : element.headerProps.title}
			</th>
		);
	}
}

export default Th;
