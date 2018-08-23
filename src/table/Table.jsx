import React, { Component } from "react";
import { compareMake, dotNot } from "./TableUtils";

const CLASS_NAME = {
	TABLE: 'ui-kit-table',
	ACTIVE: 'ui-kit-table__th-active',
	SORT_DOWN: 'ui-kit-table__th-sort-up',
	SORT_UP: 'ui-kit-table__th-sort-down',
};

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			sortBy: '',
			reverse: false,
			isNumeric: false,
			configCol: [],
			self: this,
		};
		this.onSort = this.onSort.bind(this);
	}

	checkType(e, type) {
		const ErrorType = function (el, ty) {
			this.toString = () => `the element must be of type '${ty}' and not '${el}'`;
		}
		const elementType = e.type.name || e.type;
		console.log(elementType === type);
		if (elementType === type) {
			return true;
		} else {
			throw new ErrorType(elementType, type);
		}
	}

	componentDidMount() {
		this.config();
	}

	static getDerivedStateFromProps(p, o) {
		const dat = {
			...o,
			data: p.data,
		};
		return dat;
	}

	config() {
		const newConfigCol = this.state.configCol;
		let sortBy = '';
		React.Children.map(this.props.children, (e, i) => {
			this.checkType(e, 'Col');
			// selected initial sort by
			if (e.props.defaultSort) {
				sortBy = e.props.accessor;
			}

			newConfigCol.push({
				accessor: e.props.accessor,
				colProps: {
					className: e.props.className,
				},
				template: e.props.template,
				isNumeric: e.props.isNumeric,
				headerProps: {
					title: e.props.title || e.props.accessor || '',
				},
			});
		});

		// if sort by dont exist, assign first accessor
		if (!sortBy) {
			sortBy = newConfigCol[0].accessor;
		}

		this.setState({
			sortBy,
			configCol: newConfigCol,
		});
	}

	onSort(key, isNumeric) {
		const { sortBy, reverse } = this.state;
		this.setState({
			sortBy: key,
			reverse: sortBy === key ? !reverse : false,
			isNumeric: isNumeric !== undefined
		});
	}

	makeRow(element, index) {
		const { configCol } = this.state;
		return configCol.map((conf, i) => (
			<td key={i} {...conf.colProps} >
				{conf.accessor ? (
					conf.template
					? conf.template(dotNot(element, conf.accessor), index, element)
					: dotNot(element, conf.accessor)
				):(
					conf.template(null, index, element)
				)}
			</td>
		));
	}

	render() {
		const { data, sortBy, reverse, configCol } = this.state;
		return sortBy && configCol.length > 0 ? (
			<div>
				<table className={CLASS_NAME.TABLE}>
					<thead>
						<tr>
						{configCol.map((e, i) => (
							<th
								key={i}
								className={
									e.accessor === sortBy ? CLASS_NAME.ACTIVE + ' ' + (reverse ? CLASS_NAME.SORT_UP : CLASS_NAME.SORT_DOWN): ''}
							>
								{e.accessor ? (<button
									onClick={() => this.onSort(e.accessor, e.isNumeric)}
								>
									{e.headerProps.title}
									{e.accessor === sortBy && (reverse ? '<' : '>')}
								</button>
								) : e.headerProps.title}
							</th>
						))}
						</tr>
					</thead>
					<tbody>
					{(data.sort(compareMake(
							sortBy,
							reverse,
							configCol.find((e) => e.accessor === sortBy).isNumeric
						))).map((e, i) => (
						<tr key={i}>
							{this.makeRow(e, i)}
						</tr>
					))}
					</tbody>
				</table>
			</div>
		) : <div />;
	}
}

export default Table;
