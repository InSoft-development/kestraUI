const fetched = (flows, executions, logs) => {
	const fetch = false
	if (flows.length && executions.length && logs.length) {
		fetch = true
	}

	return {
		fetch
	}
}

export default fetched