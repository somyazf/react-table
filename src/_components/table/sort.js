const data = [
	{ id: 1, name: 'Bruce' },
	{ id: 3, name: 'Martin' },
	{ id: 2, name: 'Andrew' },
];

/**
 * Nothing interesting, just render...
 */
function Table({ data, sortByKey }) { 
	const renderRow = ({ id, name }, idx) => (
  	<tr key={idx}>
    	<td>{id}</td>
    	<td>{name}</td>
    </tr>
  )
  
	return (
  	<table>
    	<tr>
      	<th onClick={sortByKey('id')}>ID</th>
        <th onClick={sortByKey('name')}>Name</th>
      </tr>
      { data.map(renderRow) }
    </table>
  );
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {
                key: undefined,
                // 0 - not ordering
                // 1 - asc
                // 2 - desc
                order: 0,
            },
        };
    
        this.sortByKey = this.sortByKey.bind(this);
    }
  
    sortedData() {
        const { key, order } = this.state.sort;

        // Only sort if key is provided & order != 0.
        if (key && order) {
            // Comparison function for "asc" sorting.
            function compare(a, b) {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            }

            // Attention! Sort mutates array, clone first.
            return [...this.props.data].sort((a, b) => {
                // Interesting part. Sort in "asc" order. Flip if want "desc" order!
                return compare(a, b) * (order === 1 ? 1 : -1);
            });
        }

        // Return original data (order = 0)
        return this.props.data;
    }
  
    sortByKey(key) {
        return () => {
            const sort = (this.state.sort.key === key)
                // Key matches, update order
                ? { key, order: (this.state.sort.order + 1) % 3 }
                // Key differs, start with "asc" order
                : { key, order: 1 };
            this.setState({ sort });
        }
    }
  
    render() {
        return (
            <Table data={this.sortedData()} sortByKey={this.sortByKey} />
        );
    }
}

ReactDOM.render(
    <Container data={data} />,
    document.getElementById('container')
);
